<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogArticle;
use Illuminate\Http\Request;
use Shopify\Clients\Rest;

class BlogController extends Controller
{
    public function BlogsSync(Request $request){
        $shop = getShop($request->get('shopifySession'));
        $this->syncBlogs($shop);
    }

    public function syncBlogs($session, $nextPage = null)
    {
        $client = new Rest($session->shop, $session->access_token);
        $result = $client->get('blogs', [], [
            'limit' => 250,
            'page_info' => $nextPage,
        ]);
        if($nextPage==null){
            $blog_ids=[];
        }
        $blogs = $result->getDecodedBody()['blogs'];

        foreach ($blogs as $blog) {
            array_push($blog_ids,$blog['id']);
            $this->createUpdateBlog($blog, $session);
        }

        if (isset($result)) {
            if ($result->getPageInfo() ? true : false) {
                $nextUrl = $result->getPageInfo()->getNextPageUrl();
                if (isset($nextUrl)) {
                    $arr = explode('page_info=', $result->getPageInfo()->getNextPageUrl());
                    $this->syncBlogs($arr[count($arr) - 1]);
                }
            }
        }
        Blog::whereNotIn('shopify_id',$blog_ids)->delete();
    }


    public function createUpdateBlog($blog, $shop)
    {
        $blog = json_decode(json_encode($blog), false);
        $b = Blog::where([
            'shop_id' => $shop->id,
            'shopify_id' => $blog->id
        ])->first();
        if ($b === null) {
            $b = new Blog();
        }

        $b->shopify_id = $blog->id;
        $b->shop_id = $shop->id;
        $b->title = $blog->title;
        $b->handle = $blog->handle;
        $b->tags = $blog->tags;
        $b->commentable = $blog->commentable;
        $b->feedburner = $blog->feedburner;
        $b->feedburner_location = $blog->feedburner_location;
        $b->save();

        $client = new Rest($shop->shop, $shop->access_token);
        $articles = $client->get('/admin/api/2023-07/blogs/' . $blog->id . '/articles.json');


        $articles = $articles->getDecodedBody()['articles'];
        $blog_article_ids=[];
        foreach ($articles as $article) {
            $article = json_decode(json_encode($article), false);
            array_push($blog_article_ids,$article->id);
            $a = BlogArticle::where([
                'shop_id' => $shop->id,
                'shopify_id' => $article->id
            ])->first();
            if ($a === null) {
                $a = new BlogArticle();
            }

            $a->shopify_id = $article->id;
            $a->shop_id = $shop->id;
            $a->title = $article->title;
            $a->handle = $article->handle;
            $a->tags = $article->tags;
            $a->shopify_blog_id = $article->blog_id;
            $a->blog_id = $b->id;
            $a->author = $article->author;
            $a->user_id = $article->user_id;
            $a->body_html = $article->body_html;
            $a->summary_html = $article->summary_html;
            $a->save();
        }

        BlogArticle::where('blog_id',$b->id)->whereNotIn('shopify_id',$blog_article_ids)->delete();

    }
}

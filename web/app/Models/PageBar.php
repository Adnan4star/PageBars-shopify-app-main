<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageBar extends Model
{
    use HasFactory;
    public function bar_form(){
        return  $this->belongsTo(PageBarForm::class, 'id', 'page_bar_id');
    }
    public function bar_success_form(){
        return  $this->belongsTo(PageBarSuccessForm::class, 'id', 'page_bar_id');
    }
}

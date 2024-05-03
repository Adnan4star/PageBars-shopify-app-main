<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageBarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_bars', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id')->nullable();
            $table->boolean('is_active')->default(1);
            $table->bigInteger('leads')->default(0);
            $table->string('discount_code')->nullable();
            $table->double('discount')->nullable();
            $table->bigInteger('price_rule_shopify_id')->nullable();
            $table->bigInteger('discount_code_shopify_id')->nullable();
            $table->string('bar_name')->nullable();
            $table->string('type')->nullable();
            $table->longText('type_ids')->nullable();
            $table->longText('bar_title')->nullable();
            $table->string('bar_title_color')->nullable();
            $table->string('bar_color')->nullable();
            $table->string('bar_scroll')->nullable();
            $table->boolean('bar_button_enabled')->nullable();
            $table->string('bar_button_text')->nullable();
            $table->string('bar_button_color')->nullable();
            $table->string('bar_button_text_color')->nullable();
            $table->string('bar_close_button_color')->nullable();
            $table->string('bar_title_text_size')->nullable();
            $table->string('bar_title_text_weight')->nullable();
            $table->string('bar_button_text_size')->nullable();
            $table->string('bar_button_text_weight')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_bars');
    }
}

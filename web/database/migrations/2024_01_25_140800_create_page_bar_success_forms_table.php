<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageBarSuccessFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_bar_success_forms', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id')->nullable();
            $table->integer('page_bar_id')->nullable();
            $table->longText('success_form_title')->nullable();
            $table->longText('success_form_middle_title')->nullable();
            $table->boolean('success_form_button_enabled')->nullable();
            $table->string('success_form_button_text')->nullable();
            $table->longText('success_form_button_link')->nullable();
            $table->string('success_form_title_color')->nullable();
            $table->string('success_form_button_text_color')->nullable();
            $table->string('success_form_background_color')->nullable();
            $table->string('success_form_middle_title_color')->nullable();
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
        Schema::dropIfExists('page_bar_success_forms');
    }
}

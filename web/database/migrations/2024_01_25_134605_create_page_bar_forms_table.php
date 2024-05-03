<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageBarFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_bar_forms', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id')->nullable();
            $table->integer('page_bar_id')->nullable();
            $table->boolean('form_name_enabled')->nullable();
            $table->boolean('form_email_enabled')->nullable();
            $table->boolean('form_phone_enabled')->nullable();
            $table->longText('form_image')->nullable();
            $table->longText('form_title')->nullable();
            $table->longText('form_sub_title')->nullable();
            $table->string('form_primary_button_text')->nullable();
            $table->longText('form_primary_button_link')->nullable();
            $table->string('form_secondary_button_text')->nullable();
            $table->longText('form_secondary_button_link')->nullable();
            $table->longText('form_warning_text')->nullable();
            $table->string('form_title_color')->nullable();
            $table->string('form_sub_title_color')->nullable();
            $table->string('form_primary_button_color')->nullable();
            $table->string('form_primary_button_text_color')->nullable();
            $table->string('form_secondary_button_color')->nullable();
            $table->string('form_secondary_button_text_color')->nullable();
            $table->string('form_background_color')->nullable();
            $table->string('form_close_button_color')->nullable();
            $table->string('form_title_size')->nullable();
            $table->string('form_title_weight')->nullable();
            $table->string('form_sub_title_size')->nullable();
            $table->string('form_sub_title_weight')->nullable();
            $table->string('form_button_text_size')->nullable();
            $table->string('form_button_text_weight')->nullable();
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
        Schema::dropIfExists('page_bar_forms');
    }
}

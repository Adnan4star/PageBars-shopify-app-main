<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToPageBarSuccessFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_bar_success_forms', function (Blueprint $table) {
            $table->string('success_form_button_color')->nullable();
            $table->string('success_form_close_button_color')->nullable();
            $table->string('success_form_title_size')->nullable();
            $table->string('success_form_middle_text_size')->nullable();
            $table->string('success_form_button_size')->nullable();
            $table->string('success_form_popup_radius')->nullable();
            $table->string('success_form_button_radius')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('page_bar_success_forms', function (Blueprint $table) {
            //
        });
    }
}

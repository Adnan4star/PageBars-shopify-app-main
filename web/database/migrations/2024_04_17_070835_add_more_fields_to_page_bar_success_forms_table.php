<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMoreFieldsToPageBarSuccessFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_bar_success_forms', function (Blueprint $table) {
            $table->string('mobile_success_form_title_size')->nullable();
            $table->string('mobile_success_form_middle_text_size')->nullable();
            $table->string('mobile_success_form_button_size')->nullable();
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

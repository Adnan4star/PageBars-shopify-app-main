<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMoreFieldsToPageBarFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_bar_forms', function (Blueprint $table) {
            $table->longText('mobile_form_image')->nullable();
            $table->longText('mobile_form_title_size')->nullable();
            $table->longText('mobile_form_sub_title_size')->nullable();
            $table->string('mobile_button_text_size')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('page_bar_forms', function (Blueprint $table) {
            //
        });
    }
}

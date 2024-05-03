<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToPageBarFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_bar_forms', function (Blueprint $table) {
            $table->string('form_fields_color')->nullable();
            $table->string('form_button_pop_up_radius')->nullable();
            $table->string('form_button_fields_radius')->nullable();
            $table->string('form_button_button_radius')->nullable();
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

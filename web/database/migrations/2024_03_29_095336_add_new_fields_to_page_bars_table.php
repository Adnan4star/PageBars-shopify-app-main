<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToPageBarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_bars', function (Blueprint $table) {
            $table->longText('bar_image')->nullable();
            $table->string('bar_button_radius')->nullable();
            $table->boolean('discount_code_status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('page_bars', function (Blueprint $table) {
            //
        });
    }
}

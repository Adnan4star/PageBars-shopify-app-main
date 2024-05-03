<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('shop_id')->nullable();
            $table->string('shopify_id')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('dob')->nullable();
            $table->string('orders_count')->nullable();
            $table->string('phone')->nullable();
            $table->string('total_spent')->nullable();
            $table->string('currency')->nullable();
            $table->longText('address')->nullable();
            $table->longText('address2')->nullable();
            $table->longText('city')->nullable();
            $table->longText('province')->nullable();
            $table->longText('country')->nullable();
            $table->string('zip')->nullable();
            $table->longText('tags')->nullable();
            $table->string('state')->nullable();
            $table->bigInteger('last_order_id')->nullable();
            $table->string('last_order_name')->nullable();
            $table->longText('note')->nullable();
            $table->bigInteger('page_bar_id')->nullable();
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
        Schema::dropIfExists('customers');
    }
}

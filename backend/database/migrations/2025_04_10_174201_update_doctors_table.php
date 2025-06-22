<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->time('from')->default('00:00:00')->change();
            $table->time('to')->default('00:00:00')->change();
        });
}

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->time('from')->default(null)->change();
            $table->time('to')->default(null)->change();
        });
    }
};

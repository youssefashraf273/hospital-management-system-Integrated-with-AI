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
        Schema::table('medical_records', function (Blueprint $table) {
            $table->dropColumn('medical_history');
            $table->text('notes')->nullable();
        });
    }

    public function down()
    {
        Schema::table('medical_records', function (Blueprint $table) {
            $table->text('medical_history')->nullable();
            $table->dropColumn('notes');
        });
    }
};

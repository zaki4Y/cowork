<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->json('features');
            $table->boolean('is_popular')->default(false);
            $table->string('billing_cycle');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};

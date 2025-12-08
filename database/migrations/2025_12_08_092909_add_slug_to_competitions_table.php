<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            // 1. Tambah kolom slug nullable dulu
            Schema::table('competitions', function (Blueprint $table) {
                $table->string('slug')->nullable()->after('name');
            });

            // 2. Isi slug untuk data lama
            $all = DB::table('competitions')->get();

            foreach ($all as $item) {

                $baseSlug = Str::slug($item->name);
                $slug = $baseSlug;
                $counter = 1;

                // Cek jika slug sudah ada → buat slug unik
                while (DB::table('competitions')->where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }

                DB::table('competitions')
                    ->where('id', $item->id)
                    ->update(['slug' => $slug]);
            }

            // 3. Jadikan slug UNIQUE + NOT NULL
            Schema::table('competitions', function (Blueprint $table) {
                $table->string('slug')->unique()->nullable(false)->change();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};

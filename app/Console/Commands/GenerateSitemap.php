<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Articles;

class GenerateSitemap extends Command
{
    protected $signature = 'app:generate-sitemap';
    protected $description = 'Generate sitemap for static pages and all articles';

    public function handle()
    {
        $sitemap = Sitemap::create();

        // 🔹 Tambahkan static pages dari config
        foreach (config('sitemap.static_pages') as $page) {
            $sitemap->add(
                Url::create($page['loc'])
                    ->setLastModificationDate(now())
                    ->setChangeFrequency($page['freq'])
                    ->setPriority($page['priority'])
            );
        }

        // 🔹 Tambahkan dynamic article
        $articles = Articles::all();

        foreach ($articles as $article) {
            $sitemap->add(
                Url::create("/articles/{$article->slug}")
                    ->setLastModificationDate($article->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.8)
            );
        }

        $sitemap->writeToFile(base_path('sitemap.xml'));
        copy(base_path('sitemap.xml'), public_path('sitemap.xml'));


        $this->info('✅ Sitemap generated successfully!');
    }
}

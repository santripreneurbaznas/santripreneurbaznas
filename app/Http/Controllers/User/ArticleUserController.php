<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Articles;
use App\Models\CategoryArticle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleUserController extends Controller
{
    public function index()
    {
        $latestArticle = Articles::latest()->first();
        $articles = Articles::where('id', '!=', $latestArticle->id ?? null)
            ->latest()
            ->paginate(8);
        $categories = CategoryArticle::all();


        // dd($articles);

        return Inertia::render('User/Article/Index', [
            'articles' => $articles,
            'latestArticle' => $latestArticle,
            'categories' => $categories
        ]);
    }
    public function category($categoryId)
    {

        $categoryId = CategoryArticle::where('slug', $categoryId)->first()->id ?? null;
        // ambil artikel terbaru dari kategori ini
        $latestArticle = Articles::where('category_article_id', $categoryId)
            ->latest()
            ->first();

        $articles = Articles::where('category_article_id', $categoryId)
            ->when($latestArticle, function ($query) use ($latestArticle) {
                $query->where('id', '!=', $latestArticle->id);
            })
            ->latest()
            ->paginate(8);
        // dd($articles);

        // ambil semua kategori
        $categories = CategoryArticle::all();

        return Inertia::render('User/Article/Index', [
            'articles'       => $articles,
            'latestArticle'  => $latestArticle,
            'categories'     => $categories,
        ]);
    }
    public function search(Request $request)
    {
        $keyword = $request->query('q'); // ambil query dari ?q=keyword

        // ambil artikel terbaru yang cocok dengan keyword
        $latestArticle = Articles::where(function ($query) use ($keyword) {
            $query->where('title', 'like', "%{$keyword}%")
                ->orWhere('content', 'like', "%{$keyword}%");
        })
            ->latest()
            ->first();

        // ambil artikel lain, kecuali yang terbaru
        $articles = Articles::where(function ($query) use ($keyword) {
            $query->where('title', 'like', "%{$keyword}%")
                ->orWhere('content', 'like', "%{$keyword}%");
        })
            ->when($latestArticle, function ($query) use ($latestArticle) {
                $query->where('id', '!=', $latestArticle->id);
            })
            ->latest()
            ->paginate(8);



        // ambil semua kategori (kalau masih dipakai di sidebar/menu)
        $categories = CategoryArticle::all();

        return Inertia::render('User/Article/Index', [
            'articles'      => $articles,
            'latestArticle' => $latestArticle,
            'categories'    => $categories,
            'search'        => $keyword, // biar bisa ditampilkan di FE
        ]);
    }

    public function show($slug)
    {
        $article = Articles::where('slug', $slug)
            ->with('category') // pakai relasi yg sudah benar
            ->first();

        // dd($article->category); // sekarang category muncul


        if (!$article) {
            // return Inertia::render('NotFound');
            // atau bisa redirect route khusus:
            return redirect()->back()->with('error', 'Article not found.');
        }

        // update views (increment)
        $article->increment('views');

        // ambil artikel lain dari kategori yang sama (rekomendasi), exclude artikel ini
        $recommended = Articles::where('category_article_id', $article->category_article_id)
            ->where('id', '!=', $article->id)
            ->latest()
            ->take(4) // ambil 4 artikel rekomendasi
            ->get();

        // ambil kategori untuk sidebar/menu
        $categories = CategoryArticle::all();

        return Inertia::render('User/Article/Show', [
            'article'      => $article->fresh(['category']), // ambil data terbaru setelah update views
            'recommended'  => $recommended,
            'categories'   => $categories,
        ]);
    }
}

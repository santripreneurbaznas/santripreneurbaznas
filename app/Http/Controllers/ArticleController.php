<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\CategoryArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('perPage', 3);

        $articles = Articles::query()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('SuperAdmin/Article/Index', [
            'articles' => $articles,
            'filters' => [
                'search' => $search,
                'perPage' => $perPage
            ]
        ]);
    }
    public function create()
    {
        $categories = CategoryArticle::all();


        return Inertia::render(
            'SuperAdmin/Article/Create',
            [
                'categories' => $categories
            ]
        );
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories_article,id'
        ]);



        if (!$data['content']) {
            return redirect()->back()->with('error', 'Content is required');
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Simpan ke storage/app/public/articles
            $imagePath = $request->file('image')->store('articles', 'public');
        }



        Articles::create([
            'title'   => $data['title'],
            'image'   => $imagePath, // hanya path disimpan
            'content' => $data['content'],
            'slug'    => str()->slug($data['title']),
            'category_article_id' => $data['category_id']
        ]);
        Artisan::call('app:generate-sitemap');

        return redirect()
            ->route('superadmin.articles.index')
            ->with('success', 'Post created');
    }

    public function storeCategory(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',

        ]);

        CategoryArticle::create([
            'name'   => $data['name'],
            'slug'    => str()->slug($data['name'])
        ]);

        return redirect()
            ->route('superadmin.articles.index')
            ->with('success', 'category created');
    }


    // public function show($slug, Request $request)
    // {
    //     // Ambil artikel berdasarkan slug
    //     $article = Articles::where('slug', $slug)->firstOrFail();

    //     // Buat session key unik per artikel
    //     $sessionKey = 'viewed_article_' . $article->id;

    //     // Jika belum pernah dilihat di session ini → tambah views
    //     if (!$request->session()->has($sessionKey)) {
    //         $article->increment('views');
    //         $request->session()->put($sessionKey, true);
    //     }

    //     // Artikel rekomendasi (berdasarkan views, exclude artikel yang sedang dibuka)
    //     $recommended = Articles::where('id', '!=', $article->id)
    //         ->orderByDesc('views')
    //         ->take(5)
    //         ->get();

    //     return inertia('Articles/Show', [
    //         'article' => $article,
    //         'recommended' => $recommended,
    //     ]);
    // }
    public function show($slug, Request $request)
    {
        // Ambil artikel berdasarkan slug
        $article = Articles::where('id', $slug)->firstOrFail();

        // replace src="/storage jadi src="/berkas/storage
        $article->content = str_replace(
            'src="/storage',
            'src="/berkas/storage',
            $article->content
        );


        return inertia('SuperAdmin/Article/Show', [
            'article' => $article,
            'content' => $article->content
            // 'recommended' => $recommended,
        ]);
    }




    public function edit($id)
    {

        $article = Articles::where('id', $id)->first();


        return Inertia::render('SuperAdmin/Article/Edit', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validasi data
        $validationRules = [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ];

        // Tambahkan validasi gambar hanya jika ada request image
        if ($request->hasFile('image')) {
            $validationRules['image'] = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048';
        }

        $data = $request->validate($validationRules);

        $article = Articles::findOrFail($id);

        // Data yang akan diupdate
        $updateData = [
            'title' => $data['title'],
            'content' => $data['content'],
            'slug' => str()->slug($data['title']),
        ];

        // Handle upload gambar jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($article->image) {
                Storage::delete($article->image);
            }

            // Upload gambar baru
            $imagePath = $request->file('image')->store('articles', 'public');
            $updateData['image'] = $imagePath;
        }

        $article->update($updateData);

        return redirect()->route('superadmin.articles.index')->with('success', 'Post updated');
    }
}

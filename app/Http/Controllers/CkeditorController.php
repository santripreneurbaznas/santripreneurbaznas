<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CkeditorController extends Controller
{
    public function upload(Request $request)

    {


        // CKEditor 4 sends file field 'upload'
        if ($request->hasFile('upload')) {
            $file = $request->file('upload');
            $path = $file->store('uploads', 'public'); // storage/app/public/uploads
            $url = asset('storage/' . $path);

            // CKEditor 4 classic expects a JS callback when CKEditorFuncNum exists
            $funcNum = $request->input('CKEditorFuncNum');
            if ($funcNum) {
                $message = 'Image uploaded';
                $script = "<script>window.parent.CKEDITOR.tools.callFunction($funcNum, '$url', '$message');</script>";
                return response($script, 200)->header('Content-Type', 'text/html; charset=utf-8');
            }

            // Or JSON fallback (some builds can accept this)
            return response()->json([
                'uploaded' => 1,
                'fileName' => $file->getClientOriginalName(),
                'url' => $url,
            ]);
        }

        return response()->json(['uploaded' => 0, 'error' => ['message' => 'No file uploaded']]);
    }
}

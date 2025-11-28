<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FileUploadController extends Controller
{
    public function uploadRegistrationFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:2048',
            'field_name' => 'required|string',
            'user_login' => 'required|string',
        ]);

        try {
            $user = $request->user_login;

            Log::info($user);


            // if (!$user) {
            //     return response()->json([
            //         'error' => 'Unauthorized - User not authenticated'
            //     ], 401);
            // }

            $userName = str_replace(' ', '_', $user);
            $timestamp = now()->format('dmYHis');
            $fileName = $userName . '_' . $timestamp . '_' . $request->field_name . '.pdf';

            $path = $request->file('file')->storeAs(
                'registrations/' . $request->field_name,
                $fileName,
                'public'
            );

            return response()->json([
                'file_path' => $path,
                'file_name' => $fileName
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Gagal upload file: ' . $e->getMessage()
            ], 500);
        }
    }
}

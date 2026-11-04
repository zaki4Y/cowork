<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactInquiry;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Contact');
    }

    public function store(StoreContactRequest $request)
    {
        ContactInquiry::create($request->validated());
        return back()->with('success', 'Message sent! We will get back to you soon.');
    }
}

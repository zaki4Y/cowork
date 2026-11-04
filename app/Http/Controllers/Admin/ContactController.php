<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Contacts/Index', [
            'inquiries' => ContactInquiry::latest()->paginate(10),
        ]);
    }

    public function show(ContactInquiry $inquiry)
    {
        if (!$inquiry->is_read) {
            $inquiry->update(['is_read' => true]);
        }
        return Inertia::render('Admin/Contacts/Show', ['inquiry' => $inquiry]);
    }

    public function destroy(ContactInquiry $inquiry)
    {
        $inquiry->delete();
        return redirect()->route('admin.contacts.index')->with('success', 'Inquiry deleted.');
    }
}

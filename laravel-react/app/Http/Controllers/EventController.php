<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use Illuminate\Http\Request;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Dflydev\DotAccessData\Data;

class EventController extends Controller
{
    public function show(Request $request)
    {
        $publishDate = $request->query('publish_date');
        $event = Event::where('publish_date', $publishDate)->get();
        return EventResource::collection($event);
    }

    public function store(StoreEventRequest $request)
    {
        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'publish_date' => $request->publish_date,
            'time' => $request->time
        ]);

        return response()->json(['success' => 'Form submitted successfully'], 200);
    }
}

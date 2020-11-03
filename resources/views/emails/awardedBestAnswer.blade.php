Hey {{ $user->username }},

Great job, {{ $blueprint->actor->username }} just set your post as the best answer in the discussion '{{ $blueprint->discussion->title }}'. Thanks for helping out.

View it here: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }}

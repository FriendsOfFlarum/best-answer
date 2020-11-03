Hey {{ $user->username }},

{{ $blueprint->actor->username }} just set a best answer in the discussion '{{ $blueprint->discussion->title }}', which you participated in.

Check it out: {{ $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]) }}

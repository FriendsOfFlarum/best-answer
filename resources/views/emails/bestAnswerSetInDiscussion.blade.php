Hey {{ $user->username }},

{{ $blueprint->actor->username }} just set a best answer in the discussion '{{ $blueprint->discussion->title }}', which you participated in.

Check it out: {{ app()->url() }}/d/{{ $blueprint->discussion->id }}-{{ $blueprint->discussion->slug }}

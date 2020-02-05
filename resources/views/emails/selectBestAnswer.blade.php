Hey {{ $user->username }},

Just checking in; by now you should have plenty of replies to your question - '{{ $blueprint->discussion->title }}'. Hopefully one of them has helped you solve your problem.

If so, it would be really helpful for future members if you could set a best answer to your question. It'll help people with the same problem find the answer they need, and it's also a big thank you to the members who helped you out. They give their time voluntarily, so it's nice to let them know that they're doing well.

Visit the discussion here: {{ app()->url() }}/d/{{ $blueprint->discussion->id }}-{{ $blueprint->discussion->slug }}, and select the most appropriate post as the best answer.

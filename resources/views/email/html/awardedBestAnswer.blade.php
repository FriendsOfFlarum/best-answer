<x-mail::html.notification>
    <x-slot:body>
        {!! $formatter->convert($translator->trans('fof-best-answer.email.body.awarded', [
    '{recipient_display_name}' => $user->display_name,
    '{actor_display_name}' => $blueprint->actor->display_name,
    '{discussion_title}' => $blueprint->discussion->title,
    '{discussion_url}' => $url->to('forum')->route('discussion', ['id' => $blueprint->discussion->id]),
])) !!}
    </x-slot:body>
</x-mail::html.notification>

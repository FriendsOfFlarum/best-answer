# FriendsOfFlarum Best Answer

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/fof/best-answer.svg)](https://packagist.org/packages/fof/best-answer) [![OpenCollective](https://img.shields.io/badge/opencollective-fof-blue.svg)](https://opencollective.com/fof/donate) [![Donate](https://img.shields.io/badge/donate-datitisev-important.svg)](https://datitisev.me/donate)

A [Flarum](https://flarum.org) extension. Mark a post as the best answer in a discussion. Original by @wiwatsrt.

## Features

- Allow Best Answers to be set and highlighted within a discussion
- Set which tags support Best Answer/Q&A format
- Filter answered/unanswered/all discussions within available tags
- Send reminders to the OP to select a Best Answer after a configurable number of days
- Optionally allow the OP to select one of their own follow-up posts as the Best Answer
- Provides two layouts for the Best Answer controls
- Option to prevent reminders from being sent overnight

## Requirements

- Flarum 2.x
- [flarum/tags](https://packagist.org/packages/flarum/tags)

These extensions are optional. When one is enabled, Best Answer adds:

- [flarum/audit](https://packagist.org/packages/flarum/audit): an audit log entry when a best answer is set or unset.
- [flarum/deck](https://packagist.org/packages/flarum/deck): **Unsolved questions** and **Best answers** columns. With flarum/realtime they follow best answers being set and removed as it happens.
- [flarum/realtime](https://packagist.org/packages/flarum/realtime): a live `bestAnswerEvent` broadcast when a best answer is set or unset.
- [fof/user-directory](https://packagist.org/packages/fof/user-directory): "Most best answers" and "Least best answers" sort options in the user directory.
- [ianm/level-ranks](https://packagist.org/packages/ianm/level-ranks): extra spacing beside the best answer label in post headers.

## Installation

Install with composer:

```sh
composer require fof/best-answer:"*"
```

## Usage

The settings are on the **FoF Best Answer** page in the admin panel.

### Q&A tags

Best answers can only be set in discussions that have at least one Q&A tag. Choose these tags in **Enabled Tags**.

In a Q&A tag, the start discussion button reads **Ask a Question**. When a Q&A tag is selected in the composer, the title placeholder reads **Question title**.

Best answers can't be set in private discussions.

### Permissions

The permissions are in the **Participate** section of the **Permissions** page. Grant them globally, or per tag for restricted tags.

| Permission | Allows the user to |
| --- | --- |
| Select Best Answer (own Discussion) | Set or remove the best answer in discussions they started. |
| Select Best Answer (not own Discussion) | Set or remove the best answer in discussions started by others. |
| Select own post as Best Answer | Select one of their own posts. They also need one of the two permissions above. |

The select control isn't shown on hidden posts or on the first post of a discussion.

### Solved/unsolved filter

Turn on **Display Best Answer filter dropdown** to add a filter to the discussion list of each Q&A tag. It offers **All questions**, **Solved questions** and **Unsolved questions**.

In discussion search, `is:solved` finds discussions with a best answer and `-is:solved` finds discussions without one. `is:question` finds discussions in Q&A tags, so `is:question -is:solved` finds unsolved questions.

In post search, `is:solution` finds posts selected as a best answer.

### Reminders

A reminder is a notification that asks a discussion's author to select a best answer.

To send reminders:

1. Set **Reminder frequency** to the number of days to wait after a discussion is started. `0`, the default, turns reminders off.
2. Choose the tags in **Reminder Tags**. Pick tags that are also in **Enabled Tags**: the reminder command doesn't check whether a discussion has a Q&A tag.
3. Run the Flarum scheduler. Add a cron entry that calls `php flarum schedule:run` every minute, as described in the [Flarum documentation](https://docs.flarum.org/console/#schedule).

The extension schedules the `fof:best-answer:notify` command to run hourly. `php flarum schedule:list` shows it. Each run reminds the author of every discussion that:

- has a reminder tag
- was started between N and N + 7 days ago, where N is the **Reminder frequency**
- has at least one reply
- has no best answer, isn't hidden or private, and its author's account still exists
- hasn't been reminded before

The author must have the **Select Best Answer (own Discussion)** permission. If no one else has posted a reply the author could select, the author also needs **Select own post as Best Answer**. Hidden replies, replies awaiting approval and event posts, such as a tag change, don't count. A reply from a deleted account does.

Each discussion gets one reminder at most. Setting a best answer deletes the reminder.

With **Prevent reminder notifications being sent during unsocial hours** turned on, the command only runs between 08:00 and 21:00 UTC. With **Append scheduler output to log storage** turned on, the command's output is added to `storage/logs/fof-best-answer.log`.

### Other settings

| Setting | Effect |
| --- | --- |
| Alternative layout | Shows the select button in the post footer instead of the post's controls menu. |
| Max lines to show in post preview | The best answer is previewed under the first post. Longer answers are cut to this many lines. `0` shows the whole answer. |
| Tags for discussions with Best Answers | Secondary tags added to a discussion when a best answer is set, and removed when it is unset. |
| Display jump to Best Answer button in discussion sidebar | Adds a **View Best Answer** button to the discussion sidebar. |

### Notifications

Users choose how they receive these in their notification settings.

| Notification | Sent to | On by default |
| --- | --- | --- |
| Someone sets my post as a best answer | The author of the selected post, unless they selected it | Alert |
| A best answer is set in a discussion I participated in | Other users who posted in the discussion | None |
| An automated reminder to select a best answer in a discussion I started | The discussion's author | Alert and email |

## Updating

```sh
composer update fof/best-answer
```

### Upgrading from 2.0.0-beta.8 or earlier

Before this release, choosing a different best answer in a discussion left the previous answer's author with one best answer too many. After updating, recalculate every user's best answer count:

```sh
php flarum fof:best-answer:update-counts
```

The command goes through every user, so it can take a while on large forums.

## Links

[![OpenCollective](https://img.shields.io/badge/donate-friendsofflarum-44AEE5?style=for-the-badge&logo=open-collective)](https://opencollective.com/fof/donate) [![GitHub](https://img.shields.io/badge/donate-datitisev-ea4aaa?style=for-the-badge&logo=github)](https://datitisev.me/donate/github)

- [Packagist](https://packagist.org/packages/fof/best-answer)
- [GitHub](https://github.com/FriendsOfFlarum/best-answer)
- [Original by wiwatsrt](https://packagist.org/packages/wiwatsrt/flarum-ext-best-answer)

An extension by [FriendsOfFlarum](https://github.com/FriendsOfFlarum).

# FriendsOfFlarum Best Answer

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/fof/best-answer.svg)](https://packagist.org/packages/fof/best-answer) [![OpenCollective](https://img.shields.io/badge/opencollective-fof-blue.svg)](https://opencollective.com/fof/donate) [![Donate](https://img.shields.io/badge/donate-datitisev-important.svg)](https://datitisev.me/donate)

A [Flarum](http://flarum.org) extension. Mark a post as the best answer in a discussion. Original by @wiwatsrt. Requires `flarum/tags`

### Features
- Allow Best Answers to be set and highlighted within a discussion
- Set which tags support Best Answer/Q&A format
- Filter answered/unanswered/all discussions within available tags
- Send reminders to the OP to select a Best Answer after a configurable number of days
- Optionally allow the OP to select one of their own follow-up posts as the Best Answer
- Provides two layouts for the Best Answer controls
- Option to prevent reminders from being sent overnight

### Usage

Select which tags(s) you wish to enable for Best Answers to be set in using the `edit tags` feature of `flarum/tags`. These tags will then display `Ask a Question` in the start discussion button, rather than `Start a Discussion`. Optionally also select which tags(s) you wish to allow reminders to set Best Answers for.

To be continued...

### Installation

Install with composer:

```sh
composer require fof/best-answer:"*"
```

### Updating

```sh
composer update fof/best-answer
```

#### Upgrading from 2.0.0-beta.8 or earlier

Before this release, choosing a different best answer in a discussion left the previous answer's author with one best answer too many. After updating, recalculate every user's best answer count:

```sh
php flarum fof:best-answer:update-counts
```

The command goes through every user, so it can take a while on large forums.

### Links

[![OpenCollective](https://img.shields.io/badge/donate-friendsofflarum-44AEE5?style=for-the-badge&logo=open-collective)](https://opencollective.com/fof/donate) [![GitHub](https://img.shields.io/badge/donate-datitisev-ea4aaa?style=for-the-badge&logo=github)](https://datitisev.me/donate/github)

- [Packagist](https://packagist.org/packages/fof/best-answer)
- [GitHub](https://github.com/packages/FriendsOfFlarum/best-answer)
- [Original by wiwatsrt](https://packagist.org/packages/wiwatsrt/flarum-ext-best-answer)

An extension by [FriendsOfFlarum](https://github.com/FriendsOfFlarum).

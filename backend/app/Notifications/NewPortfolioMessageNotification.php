<?php

namespace App\Notifications;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPortfolioMessageNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Message $portfolioMessage
    ) {
    }

    public function via(
        object $notifiable
    ): array {
        return [
            'mail',
        ];
    }

    public function toMail(
        object $notifiable
    ): MailMessage {
        $message =
            $this->portfolioMessage;

        $subject =
            $message->subject
                ?: 'Portfolio Message';

        return (new MailMessage)
            ->subject(
                'New Portfolio Message: ' .
                $subject
            )
            ->greeting(
                'New portfolio message received'
            )
            ->line(
                'A visitor sent you a new message through your portfolio.'
            )
            ->line(
                'Name: ' .
                $message->name
            )
            ->line(
                'Email: ' .
                $message->email
            )
            ->line(
                'Subject: ' .
                (
                    $message->subject
                        ?: 'No subject'
                )
            )
            ->line(
                'Message:'
            )
            ->line(
                $message->message
            )
            ->action(
                'Open Admin Inbox',
                rtrim(
                    (string) env(
                        'FRONTEND_URL',
                        'http://localhost:3000'
                    ),
                    '/'
                ) .
                '/admin/messages'
            )
            ->line(
                'Message reference #' .
                $message->id
            );
    }

    public function toArray(
        object $notifiable
    ): array {
        return [
            'message_id' =>
                $this
                    ->portfolioMessage
                    ->id,
        ];
    }
}
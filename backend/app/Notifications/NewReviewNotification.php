<?php

namespace App\Notifications;

use App\Models\Review;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewReviewNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Review $review
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
        $review =
            $this->review;

        $adminUrl =
            rtrim(
                (string) env(
                    'FRONTEND_URL',
                    'http://localhost:3000'
                ),
                '/'
            )
            . '/admin/reviews';

        $mail =
            (new MailMessage)
                ->subject(
                    'New Portfolio Review from '
                    . $review->name
                )
                ->greeting(
                    'New portfolio review received'
                )
                ->line(
                    'A visitor submitted a new review through your portfolio.'
                )
                ->line(
                    'Name: '
                    . $review->name
                )
                ->line(
                    'Email: '
                    . $review->email
                );

        if (
            $review->company
        ) {
            $mail->line(
                'Company: '
                . $review->company
            );
        }

        if (
            $review->role
        ) {
            $mail->line(
                'Role: '
                . $review->role
            );
        }

        $mail
            ->line(
                'Rating: '
                . $review->rating
                . '/5'
            )
            ->line(
                'Permission to publish: '
                . (
                    $review->permission_to_publish
                        ? 'Yes'
                        : 'No'
                )
            )
            ->line(
                'Review:'
            )
            ->line(
                $review->review
            )
            ->action(
                'Open Reviews',
                $adminUrl
            )
            ->line(
                'Review reference #'
                . $review->id
            )
            ->line(
                'This review is currently pending moderation.'
            );

        return $mail;
    }

    public function toArray(
        object $notifiable
    ): array {
        return [
            'review_id' =>
                $this
                    ->review
                    ->id,
        ];
    }
}
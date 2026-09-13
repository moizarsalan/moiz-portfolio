<?php

namespace App\Notifications;

use App\Models\ProjectRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectRequestNotification extends Notification
{
    use Queueable;

    public function __construct(
        public ProjectRequest $projectRequest
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
        $project =
            $this->projectRequest;

        $adminUrl =
            rtrim(
                (string) env(
                    'FRONTEND_URL',
                    'http://localhost:3000'
                ),
                '/'
            )
            . '/admin/project-requests';

        $mail =
            (new MailMessage)
                ->subject(
                    'New Project Request: '
                    . $project->project_name
                )
                ->greeting(
                    'New project request received'
                )
                ->line(
                    'A visitor submitted a new website project request through your portfolio.'
                )
                ->line(
                    'Client: '
                    . $project->name
                )
                ->line(
                    'Email: '
                    . $project->email
                );

        if (
            $project->company
        ) {
            $mail->line(
                'Company: '
                . $project->company
            );
        }

        $mail
            ->line(
                'Project name: '
                . $project->project_name
            )
            ->line(
                'Project type: '
                . $project->project_type
            )
            ->line(
                'Pages: '
                . (
                    $project->pages
                        ?: 'Not specified'
                )
            )
            ->line(
                'Budget: '
                . (
                    $project->budget
                        ?: 'Not specified'
                )
            )
            ->line(
                'Timeline: '
                . (
                    $project->timeline
                        ?: 'Not specified'
                )
            )
            ->line(
                'Project description:'
            )
            ->line(
                $project->project_description
            );

        if (
            is_array(
                $project->features
            ) &&
            count(
                $project->features
            ) > 0
        ) {
            $mail->line(
                'Requested features: '
                . implode(
                    ', ',
                    $project->features
                )
            );
        }

        if (
            $project->custom_feature
        ) {
            $mail->line(
                'Custom feature: '
                . $project->custom_feature
            );
        }

        if (
            $project->existing_website_url
        ) {
            $mail->line(
                'Existing website: '
                . $project->existing_website_url
            );
        }

        if (
            $project->additional_notes
        ) {
            $mail
                ->line(
                    'Additional notes:'
                )
                ->line(
                    $project->additional_notes
                );
        }

        return $mail
            ->action(
                'Open Project Requests',
                $adminUrl
            )
            ->line(
                'Project request reference #'
                . $project->id
            );
    }

    public function toArray(
        object $notifiable
    ): array {
        return [
            'project_request_id' =>
                $this
                    ->projectRequest
                    ->id,
        ];
    }
}
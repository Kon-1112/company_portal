<?php

 return [
         /**
          * SlackのWebhook URL
          */
        'webhook_url' => env('SLACK_WEBHOOK_URL'),

        /**
         * Slackのアイコン
         */
        'icon' => env('SLACK_ICON', ':ghost:'),

        /**
         * Slackの通知を有効にするか
         */
        'enabled' => env('SLACK_ENABLED', false),

        /**
         * Slackの通知を有効にする環境
         */
        'environments' => [
            'production',
        ],

        /**
         * Slackの通知を無効にする環境
         */
        'except_environments' => [
            'local',
        ],

        /**
         * Slackの通知を有効にするIPアドレス
         */
        'ip_addresses' => [
            ''
        ],

        /**
         * Slackの通知を無効にするIPアドレス
         */
        'except_ip_addresses' => [
            ''
        ],

        /**
         * Slackの通知を有効にするユーザー
         */
        'users' => [
            ''
        ],

        /**
         * Slackの通知を無効にするユーザー
         */
        'except_users' => [
            ''
        ],
 ];

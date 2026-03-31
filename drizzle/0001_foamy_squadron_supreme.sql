CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`session_id` varchar(128) NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feature_votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`feature_id` varchar(128) NOT NULL,
	`feature_label` varchar(256) NOT NULL,
	`category` varchar(64) NOT NULL,
	`votes` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `feature_votes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`source` varchar(128),
	`campaign` varchar(128),
	`property` varchar(128),
	`budget` varchar(64),
	`unit_type` varchar(64),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `social_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` enum('instagram','facebook','linkedin') NOT NULL,
	`campaign` varchar(128) NOT NULL,
	`property` varchar(128),
	`caption` text NOT NULL,
	`hashtags` text,
	`call_to_action` varchar(256),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `social_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `survey_responses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`respondent_type` enum('tenant','developer','prospect') NOT NULL,
	`name` varchar(256),
	`email` varchar(320),
	`top_features` json,
	`pain_points` json,
	`willingness_to_pay` varchar(64),
	`must_haves` text,
	`deal_breakers` text,
	`community_vision` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `survey_responses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tour_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`property` varchar(128) NOT NULL,
	`unit_type` varchar(64),
	`preferred_date` varchar(32) NOT NULL,
	`preferred_time` varchar(32) NOT NULL,
	`message` text,
	`campaign` varchar(128),
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tour_bookings_id` PRIMARY KEY(`id`)
);

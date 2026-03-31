CREATE TABLE `dream_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`feature` text NOT NULL,
	`name` varchar(256),
	`email` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dream_submissions_id` PRIMARY KEY(`id`)
);

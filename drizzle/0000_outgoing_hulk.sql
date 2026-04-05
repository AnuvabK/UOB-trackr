CREATE TABLE "screentime_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"date" date NOT NULL,
	"totalMins" integer NOT NULL,
	"category" varchar(50) NOT NULL,
	"appName" varchar(255),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "sleep_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"date" date NOT NULL,
	"bedtime" timestamp NOT NULL,
	"wakeTime" timestamp NOT NULL,
	"quality" integer NOT NULL,
	"notes" text,
	"cycles" json
);
--> statement-breakpoint
CREATE TABLE "stress_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"date" date NOT NULL,
	"level" integer NOT NULL,
	"source" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "screentime_entries" ADD CONSTRAINT "screentime_entries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sleep_entries" ADD CONSTRAINT "sleep_entries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stress_entries" ADD CONSTRAINT "stress_entries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
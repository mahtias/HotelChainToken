CREATE TABLE "booking_vouchers" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"voucher_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"hotel_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"checkin_date" timestamp NOT NULL,
	"checkout_date" timestamp NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"type" text NOT NULL,
	"total_value" integer NOT NULL,
	"min_investment" integer NOT NULL,
	"expected_return" real NOT NULL,
	"funding_progress" real NOT NULL,
	"rooms" integer NOT NULL,
	"rating" real NOT NULL,
	"image_url" text NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "investments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"hotel_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"current_value" integer NOT NULL,
	"purchase_date" timestamp DEFAULT now(),
	"status" text DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"booking_id" integer,
	"investment_id" integer,
	"wallet_address" text NOT NULL,
	"amount" text NOT NULL,
	"amount_human" text,
	"method" text NOT NULL,
	"status" text DEFAULT 'pending',
	"tx_hash" text,
	"received_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "payments_tx_hash_unique" UNIQUE("tx_hash")
);
--> statement-breakpoint
CREATE TABLE "portfolios" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"total_investment" integer NOT NULL,
	"current_value" integer NOT NULL,
	"total_return" integer NOT NULL,
	"return_rate" real NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"wallet_address" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vouchers" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"discount_amount" integer,
	"discount_percent" real,
	"max_usage" integer DEFAULT 1,
	"used_count" integer DEFAULT 0,
	"valid_from" timestamp NOT NULL,
	"valid_until" timestamp NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "vouchers_code_unique" UNIQUE("code")
);

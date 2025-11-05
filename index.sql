CREATE TABLE "users"(
    "id" CHAR(36) NOT NULL,
    "slug" VARCHAR(255) NULL,
    "status" VARCHAR(50) NULL,
    "first_name" VARCHAR(255) NULL,
    "last_name" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "email_validated" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "email_validation_before_login" BOOLEAN NULL,
    "avatar" VARCHAR(255) NULL,
    "bio" TEXT NULL,
    "company" VARCHAR(255) NULL,
    "location" VARCHAR(255) NULL,
    "phone" VARCHAR(50) NULL,
    "website" VARCHAR(255) NULL,
    "social_facebook" VARCHAR(255) NULL,
    "social_instagram" VARCHAR(255) NULL,
    "social_twitter" VARCHAR(255) NULL,
    "social_linkedin" VARCHAR(255) NULL,
    "social_youtube" VARCHAR(255) NULL,
    "social_eventbrite" VARCHAR(255) NULL,
    "social_slack" VARCHAR(255) NULL,
    "social_discord" VARCHAR(255) NULL,
    "social_github" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NULL,
    "mentoring" BOOLEAN NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_slug_unique" UNIQUE("slug");
CREATE TABLE "contacts"(
    "id" CHAR(36) NOT NULL,
    "partner_id" CHAR(36) NULL,
    "first_name" VARCHAR(255) NULL,
    "last_name" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "notes" TEXT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" CHAR(36) NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" CHAR(36) NULL
);
ALTER TABLE
    "contacts" ADD PRIMARY KEY("id");
CREATE TABLE "partners"(
    "id" CHAR(36) NOT NULL,
    "group_id" CHAR(36) NULL,
    "slug" VARCHAR(255) NULL,
    "name" VARCHAR(255) NULL,
    "notes" TEXT NULL,
    "description" TEXT NULL,
    "logo" VARCHAR(255) NULL,
    "social_facebook" VARCHAR(255) NULL,
    "social_instagram" VARCHAR(255) NULL,
    "social_twitter" VARCHAR(255) NULL,
    "social_linkedin" VARCHAR(255) NULL,
    "social_youtube" VARCHAR(255) NULL,
    "social_eventbrite" VARCHAR(255) NULL,
    "social_slack" VARCHAR(255) NULL,
    "social_discord" VARCHAR(255) NULL,
    "social_github" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" CHAR(36) NULL
);
ALTER TABLE
    "partners" ADD PRIMARY KEY("id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_slug_unique" UNIQUE("slug");
CREATE TABLE "sponsors"(
    "id" CHAR(36) NOT NULL,
    "group_id" CHAR(36) NULL,
    "partner_id" CHAR(36) NULL,
    "sponsor_pack_id" CHAR(36) NULL,
    "contact_id" CHAR(36) NULL,
    "start" DATE NULL,
    "finish" DATE NULL,
    "paid" BOOLEAN NULL,
    "price" DECIMAL(10, 2) NULL
);
ALTER TABLE
    "sponsors" ADD PRIMARY KEY("id");
CREATE TABLE "sponsor_packs"(
    "id" CHAR(36) NOT NULL,
    "group_id" CHAR(36) NULL,
    "slug" VARCHAR(255) NULL,
    "name" VARCHAR(255) NULL,
    "description" TEXT NULL,
    "price" DECIMAL(10, 2) NULL
);
ALTER TABLE
    "sponsor_packs" ADD PRIMARY KEY("id");
CREATE TABLE "groups"(
    "id" CHAR(36) NOT NULL,
    "slug" VARCHAR(255) NULL,
    "name" VARCHAR(255) NULL,
    "logo" VARCHAR(255) NULL,
    "banner" VARCHAR(255) NULL,
    "contact" VARCHAR(255) NULL,
    "website" VARCHAR(255) NULL,
    "description" TEXT NULL,
    "location" VARCHAR(255) NULL,
    "location_lat" DECIMAL(10, 8) NULL
);
ALTER TABLE
    "groups" ADD PRIMARY KEY("id");
ALTER TABLE
    "groups" ADD CONSTRAINT "groups_slug_unique" UNIQUE("slug");
CREATE TABLE "venues"(
    "id" CHAR(36) NOT NULL,
    "partner_id" CHAR(36) NULL,
    "contact_id" CHAR(36) NULL,
    "address" VARCHAR(255) NULL,
    "address_lat" DECIMAL(10, 8) NULL
);
ALTER TABLE
    "venues" ADD PRIMARY KEY("id");
CREATE TABLE "logins"(
    "provider_id" VARCHAR(255) NOT NULL,
    "provider_key" VARCHAR(255) NOT NULL,
    "user_id" CHAR(36) NULL
);
ALTER TABLE
    "logins" ADD PRIMARY KEY("provider_id");
ALTER TABLE
    "logins" ADD PRIMARY KEY("provider_key");
CREATE TABLE "cfps"(
    "id" CHAR(36) NOT NULL,
    "group_id" CHAR(36) NULL,
    "slug" VARCHAR(255) NULL,
    "name" VARCHAR(255) NULL,
    "begin" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "close" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "description" TEXT NULL,
    "tags" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" CHAR(36) NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" CHAR(36) NULL
);
ALTER TABLE
    "cfps" ADD PRIMARY KEY("id");
ALTER TABLE
    "contacts" ADD CONSTRAINT "contacts_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "venues" ADD CONSTRAINT "venues_contact_id_foreign" FOREIGN KEY("contact_id") REFERENCES "contacts"("id");
ALTER TABLE
    "contacts" ADD CONSTRAINT "contacts_partner_id_foreign" FOREIGN KEY("partner_id") REFERENCES "partners"("id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "logins" ADD CONSTRAINT "logins_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_partner_id_foreign" FOREIGN KEY("partner_id") REFERENCES "partners"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_contact_id_foreign" FOREIGN KEY("contact_id") REFERENCES "contacts"("id");
ALTER TABLE
    "venues" ADD CONSTRAINT "venues_partner_id_foreign" FOREIGN KEY("partner_id") REFERENCES "partners"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_sponsor_pack_id_foreign" FOREIGN KEY("sponsor_pack_id") REFERENCES "sponsor_packs"("id");
ALTER TABLE
    "cfps" ADD CONSTRAINT "cfps_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "sponsor_packs" ADD CONSTRAINT "sponsor_packs_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "contacts" ADD CONSTRAINT "contacts_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "cfps" ADD CONSTRAINT "cfps_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "cfps" ADD CONSTRAINT "cfps_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
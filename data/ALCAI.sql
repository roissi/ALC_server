BEGIN;

-- Suppression des DOMAIN existants
DROP DOMAIN IF EXISTS "email_regex" CASCADE;

-- Création DOMAIN
CREATE DOMAIN email_regex AS TEXT CHECK( 
    VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

-- Suppression des tables existantes
DROP TABLE IF EXISTS "users", "interests", "user_interests", "agenda_entries", "gpt_suggestions" CASCADE;

-- Création des tables 

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT UNIQUE NOT NULL,
    "email" email_regex UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at" TEXT
);

CREATE TABLE "interests" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "type" TEXT NOT NULL CHECK(type IN ('Interest', 'Need')), -- Ajouté cette colonne
    "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at" TEXT
);

CREATE TABLE "user_interests" (
    "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
    "interest_id" INTEGER REFERENCES "interests"("id") ON DELETE CASCADE,
    "is_permanent" BOOLEAN NOT NULL,
    "duration" INTEGER, -- la durée peut être en jours, semaines ou mois
    "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at" TEXT,
    PRIMARY KEY ("user_id", "interest_id")
);

CREATE TABLE "agenda_entries" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "day" TEXT,
    "hour" INTEGER,
    "description" TEXT,
    "suggestion_id" INTEGER REFERENCES "gpt_suggestions"("id") ON DELETE CASCADE,
    "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at" TEXT
);

CREATE TABLE "gpt_suggestions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
    "suggestion_text" TEXT NOT NULL,
    "created_at" TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    "updated_at" TEXT
);

COMMIT;
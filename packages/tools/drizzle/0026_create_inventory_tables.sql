-- Create inventory tables for stock tracking per organization and year

CREATE TABLE "table_inventory_item" (
    "id" text PRIMARY KEY NOT NULL,
    "id_organization" text NOT NULL REFERENCES "table_organization"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "id_year" text NOT NULL REFERENCES "table_year"("id") ON DELETE CASCADE ON UPDATE CASCADE,

    "sku" varchar(64),
    "name" varchar(256) NOT NULL,
    "description" varchar(1024),
    "category" varchar(256),
    "unit" varchar(32) NOT NULL,
    "unit_price" numeric(10, 2),
    "current_quantity" numeric(10, 2) NOT NULL DEFAULT 0,
    "minimum_threshold" numeric(10, 2),
    "location" varchar(256),

    "created_at" timestamp NOT NULL,
    "last_updated_at" timestamp,
    "created_by" text REFERENCES "table_user"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "last_updated_by" text REFERENCES "table_user"("id") ON DELETE SET NULL ON UPDATE CASCADE,

    UNIQUE ("id_organization", "id_year", "sku")
);

CREATE INDEX ON "table_inventory_item" ("id_organization", "id_year");
CREATE INDEX ON "table_inventory_item" ("id_organization", "id_year", "category");

CREATE TABLE "table_inventory_movement" (
    "id" text PRIMARY KEY NOT NULL,
    "id_organization" text NOT NULL REFERENCES "table_organization"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "id_year" text NOT NULL REFERENCES "table_year"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "id_inventory_item" text NOT NULL REFERENCES "table_inventory_item"("id") ON DELETE CASCADE ON UPDATE CASCADE,

    "quantity_change" numeric(10, 2) NOT NULL,
    "unit_price_at_movement" numeric(10, 2),
    "reference" varchar(256),
    "reason" varchar(256),
    "movement_date" timestamp NOT NULL,

    "created_at" timestamp NOT NULL,
    "last_updated_at" timestamp,
    "created_by" text REFERENCES "table_user"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "last_updated_by" text REFERENCES "table_user"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX ON "table_inventory_movement" ("id_organization", "id_year");
CREATE INDEX ON "table_inventory_movement" ("id_inventory_item");
CREATE INDEX ON "table_inventory_movement" ("id_inventory_item", "movement_date");

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_breeds_size') THEN
        DROP TYPE "public"."enum_breeds_size" CASCADE;
    END IF;
   END $$;
   CREATE TYPE "public"."enum_breeds_size" AS ENUM('small', 'medium', 'large');
  
  DROP TABLE IF EXISTS "breeds_gallery" CASCADE;
  CREATE TABLE "breeds_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  DROP TABLE IF EXISTS "breeds" CASCADE;
  CREATE TABLE "breeds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"short_description" varchar,
  	"image_id" integer NOT NULL,
  	"price" numeric,
  	"temperament" varchar,
  	"life_expectancy" varchar,
  	"size" "enum_breeds_size",
  	"origin" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='breeds_id') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "breeds_id" integer;
    END IF;
  END $$;

  ALTER TABLE "breeds_gallery" ADD CONSTRAINT "breeds_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "breeds_gallery" ADD CONSTRAINT "breeds_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."breeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "breeds" ADD CONSTRAINT "breeds_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "breeds_gallery_order_idx" ON "breeds_gallery" USING btree ("_order");
  CREATE INDEX "breeds_gallery_parent_id_idx" ON "breeds_gallery" USING btree ("_parent_id");
  CREATE INDEX "breeds_gallery_image_idx" ON "breeds_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "breeds_slug_idx" ON "breeds" USING btree ("slug");
  CREATE INDEX "breeds_image_idx" ON "breeds" USING btree ("image_id");
  CREATE INDEX "breeds_updated_at_idx" ON "breeds" USING btree ("updated_at");
  CREATE INDEX "breeds_created_at_idx" ON "breeds" USING btree ("created_at");
  
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='payload_locked_documents_rels_breeds_fk') THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_breeds_fk" FOREIGN KEY ("breeds_id") REFERENCES "public"."breeds"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_breeds_id_idx";
  CREATE INDEX "payload_locked_documents_rels_breeds_id_idx" ON "payload_locked_documents_rels" USING btree ("breeds_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "breeds_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "breeds" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "breeds_gallery" CASCADE;
  DROP TABLE "breeds" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_breeds_fk";
  
  DROP INDEX "payload_locked_documents_rels_breeds_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "breeds_id";
  DROP TYPE "public"."enum_breeds_size";`)
}

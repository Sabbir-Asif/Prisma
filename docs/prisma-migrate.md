# Prisma Migrate

When you define a model in the `schema.prisma` file, you're essentially describing what your data **should** look like — like saying, "I want a `User` table with an `id`, `name`, and `email`."

But just writing this in the schema file doesn’t automatically create or update anything in your actual database. The database is still unaware of your changes.

That’s where **migration** comes in.

When you **run a migration**, Prisma takes the model definitions you’ve written and **translates them into real SQL commands** that create or update tables in your actual database. This is how the database structure is brought in sync with what you wrote in your schema.

For example, if you define a new `Post` model in your schema, Prisma will generate SQL like:

```sql
CREATE TABLE "Post" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT
);
```

and apply that to your PostgreSQL database.

So, you migrate **after** defining a model to:

* Apply the new model (or changes) to your actual database.
* Make sure your database and your schema are in sync.
* Create a versioned history of schema changes if you use Prisma Migrate.

Until you do this, your application’s Prisma Client might expect certain tables or fields to exist — but your database won’t have them yet, which would cause errors.

Think of it like designing a building blueprint (the schema) — the migration is the construction crew that turns the blueprint into a real building (the database structure).

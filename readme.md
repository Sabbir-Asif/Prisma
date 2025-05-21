
# Prisma with PostgreSQL Setup Guide

This guide will help you set up Prisma in a Node.js project using PostgreSQL and TypeScript.

Before getting started:
[Learn what Prisma is](./docs/prisma.md)

---

## Installation

```bash
npm init -y
npm i --save-dev prisma typescript ts-node @types/node nodemon
npx prisma init
npx tsc --init
```

The `npx prisma init` command will create a new `prisma` directory in your project root. Inside it, you'll find a file named `schema.prisma`, which is where you define your database schema and configure the Prisma client.

---

## Step 1: Configure Your Database Connection

Open your `.env` file and set the `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

---

## Step 2: Define Your Data Model

Edit the `schema.prisma` file to define your models. For example:

```prisma
model User {
  id   Int    @id @default(autoincrement())
  name String
}
```

At this point, your model is only defined in the schema file. It hasn’t been created in the actual database yet.

To apply this model to your database, run:

```bash
npx prisma migrate dev --name init
```

This command does two things:

1. Creates a migration file inside `prisma/migrations/` that contains the SQL to create your schema.
2. Applies the migration to your database.

[Learn more about Prisma Migrate](./docs/prisma-migrate.md)

---

## Step 3: Install Prisma Client

Install the runtime Prisma client, which your application will use to query the database:

```bash
npm i @prisma/client
```

[Learn more about Prisma Client](./docs/prisma-client.md)

---

## Step 4: Generate the Prisma Client

Generate the client based on the current schema:

```bash
npx prisma generate
```

By default, this generates the client in the `node_modules/@prisma/client` directory.

If you want to change the output directory, you can configure it in the `generator` block of `schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}
```

This will generate the client in the `generated/client` directory instead.

---

## Filtering

To learn about advanced filtering and query techniques with Prisma:

[Learn more about advanced queries](./docs/advanced-query.md)

---

This guide should help you go from setup to querying your database smoothly. For deeper topics like relational queries, aggregations, or transactions, refer to the Prisma documentation or linked articles.

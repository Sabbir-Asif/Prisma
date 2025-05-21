<a href='https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql'>prisma postgres doc link</a>

Before start: <a href='./docs//prisma.md'>learn what is prisma</a>
## Installation

```bash
npm init -y
npm i --save-dev prisma typescript ts-node @types/node nodemon
npx prisma init
npx tsc --init
```

```bash
npx prisma init
```
This command will create a new directory called `prisma` in your project root, which contains a file named `schema.prisma`. This file is where you define your database schema and Prisma client configuration.

## Step 1: configure your database connection

```js
//.env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

## Step 2: define your data model

```prisma
// prisma/schema.prisma
model User {
  id Int @id @default(autoincrement())
  name String
}
```

But this model does not have any connection to your database yet. You need to run 
```bash
npx prisma migrate dev --name init
```
This command will create a new migration file in the `prisma/migrations` directory, which contains the SQL statements needed to create the `User` table in your database. It will also apply the migration to your database.
<a href='./docs/prisma-migrate.md'>learn more about prisma migrate</a>

## Step 3: install prisma client
```bash
npm i @prisma/client
```
<a href='./docs/prisma-client.md'>learn more about prisma client</a>

## Step 4: generate the Prisma client
```bash
npx prisma generate
```
This command will generate the Prisma client based on your schema. The generated client will be located in the `node_modules/@prisma/client` directory.
You can also specify a custom output directory for the generated client by modifying the `generator` block in your `schema.prisma` file. For example:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}
```
This will generate the Prisma client in the `generated/client` directory instead of the default location.

## Filtering
To learn about filtering in Prisma Checkout this link: <a href='./docs/advanced-query.md'>learn more about advanced query</a>


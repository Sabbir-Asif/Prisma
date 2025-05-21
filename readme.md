<a href='https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql'>prisma postgres doc link</a>

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

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
we need `schema.prisma` file to define our database schema and Prisma client configuration. The `generator` block specifies that we want to generate a Prisma client in the `../generated/prisma` directory, and the `datasource` block specifies that we are using PostgreSQL as our database provider. The `url` field should point to your PostgreSQL database connection string, which you can set in an `.env` file.

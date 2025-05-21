
# Mastering Advanced `where` Queries in Prisma

When working with databases, filtering data is one of the most common tasks. In SQL, you'd use `WHERE` clauses. In Prisma, we do the same thing using the `where` option available in most Prisma Client methods, like `findMany`, `findFirst`, `updateMany`, and others.

While simple filters are easy, Prisma’s `where` capabilities go much deeper and allow for complex, powerful, and expressive queries.

In this post, we'll explore a wide range of advanced `where` query patterns with examples so you can use Prisma like a pro.

---

## Basic `where` Clause

Let’s start simple. Suppose we have a `User` model:

```prisma
model User {
  id       Int     @id @default(autoincrement())
  name     String
  email    String  @unique
  age      Int
  isActive Boolean @default(true)
}
```

### Get all users who are 30 years old

```ts
const users = await prisma.user.findMany({
  where: {
    age: 30,
  },
});
```

---

## Comparison Operators

Prisma provides operators like `gt`, `gte`, `lt`, `lte`, `not`, and `equals` to filter by numeric, date, and string values.

### Users older than 25

```ts
where: {
  age: {
    gt: 25,
  },
}
```

### Users younger than or equal to 40

```ts
where: {
  age: {
    lte: 40,
  },
}
```

### Users who are **not** 30 years old

```ts
where: {
  age: {
    not: 30,
  },
}
```

### Users whose name is exactly 'Alice'

```ts
where: {
  name: {
    equals: 'Alice',
  },
}
```

---

## Logical Operators: AND, OR, NOT

### Users who are older than 25 **and** active

```ts
where: {
  AND: [
    { age: { gt: 25 } },
    { isActive: true }
  ]
}
```

### Users who are younger than 18 **or** older than 60

```ts
where: {
  OR: [
    { age: { lt: 18 } },
    { age: { gt: 60 } }
  ]
}
```

### Users who are **not** active and **not** named 'Bob'

```ts
where: {
  NOT: [
    { isActive: true },
    { name: 'Bob' }
  ]
}
```

You can also nest logical operators for very complex filtering logic.

---

## Filtering by Lists (`in`, `notIn`)

### Users aged 20, 30, or 40

```ts
where: {
  age: {
    in: [20, 30, 40],
  },
}
```

### Users not aged 18 or 25

```ts
where: {
  age: {
    notIn: [18, 25],
  },
}
```

---

## String Filters: `contains`, `startsWith`, `endsWith`, `mode`

### Users whose name contains "al"

```ts
where: {
  name: {
    contains: 'al',
  },
}
```

### Case-insensitive contains

```ts
where: {
  name: {
    contains: 'al',
    mode: 'insensitive',
  },
}
```

### Users whose name starts with "Jo"

```ts
where: {
  name: {
    startsWith: 'Jo',
  },
}
```

### Users whose email ends with "@gmail.com"

```ts
where: {
  email: {
    endsWith: '@gmail.com',
  },
}
```

---

## Boolean Filters

### All active users

```ts
where: {
  isActive: true,
}
```

### All inactive users

```ts
where: {
  isActive: false,
}
```

---

## Null Checks

Suppose your model has an optional field:

```prisma
bio String?
```

### Users with no bio

```ts
where: {
  bio: null,
}
```

### Users with a bio

```ts
where: {
  NOT: {
    bio: null,
  },
}
```

---

## Nested Filtering (Relations)

Suppose we have a `Post` model related to `User`:

```prisma
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}
```

### Find posts where the author's name is "Alice"

```ts
const posts = await prisma.post.findMany({
  where: {
    author: {
      name: 'Alice',
    },
  },
});
```

### Find users who have at least one post

```ts
const users = await prisma.user.findMany({
  where: {
    posts: {
      some: {}, // at least one post
    },
  },
});
```

### Users who have **no** posts

```ts
where: {
  posts: {
    none: {},
  },
}
```

### Users who have a post with title containing "Prisma"

```ts
where: {
  posts: {
    some: {
      title: {
        contains: 'Prisma',
      },
    },
  },
}
```

---

## Date Filtering

Suppose your `Post` model has a `createdAt` field.

### Posts created after January 1st, 2024

```ts
where: {
  createdAt: {
    gt: new Date('2024-01-01'),
  },
}
```

### Posts created in 2023

```ts
where: {
  createdAt: {
    gte: new Date('2023-01-01'),
    lt: new Date('2024-01-01'),
  },
}
```

---

## Filtering JSON Fields

If you have a JSON field (e.g., `preferences Json`), you can query deeply using path-based filtering.

Example (simplified support):

```prisma
model User {
  id          Int    @id @default(autoincrement())
  name        String
  preferences Json
}
```

### Users whose preferences include a dark mode setting

```ts
where: {
  preferences: {
    path: ['theme'],
    equals: 'dark',
  },
}
```

Note: JSON filtering capabilities may vary by database type.


# NextCommerce

A C2C Ecommerce site built with NextJS, Clerk, Prisma, Stripe and Tailwind. Please follow the instructinos to setup locally.

## Setup

Firstly, make a copy of `.env.example` and rename as `.env` and fill in the required secrets.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
CLERK_WEBHOOK_SECRET
DATABASE_URL
```

Secondly, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Clerk
Ensure, first name and last name is editable, and remove password pwned checker, or adjust code to meet with that requirement.

## Stripe
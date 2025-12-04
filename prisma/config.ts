import { defineConfig } from 'prisma'

export default defineConfig({
  adapter: process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
      }
    : undefined,
})


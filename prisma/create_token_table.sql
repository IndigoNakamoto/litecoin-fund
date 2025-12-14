-- Create the tokens table for TGB authentication (legacy parity).
-- NOTE:
-- - The live/legacy DB used by the old project stores tokens in a `tokens` table
--   with snake_case columns.
-- - If you're connecting `litecoin-fund` to the existing live DB, you should NOT
--   run this (the table already exists).
-- - This is only useful for local/dev databases where the legacy table is missing.

CREATE TABLE IF NOT EXISTS "tokens" (
    "id" SERIAL PRIMARY KEY,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "refreshed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add a comment to the table
COMMENT ON TABLE "tokens" IS 'Stores TGB API authentication tokens';






-- Users table (if using Supabase Auth, this is auto-created)
-- But we can extend it with custom fields

CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(15, 2) DEFAULT 0.00 NOT NULL,
  currency VARCHAR(3) DEFAULT 'NGN' NOT NULL,
  dva_account_number VARCHAR(255),
  dva_bank_name VARCHAR(255),
  dva_account_name VARCHAR(255),
  dva_reference VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('credit', 'debit')),
  amount DECIMAL(15, 2) NOT NULL,
  description TEXT,
  provider_reference VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to safely update wallet balance
CREATE OR REPLACE FUNCTION update_wallet_balance(
  wallet_id UUID,
  delta DECIMAL
) RETURNS void AS $$
BEGIN
  UPDATE wallets
  SET balance = balance + delta,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = wallet_id AND (balance + delta) >= 0;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Wallet not found or insufficient balance';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Indexes for performance
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX idx_transactions_created_at ON wallet_transactions(created_at);

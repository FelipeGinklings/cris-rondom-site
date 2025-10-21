/*
  # Create clients table for storing client information

  1. New Tables
    - `clients`
      - `id` (uuid, primary key) - Unique identifier for each client
      - `user_id` (uuid, foreign key) - References auth.users (the esthetician)
      - `name` (text, required) - Client's full name
      - `phone` (text) - Client's phone number
      - `email` (text) - Client's email address
      - `birth_date` (date) - Client's date of birth
      - `address` (text) - Client's address
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `clients` table
    - Add policy for users to view their own clients
    - Add policy for users to insert their own clients
    - Add policy for users to update their own clients
    - Add policy for users to delete their own clients
  
  3. Important Notes
    - Each esthetician can manage their own client list
    - All client data is private to the esthetician who created it
    - Default values provided for timestamps
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  phone text DEFAULT '',
  email text DEFAULT '',
  birth_date date,
  address text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries by user
CREATE INDEX IF NOT EXISTS clients_user_id_idx ON clients(user_id);
CREATE INDEX IF NOT EXISTS clients_name_idx ON clients(name);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own clients
CREATE POLICY "Users can view own clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own clients
CREATE POLICY "Users can insert own clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own clients
CREATE POLICY "Users can update own clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own clients
CREATE POLICY "Users can delete own clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

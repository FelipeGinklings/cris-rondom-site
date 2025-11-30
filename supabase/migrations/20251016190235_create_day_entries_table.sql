/*
  # Create day entries table for calendar application

  1. New Tables
    - `day_entries`
      - `id` (uuid, primary key) - Unique identifier for each entry
      - `user_id` (uuid, foreign key) - References auth.users
      - `date` (date, required) - The calendar date for this entry
      - `name` (text) - Client name
      - `phone` (text) - Client phone number
      - `notas` (text) - Notas/observações da entrada
      - `service` (text) - Service or appointment type
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
      - `client_id` (uuid, foreign key) - References clients table
      - `client_name` (text) - Client name for display
      - `procedure` (text) - Procedure/service name
      - `consultation_type` (text) - Type of consultation
      - `address` (text) - Consultation address
      - `start_time` (timestamptz) - Start time of consultation
      - `end_time` (timestamptz) - End time of consultation
  
  2. Security
    - Enable RLS on `day_entries` table
    - Add policy for users to view their own entries
    - Add policy for users to insert their own entries
    - Add policy for users to update their own entries
    - Add policy for users to delete their own entries
  
  3. Important Notes
    - Each user can have multiple entries per date
    - All entries are private to the user who created them
    - Default values provided for timestamps
    - Supports both journal entries (with mood) and consultations (with client info)
    - Consultations are identified by having a non-null client_id
*/

CREATE TABLE day_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,

=======
  title text DEFAULT '',
  description text DEFAULT '',
 -- mood text DEFAULT '',
>>>>>>> Stashed changes
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  -- Consultation fields
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  client_name text DEFAULT '',
  procedure text DEFAULT '',
  consultation_type text DEFAULT '',
  address text DEFAULT '',
  start_time timestamptz,
  end_time timestamptz
);

-- Create index for faster queries by user and date
CREATE INDEX IF NOT EXISTS day_entries_user_id_idx ON day_entries(user_id);
CREATE INDEX IF NOT EXISTS day_entries_date_idx ON day_entries(date);
CREATE INDEX IF NOT EXISTS day_entries_client_id_idx ON day_entries(client_id);
CREATE INDEX IF NOT EXISTS day_entries_user_client_idx ON day_entries(user_id, client_id);
CREATE INDEX IF NOT EXISTS day_entries_date_client_idx ON day_entries(date, client_id);

-- Enable Row Level Security
ALTER TABLE day_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own entries
CREATE POLICY "Users can view own entries"
  ON day_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own entries
CREATE POLICY "Users can insert own entries"
  ON day_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own entries
CREATE POLICY "Users can update own entries"
  ON day_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own entries
CREATE POLICY "Users can delete own entries"
  ON day_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
/*
  # Create anamnesis table for storing client health information

  1. New Tables
    - `anamnesis`
      - `id` (uuid, primary key) - Unique identifier for each anamnesis
      - `user_id` (uuid, foreign key) - References auth.users (the esthetician)
      - `client_id` (uuid, foreign key) - References clients table
      - `title` (text) - Title/name of the anamnesis
      - `description` (text) - Detailed anamnesis information
      - `chief_complaint` (text) - Main reason for visit/primary complaint
      - `medical_history` (text) - History of diseases and lesions
      - `current_medical_treatment` (text) - Current medical treatment if any
      - `previous_procedures` (text) - Previous experience with this procedure
      - `medications` (text) - Current medications being used
      - `recent_symptoms` (text) - Symptoms felt in recent days/months
      - `pain_location` (text) - Region where pain or discomfort is felt
      - `additional_observations` (text) - Additional notes or observations
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `anamnesis` table
    - Add policy for users to view their own anamnesis records
    - Add policy for users to insert their own anamnesis records
    - Add policy for users to update their own anamnesis records
    - Add policy for users to delete their own anamnesis records
  
  3. Important Notes
    - Each esthetician can manage anamnesis records for their clients
    - All anamnesis data is private to the esthetician who created it
    - Default values provided for timestamps
*/

CREATE TABLE IF NOT EXISTS anamnesis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  chief_complaint text DEFAULT '',
  medical_history text DEFAULT '',
  current_medical_treatment text DEFAULT '',
  previous_procedures text DEFAULT '',
  medications text DEFAULT '',
  recent_symptoms text DEFAULT '',
  pain_location text DEFAULT '',
  additional_observations text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries by user and client
CREATE INDEX IF NOT EXISTS anamnesis_user_id_idx ON anamnesis(user_id);
CREATE INDEX IF NOT EXISTS anamnesis_client_id_idx ON anamnesis(client_id);
CREATE INDEX IF NOT EXISTS anamnesis_user_client_idx ON anamnesis(user_id, client_id);

-- Enable Row Level Security
ALTER TABLE anamnesis ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own anamnesis records
CREATE POLICY "Users can view own anamnesis"
  ON anamnesis
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own anamnesis records
CREATE POLICY "Users can insert own anamnesis"
  ON anamnesis
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own anamnesis records
CREATE POLICY "Users can update own anamnesis"
  ON anamnesis
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own anamnesis records
CREATE POLICY "Users can delete own anamnesis"
  ON anamnesis
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

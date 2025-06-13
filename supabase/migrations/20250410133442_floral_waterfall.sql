/*
  # Fix recursive policies on user_roles table

  1. Changes
    - Drop existing policies on user_roles table that cause recursion
    - Create new non-recursive policies:
      - Users can always view their own role
      - Only superadmin can manage roles (using service role)
      
  2. Security
    - Maintains RLS protection
    - Prevents infinite recursion
    - Ensures users can only see their own role
    - Restricts role management to superadmin
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;

-- Create new non-recursive policies
CREATE POLICY "Users can view their own role"
ON user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Note: Role management should be handled through the service role
-- This prevents recursion while maintaining security
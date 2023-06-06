import { pgTable, serial, text, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'super-admin', 'user']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email'),
  role: userRoleEnum('role'),
  firebaseUid: text('firebase_uid'),
});
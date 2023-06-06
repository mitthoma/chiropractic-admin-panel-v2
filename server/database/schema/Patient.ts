import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const patients = pgTable('patients', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  lastUpdated: timestamp('last_updated').notNull(),
  email: varchar('email', { length: 256}).notNull(),
  phoneNumber: varchar('phone_number', { length: 256 }),
  nextAppointment: timestamp('next_appointment'),
  createdDate: timestamp('created_date').notNull(),
});
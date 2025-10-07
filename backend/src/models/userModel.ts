import { db } from "../db";
import { users } from "../../shared/schema";
import { eq } from "drizzle-orm";

export const userModel = {
  create: (data: { email: string; username: string; walletAddress: string }) =>
    db.insert(users).values(data).returning(),
  
  findAll: () => db.select().from(users),
  
  findById: (id: number) => db.select().from(users).where(eq(users.id, id)),
  
  update: (id: number, data: Partial<{ email: string; username: string; walletAddress: string }>) =>
    db.update(users).set(data).where(eq(users.id, id)).returning(),
  
  delete: (id: number) => db.delete(users).where(eq(users.id, id)),
};

import { db } from "../db";
import { investments } from "../../shared/schema";
import { eq } from "drizzle-orm";

export const investmentModel = {
  create: (data: any) => db.insert(investments).values(data).returning(),
  findAll: () => db.select().from(investments),
  findById: (id: number) => db.select().from(investments).where(eq(investments.id, id)),
  update: (id: number, data: any) => db.update(investments).set(data).where(eq(investments.id, id)).returning(),
  delete: (id: number) => db.delete(investments).where(eq(investments.id, id)),
};

import { db } from "../db";
import { portfolios } from "../../shared/schema";
import { eq } from "drizzle-orm";

export const portfolioModel = {
  create: (data: any) => db.insert(portfolios).values(data).returning(),
  findAll: () => db.select().from(portfolios),
  findById: (id: number) => db.select().from(portfolios).where(eq(portfolios.id, id)),
  update: (id: number, data: any) => db.update(portfolios).set(data).where(eq(portfolios.id, id)).returning(),
  delete: (id: number) => db.delete(portfolios).where(eq(portfolios.id, id)),
};

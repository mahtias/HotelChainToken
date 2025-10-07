import { db } from "../db";
import { hotels } from "../../shared/schema";
import { eq } from "drizzle-orm";

export const hotelModel = {
  create: (data: any) => db.insert(hotels).values(data).returning(),
  findAll: () => db.select().from(hotels),
  findById: (id: number) => db.select().from(hotels).where(eq(hotels.id, id)),
  update: (id: number, data: any) => db.update(hotels).set(data).where(eq(hotels.id, id)).returning(),
  delete: (id: number) => db.delete(hotels).where(eq(hotels.id, id)),
};

import { Request, Response } from "express";
import { hotelModel } from "../models/hotelModel";

export const hotelController = {
  create: async (req: Request, res: Response) => {
    try {
      const [hotel] = await hotelModel.create(req.body);
      res.status(201).json(hotel);
    } catch (err) { res.status(400).json({ message: String(err) }); }
  },
  findAll: async (_req: Request, res: Response) => {
    const hotels = await hotelModel.findAll();
    res.json(hotels);
  },
  findById: async (req: Request, res: Response) => {
    const [hotel] = await hotelModel.findById(Number(req.params.id));
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  },
  update: async (req: Request, res: Response) => {
    try {
      const [hotel] = await hotelModel.update(Number(req.params.id), req.body);
      res.json(hotel);
    }
    catch (err) { res.status(400).json({ message: String(err) }); }
  },
  delete: async (req: Request, res: Response) => {
    await hotelModel.delete(Number(req.params.id));
    res.json({ message: "Hotel deleted" });
  }
};
import { Request, Response } from "express";
import { investmentModel } from "../models/investmentModel";

export const investmentController = {
  create: async (req: Request, res: Response) => {
    try {
      const [investment] = await investmentModel.create(req.body);
      res.status(201).json(investment);
    } catch (err) { res.status(400).json({ message: String(err) }); }
  },
  findAll: async (_req: Request, res: Response) => {
    const investments = await investmentModel.findAll();
    res.json(investments);
  },
  findById: async (req: Request, res: Response) => {
    const [investment] = await investmentModel.findById(Number(req.params.id));
    if (!investment) return res.status(404).json({ message: "Investment not found" });
    res.json(investment);
  },
  update: async (req: Request, res: Response) => {
    try {
      const [investment] = await investmentModel.update(Number(req.params.id), req.body);
      res.json(investment);
    }
    catch (err) { res.status(400).json({ message: String(err) }); }
  },
  delete: async (req: Request, res: Response) => {
    await investmentModel.delete(Number(req.params.id));
    res.json({ message: "Investment deleted" });
  }
};
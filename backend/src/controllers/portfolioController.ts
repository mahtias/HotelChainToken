import { Request, Response } from "express";
import { portfolioModel } from "../models/portfolioModel";

export const portfolioController = {
  create: async (req: Request, res: Response) => {
    try {
      const [portfolio] = await portfolioModel.create(req.body);
      res.status(201).json(portfolio);
    } catch (err) { res.status(400).json({ message: String(err) }); }
  },
  findAll: async (_req: Request, res: Response) => {
    const portfolios = await portfolioModel.findAll();
    res.json(portfolios);
  },
  findById: async (req: Request, res: Response) => {
    const [portfolio] = await portfolioModel.findById(Number(req.params.id));
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json(portfolio);
  },
  update: async (req: Request, res: Response) => {
    try {
      const [portfolio] = await portfolioModel.update(Number(req.params.id), req.body);
      res.json(portfolio);
    }
    catch (err) { res.status(400).json({ message: String(err) }); }
  },
  delete: async (req: Request, res: Response) => {
    await portfolioModel.delete(Number(req.params.id));
    res.json({ message: "Portfolio deleted" });
  }
};
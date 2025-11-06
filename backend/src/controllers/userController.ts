import { Request, Response } from "express";
import { userModel } from "../models/userModel";

export const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const [user] = await userModel.create(req.body);
      res.status(201).json(user);
    } catch (err) { res.status(400).json({ message: String(err) }); }
  },
  findAll: async (_req: Request, res: Response) => {
    const users = await userModel.findAll();
    res.json(users);
  },
  findById: async (req: Request, res: Response) => {
    const [user] = await userModel.findById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  },
  update: async (req: Request, res: Response) => {
    try {
      const [user] = await userModel.update(Number(req.params.id), req.body);
      res.json(user);
    } catch (err) { res.status(400).json({ message: String(err) }); }
  },
  delete: async (req: Request, res: Response) => {
    await userModel.delete(Number(req.params.id));
    res.json({ message: "User deleted" });
  }
};

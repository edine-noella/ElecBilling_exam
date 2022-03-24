import prisma from "../client";
import { Request, Response } from "express";
import { generateToken, getDays } from "../utils/index";
import { Token } from "@prisma/client";

export async function getAllTokens(_req: Request, res: Response) {
  const tokens = await prisma.token.findMany();
  return res.json(tokens);
}

export async function getTokenById(req: Request, res: Response) {
  const id = req.params;

  if (!id) {
    return res.status(401).json({
      message: "Id should be provided",
    });
  }

  const token = await prisma.token.findFirst({ where: { id } });

  if (!token) {
    return res.status(404).json({
      message: "No token found with this id ",
    });
  }
}

export async function createToken(req: Request, res: Response) {
  let { meter, amount } = req.body;

  amount = parseInt(amount);

  if (!meter || !amount) {
    return res.status(401).json({
      message: "All fields are required",
    });
  }

  if (meter.length != 6) {
    return res.status(401).json({
      message: "Invalid meter, only 6 digits accepted",
    });
  }

  if (
    amount.length > 6 ||
    !(parseInt(amount) < 182500) ||
    !(amount % 100 == 0)
  ) {
    return res.status(401).json({
      message:
        "Invalid amount, only multiples of 100 not greater than 182,500 is accepted",
    });
  }

  const token = await prisma.token.create({
    data: {
      meter,
      token: generateToken(),
      amount,
      status: true,
      expiresAt: getDays(amount),
    },
  });

  return res.status(201).json(token);
}

export async function getByMeter(req: Request, res: Response) {
  const { meterId } = req.params;

  if (!meterId) {
    return res.status(401).json({
      message: "Meter should be provided",
    });
  }

  const tokens = await prisma.token.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  if (!tokens) {
    return res.status(404).send("No token found with this meter ");
  }

  const meter = tokens.find((item) => item.meter === meterId);

  if(!meter) {
    return res.status(404).send("No token found with this meter ");
  }

  return res.status(200).send(meter);
}

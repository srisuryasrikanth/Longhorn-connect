import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { StarAwardResult } from "@/lib/types";

export class DuplicateStarError extends Error {
  constructor() {
    super("This browser already starred the alumni profile.");
    this.name = "DuplicateStarError";
  }
}

export interface StarGateway {
  getAlumni(alumniId: string): Promise<{ starCount: number } | null>;
  createAndIncrement(alumniId: string, clientId: string): Promise<number>;
  getCurrentStarCount(alumniId: string): Promise<number>;
}

export async function applyStarAward(
  gateway: StarGateway,
  alumniId: string,
  clientId: string
): Promise<StarAwardResult> {
  const alumni = await gateway.getAlumni(alumniId);

  if (!alumni) {
    return { status: "not_found" };
  }

  try {
    const starCount = await gateway.createAndIncrement(alumniId, clientId);
    return { status: "awarded", starCount };
  } catch (error) {
    if (error instanceof DuplicateStarError) {
      const starCount = await gateway.getCurrentStarCount(alumniId);
      return { status: "duplicate", starCount };
    }

    throw error;
  }
}

function isDuplicateStarError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

const prismaGateway: StarGateway = {
  async getAlumni(alumniId) {
    return prisma.alumni.findUnique({
      where: { id: alumniId },
      select: { starCount: true }
    });
  },
  async createAndIncrement(alumniId, clientId) {
    try {
      const updated = await prisma.$transaction(async (transaction) => {
        await transaction.starAward.create({
          data: {
            alumniId,
            clientId
          }
        });

        return transaction.alumni.update({
          where: { id: alumniId },
          data: {
            starCount: {
              increment: 1
            }
          },
          select: {
            starCount: true
          }
        });
      });

      return updated.starCount;
    } catch (error) {
      if (isDuplicateStarError(error)) {
        throw new DuplicateStarError();
      }

      throw error;
    }
  },
  async getCurrentStarCount(alumniId) {
    const record = await prisma.alumni.findUnique({
      where: { id: alumniId },
      select: { starCount: true }
    });

    return record?.starCount ?? 0;
  }
};

export async function awardStar(alumniId: string, clientId: string): Promise<StarAwardResult> {
  if (!clientId.trim()) {
    throw new Error("clientId is required");
  }

  return applyStarAward(prismaGateway, alumniId, clientId.trim());
}


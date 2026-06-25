import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      ok: true,
      service: "business-frontpage-lead-capture",
      database: "reachable",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        service: "business-frontpage-lead-capture",
        database: "unreachable",
      },
      { status: 503 },
    );
  }
}

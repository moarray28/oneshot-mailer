import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const campaign = await prisma.campaign.create({
    data: {
      name: body.name,
      subject: body.subject,
      body: body.body,
      status: "DRAFT",
    },
  });

  return NextResponse.json(campaign);
}
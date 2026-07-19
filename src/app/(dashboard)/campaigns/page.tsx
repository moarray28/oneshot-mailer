import Link from "next/link";
import { CalendarDays, Mail, Plus, Circle } from "lucide-react";

import { prisma } from "@/lib/prisma";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      className="
      min-h-screen
      bg-[#FAFBF8]
      "
    >
      <div className="mx-auto max-w-7xl px-10 py-12">

        <div className="mb-12 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-800">
              Campaigns
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              Manage all your email campaigns.
            </p>
          </div>

          <Link href="/campaigns/new">
            <Button
              className="
              h-12
              rounded-2xl
              bg-[#7C8F5B]
              px-6
              text-white
              shadow-sm
              hover:bg-[#6D8150]
              "
            >
              <Plus className="mr-2 h-5 w-5" />
              New Campaign
            </Button>
          </Link>

        </div>

        {campaigns.length === 0 ? (
          <Card className="rounded-3xl border border-[#E7ECE4] bg-white shadow-sm">
            <CardContent className="py-20 text-center">

              <Mail
                className="mx-auto mb-6 h-12 w-12 text-[#7C8F5B]"
              />

              <h2 className="mb-3 text-2xl font-semibold">
                No Campaigns Yet
              </h2>

              <p className="mb-8 text-slate-500">
                Create your first campaign.
              </p>

              <Link href="/campaigns/new">
                <Button
                  className="
                  rounded-xl
                  bg-[#7C8F5B]
                  hover:bg-[#6D8150]
                  "
                >
                  Create Campaign
                </Button>
              </Link>

            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.id}`}
              >
                <Card
                  className="
                  rounded-3xl
                  border
                  border-[#E7ECE4]
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  "
                >
                  <CardHeader>

                    <div className="mb-6 flex items-center justify-between">

                      <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#F3F6EF]
                        "
                      >
                        <Mail className="h-6 w-6 text-[#7C8F5B]" />
                      </div>

                    </div>

                    <h2 className="text-2xl font-semibold text-slate-800">
                      {campaign.name}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      {campaign.subject}
                    </p>

                  </CardHeader>

                  <CardContent>

                    <hr className="mb-6 border-[#ECEFE9]" />

                    <div className="mb-5 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <Circle
                          className="h-2 w-2 fill-[#A4B48A] text-[#A4B48A]"
                        />

                        <span className="text-slate-600">
                          Status
                        </span>

                      </div>

                      <span
                        className="
                        rounded-full
                        bg-[#F2F5EE]
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-[#7C8F5B]
                        "
                      >
                        {campaign.status}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          className="h-4 w-4 text-slate-400"
                        />

                        <span className="text-slate-600">
                          Created
                        </span>

                      </div>

                      <span className="font-medium text-slate-700">
                        {campaign.createdAt.toLocaleDateString()}
                      </span>

                    </div>

                  </CardContent>
                </Card>
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
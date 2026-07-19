import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      recipients: true,
    },
  });

  const totalCampaigns = campaigns.length;

  const totalRecipients = campaigns.reduce(
    (acc, campaign) => acc + campaign.recipients.length,
    0
  );

  const totalSent = campaigns.reduce(
    (acc, campaign) =>
      acc +
      campaign.recipients.filter(
        (recipient) => recipient.status === "SENT"
      ).length,
    0
  );

  const totalFailed = campaigns.reduce(
    (acc, campaign) =>
      acc +
      campaign.recipients.filter(
        (recipient) => recipient.status === "FAILED"
      ).length,
    0
  );

  return (
    <main className="min-h-screen px-8 py-12">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              OneShot Mailer
            </h1>

            <p className="mt-3 max-w-xl text-lg text-slate-500">
              Build, manage and send personalized hiring campaigns
              with complete delivery tracking.
            </p>
          </div>

          <Link href="/campaigns/new">
            <Button className="h-12 rounded-xl px-7">
              + New Campaign
            </Button>
          </Link>

        </div>

        {/* Stats */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Card className="rounded-3xl border-0 shadow-md shadow-slate-200/40">
            <CardHeader>
              <CardTitle className="text-slate-500">
                Campaigns
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-5xl font-bold">
                {totalCampaigns}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md shadow-slate-200/40">
            <CardHeader>
              <CardTitle className="text-slate-500">
                Recipients
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-5xl font-bold">
                {totalRecipients}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md shadow-slate-200/40">
            <CardHeader>
              <CardTitle className="text-slate-500">
                Emails Sent
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-5xl font-bold">
                {totalSent}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md shadow-slate-200/40">
            <CardHeader>
              <CardTitle className="text-slate-500">
                Failed
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-5xl font-bold">
                {totalFailed}
              </p>
            </CardContent>
          </Card>

        </section>

        {/* Recent Campaigns */}

        <Card className="rounded-3xl border-0 shadow-md shadow-slate-200/40">

          <CardHeader className="flex flex-row items-center justify-between">

            <div>
              <CardTitle className="text-2xl">
                Recent Campaigns
              </CardTitle>

              <p className="mt-2 text-slate-500">
                Continue where you left off.
              </p>
            </div>

            <Link href="/campaigns">
              <Button variant="outline">
                View All
              </Button>
            </Link>

          </CardHeader>

          <CardContent>

            {campaigns.length === 0 ? (
              <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">

                  <p className="text-lg font-medium">
                    No Campaigns Yet
                  </p>

                  <p className="mt-2 text-slate-500">
                    Create your first campaign to start sending emails.
                  </p>

                  <Link href="/campaigns/new">
                    <Button className="mt-6">
                      Create Campaign
                    </Button>
                  </Link>

                </div>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {campaigns.slice(0, 6).map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/campaigns/${campaign.id}`}
                  >
                    <Card className="rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">

                      <CardHeader>

                        <CardTitle className="line-clamp-1">
                          {campaign.name}
                        </CardTitle>

                      </CardHeader>

                      <CardContent className="space-y-4">

                        <p className="line-clamp-2 text-sm text-slate-500">
                          {campaign.subject}
                        </p>

                        <div className="flex items-center justify-between text-sm">

                          <span className="text-slate-500">
                            Status
                          </span>

                          <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-primary">
                            {campaign.status}
                          </span>

                        </div>

                        <div className="flex justify-between text-sm">

                          <span className="text-slate-500">
                            Created
                          </span>

                          <span>
                            {campaign.createdAt.toLocaleDateString()}
                          </span>

                        </div>

                      </CardContent>

                    </Card>
                  </Link>
                ))}

              </div>
            )}

          </CardContent>

        </Card>

      </div>
    </main>
  );
}
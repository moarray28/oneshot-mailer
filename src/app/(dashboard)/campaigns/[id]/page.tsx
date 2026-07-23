import Link from "next/link";
import type { Recipient } from "@prisma/client";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Users,
  Send,
  MessageCircle,
  Calendar,
  FileText,
  Upload,
} from "lucide-react";

import { prisma } from "@/lib/prisma";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CampaignDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      recipients: true,
    },
  });

  if (!campaign) {
    notFound();
  }

 const sent = campaign.recipients.filter(
  (r: Recipient) => r.status === "SENT"
).length;

const failed = campaign.recipients.filter(
  (r: Recipient) => r.status === "FAILED"
).length;

const replied = campaign.recipients.filter(
  (r: Recipient) => r.status === "REPLIED"
).length;

  return (
    <main className="min-h-screen bg-[var(--background)]">

      <div className="mx-auto max-w-7xl px-8 py-14">

        {/* Header */}

        <div className="mb-10 flex items-start justify-between">

          <div>

            <Link href="/campaigns">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              {campaign.name}
            </h1>

            <p className="mt-3 text-lg text-[var(--muted-foreground)]">
              {campaign.subject}
            </p>

          </div>

          <div>

            <span
              className="
              rounded-full
              bg-[var(--secondary)]
              px-5
              py-2
              text-sm
              font-semibold
              text-[var(--primary)]
            "
            >
              {campaign.status}
            </span>

          </div>

        </div>

        {/* Stats */}

        <div className="mb-8 grid gap-6 md:grid-cols-4">

          <Card className="rounded-[28px] border-0 shadow-lg">
            <CardContent className="p-6">

              <Users className="mb-5 text-[var(--primary)]" />

              <p className="text-sm text-[var(--muted-foreground)]">
                Recipients
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {campaign.recipients.length}
              </h2>

            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-0 shadow-lg">
            <CardContent className="p-6">

              <Send className="mb-5 text-[var(--primary)]" />

              <p className="text-sm text-[var(--muted-foreground)]">
                Sent
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {sent}
              </h2>

            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-0 shadow-lg">
            <CardContent className="p-6">

              <Mail className="mb-5 text-[var(--primary)]" />

              <p className="text-sm text-[var(--muted-foreground)]">
                Failed
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {failed}
              </h2>

            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-0 shadow-lg">
            <CardContent className="p-6">

              <MessageCircle className="mb-5 text-[var(--primary)]" />

              <p className="text-sm text-[var(--muted-foreground)]">
                Replies
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {replied}
              </h2>

            </CardContent>
          </Card>

        </div>

        {/* Information */}

        <div className="grid gap-8 lg:grid-cols-2">

          <Card className="rounded-[28px] border-0 shadow-lg">

            <CardContent className="space-y-8 p-8">

              <h2 className="text-2xl font-semibold">
                Campaign Information
              </h2>

              <div>

                <p className="text-sm text-[var(--muted-foreground)]">
                  Subject
                </p>

                <p className="mt-2 text-lg font-medium">
                  {campaign.subject}
                </p>

              </div>

              <div>

                <p className="text-sm text-[var(--muted-foreground)]">
                  Created
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <Calendar size={18} />

                  {campaign.createdAt.toLocaleString()}

                </div>

              </div>

            </CardContent>

          </Card>

          <Card className="rounded-[28px] border-0 shadow-lg">

            <CardContent className="space-y-6 p-8">

              <h2 className="text-2xl font-semibold">
                Quick Actions
              </h2>

              <Button className="w-full" disabled>
                <Send className="mr-2 h-4 w-4" />
                Send Emails
              </Button>

              <Button
                variant="outline"
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>

              <Button
                variant="outline"
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>

            </CardContent>

          </Card>

        </div>

        {/* Email Preview */}

        <Card className="mt-8 rounded-[28px] border-0 shadow-lg">

          <CardContent className="p-8">

            <h2 className="mb-6 text-2xl font-semibold">
              Email Preview
            </h2>

            <div
              className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--secondary)]
                p-8
                whitespace-pre-wrap
                leading-8
              "
            >
              {campaign.body}
            </div>

          </CardContent>

        </Card>

      </div>

    </main>
  );
}
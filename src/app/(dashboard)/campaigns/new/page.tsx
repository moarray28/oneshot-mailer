"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewCampaignPage() {
  const router = useRouter();

  const [campaign, setCampaign] = useState({
    name: "",
    subject: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCampaign((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      router.push(`/campaigns/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Unable to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-8 py-14">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Create Campaign
            </h1>

            <p className="mt-3 text-lg text-[var(--muted-foreground)]">
              Create an email campaign that will later be sent to your recipients.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/campaigns")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

        </div>

        <Card
          className="
            rounded-[28px]
            border
            border-[var(--border)]
            bg-white/85
            shadow-xl
            backdrop-blur-md
          "
        >
          <CardContent className="space-y-8 p-10">

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Campaign Name
              </label>

              <Input
                name="name"
                value={campaign.name}
                onChange={handleChange}
                placeholder="July Hiring Campaign"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Email Subject
              </label>

              <Input
                name="subject"
                value={campaign.subject}
                onChange={handleChange}
                placeholder="Application for Software Engineer Position"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Email Body
              </label>

              <Textarea
                name="body"
                value={campaign.body}
                onChange={handleChange}
                rows={14}
                placeholder="Write your email..."
                className="rounded-xl resize-none"
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">

              <Button
                variant="outline"
                onClick={() => router.push("/campaigns")}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8"
              >
                <Save className="mr-2 h-4 w-4" />

                {loading
                  ? "Saving..."
                  : "Save Campaign"}
              </Button>

            </div>

          </CardContent>
        </Card>      </div>
    </main>
  );
}
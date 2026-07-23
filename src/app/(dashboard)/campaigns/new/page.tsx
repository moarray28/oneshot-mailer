"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewCampaignPage() {
  const router = useRouter();

  const [campaign, setCampaign] = useState({
    name: "",
    subject: "",
    body: `Dear Hiring Team,

I hope you're doing well.

I am writing to express my interest in the Software Engineer position.

I believe my skills and experience align well with your requirements.

Thank you for your time and consideration.

Regards,
Ritesh More`,
  });

  const [loading, setLoading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [personalization, setPersonalization] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

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
        throw new Error("Unable to create campaign.");
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

        {/* Header */}

        <div className="mb-10 flex items-start justify-between">

          <div>

            <h1 className="text-5xl font-bold tracking-tight">
              Create Campaign
            </h1>

            <p className="mt-3 text-lg text-[var(--muted-foreground)]">
              Create and save a reusable cold email template.
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
            bg-white/90
            shadow-xl
            backdrop-blur-md
          "
        >
          <CardContent className="space-y-10 p-10">

            {/* Campaign Name */}

            <div className="space-y-3">

              <label className="text-sm font-semibold">
                Campaign Name
              </label>

              <Input
                name="name"
                value={campaign.name}
                onChange={handleChange}
                placeholder="July SDE Applications"
                className="h-12 rounded-xl"
              />

            </div>

            {/* Subject */}

            <div className="space-y-3">

              <label className="text-sm font-semibold">
                Subject
              </label>

              <Input
                name="subject"
                value={campaign.subject}
                onChange={handleChange}
                placeholder="Application for Software Engineer Position"
                className="h-12 rounded-xl"
              />

            </div>

            {/* Email Composer */}

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                  Email Composer
                </h2>

                <span className="text-sm text-[var(--muted-foreground)]">
                  {campaign.body.length.toLocaleString()} characters
                </span>

              </div>

              <Textarea
                name="body"
                value={campaign.body}
                onChange={handleChange}
                rows={14}
                className="resize-none rounded-xl"
              />

            </div>

            {/* Live Preview */}

<div className="border-t border-[var(--border)] pt-8">

  <button
    type="button"
    onClick={() => setPreviewOpen(!previewOpen)}
    className="flex w-full items-center justify-between"
  >

    <h2 className="text-xl font-semibold">
      Live Preview
    </h2>

    {previewOpen ? (
      <ChevronUp />
    ) : (
      <ChevronDown />
    )}

  </button>


  {previewOpen && (

    <div className="mt-6">

      <div
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--secondary)]
          p-8
          whitespace-pre-wrap
          leading-8
          min-h-[220px]
        "
      >

        {campaign.body ? (
          campaign.body
        ) : (
          <span className="text-[var(--muted-foreground)]">
            Your email preview will appear here...
          </span>
        )}

      </div>

    </div>

  )}

</div>
            {/* Advanced */}

            <div className="border-t border-[var(--border)] pt-8">

              <button
                type="button"
                onClick={() =>
                  setAdvancedOpen(!advancedOpen)
                }
                className="flex w-full items-center justify-between"
              >

                <h2 className="text-xl font-semibold">
                  Advanced Options
                </h2>

                {advancedOpen ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}

              </button>

              {advancedOpen && (

                <div className="mt-6 space-y-6">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={personalization}
                      onChange={(e) =>
                        setPersonalization(e.target.checked)
                      }
                    />

                    <span className="font-medium">
                      Enable Personalization
                    </span>

                  </label>

                  {personalization && (

                    <div className="rounded-2xl bg-[var(--secondary)] p-6">

                      <p className="mb-4 text-sm text-[var(--muted-foreground)]">
                        Click a variable to copy it.
                      </p>

                      <div className="flex flex-wrap gap-3">

                        {[
                          "{{name}}",
                          "{{company}}",
                          "{{email}}",
                        ].map((variable) => (

                          <button
                            key={variable}
                            type="button"
                            onClick={() =>
                              navigator.clipboard.writeText(variable)
                            }
                            className="
                              rounded-full
                              border
                              bg-white
                              px-4
                              py-2
                              text-sm
                              transition-all
                              hover:border-[var(--primary)]
                              hover:text-[var(--primary)]
                            "
                          >
                            {variable}
                          </button>

                        ))}

                      </div>

                    </div>

                  )}

                </div>

              )}

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-4">

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
        </Card>

      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  User,
  Key,
  Save,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [testEmail, setTestEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  async function saveConfiguration() {
    setSaving(true);

    await new Promise((r) => setTimeout(r, 700));

    alert("Configuration saved.");

    setSaving(false);
  }

  async function sendTestMail() {
    if (!testEmail) {
      alert("Enter recipient email.");
      return;
    }

    try {
      setSending(true);

      const response = await fetch("/api/settings/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: testEmail,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      alert("Test email sent.");
    } catch {
      alert("Unable to send test email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-14">

      <div className="mx-auto w-full max-w-6xl px-6">

        <div className="mb-10">

          <h1 className="!text-5xl !font-bold tracking-tight">
            Mail Settings
          </h1>

          <p className="mt-3 !text-base text-[var(--muted-foreground)]">
            Configure your Gmail account used for sending automated cold emails.
          </p>

        </div>

        <div className="grid gap-8">

          {/* SMTP */}

          <Card className="rounded-[28px] border border-[var(--border)] bg-white shadow-lg">

            <CardContent className="p-8">

              <div className="mb-8 flex items-center gap-5">

                <div className="rounded-2xl bg-[var(--secondary)] p-4">
                  <Mail
                    size={28}
                    className="text-[var(--primary)]"
                  />
                </div>

                <div>

                  <h2 className="!text-2xl font-semibold">
                    SMTP Configuration
                  </h2>

                  <p className="mt-1 !text-sm text-[var(--muted-foreground)]">
                    Gmail account and App Password used for sending emails.
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Sender Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      className="h-12 pl-11"
                      placeholder="Ritesh More"
                      value={senderName}
                      onChange={(e) =>
                        setSenderName(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Gmail Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      className="h-12 pl-11"
                      placeholder="example@gmail.com"
                      value={senderEmail}
                      onChange={(e) =>
                        setSenderEmail(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Gmail App Password
                  </label>

                  <div className="relative">

                    <Key
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                      type="password"
                      className="h-12 pl-11"
                      placeholder="****************"
                      value={appPassword}
                      onChange={(e) =>
                        setAppPassword(e.target.value)
                      }
                    />

                  </div>

                  <p className="mt-2 !text-sm text-[var(--muted-foreground)]">
                    Enter your 16-character Gmail App Password.
                  </p>

                </div>

                <Button
                  className="h-11 px-8"
                  onClick={saveConfiguration}
                  disabled={saving}
                >
                  <Save className="mr-2 h-4 w-4" />

                  {saving
                    ? "Saving..."
                    : "Save Configuration"}
                </Button>

              </div>

            </CardContent>

          </Card>

          {/* TEST EMAIL */}

          <Card className="rounded-[28px] border border-[var(--border)] bg-white shadow-lg">

            <CardContent className="p-8">

              <div className="mb-8 flex items-center gap-5">

                <div className="rounded-2xl bg-[var(--secondary)] p-4">
                  <Send
                    size={28}
                    className="text-[var(--primary)]"
                  />
                </div>

                <div>

                  <h2 className="!text-2xl font-semibold">
                    Send Test Email
                  </h2>

                  <p className="mt-1 !text-sm text-[var(--muted-foreground)]">
                    Verify your SMTP configuration before sending campaigns.
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Recipient Email
                  </label>

                  <Input
                    className="h-12"
                    placeholder="recipient@gmail.com"
                    value={testEmail}
                    onChange={(e) =>
                      setTestEmail(e.target.value)
                    }
                  />

                </div>

                <Button
                  className="h-11 px-8"
                  onClick={sendTestMail}
                  disabled={sending}
                >
                  <Send className="mr-2 h-4 w-4" />

                  {sending
                    ? "Sending..."
                    : "Send Test Email"}
                </Button>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>

    </main>
  );
}
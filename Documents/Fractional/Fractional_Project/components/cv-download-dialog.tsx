"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, CheckCircle2 } from "lucide-react";

interface CVDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CVDownloadDialog({ open, onOpenChange }: CVDownloadDialogProps) {
  const [email, setEmail] = useState("");
  const [intentions, setIntentions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cv-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          intentions,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit information");
      }

      setSuccess(true);
      setEmail("");
      setIntentions("");

      // Close dialog after 2 seconds
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download CV
          </DialogTitle>
          <DialogDescription className="text-left">
            Share your email and I&apos;ll send you a link to download my CV. A short message is optional.
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">CV Link Sent!</h3>
            <p className="text-sm text-muted-foreground">
              Thanks! A link to download my CV has been emailed to you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="intentions">Message</Label>
                <Textarea
                  id="intentions"
                  placeholder="A few lines on your challenge and where you'd like help… (optional)"
                  value={intentions}
                  onChange={(e) => setIntentions(e.target.value)}
                  disabled={isSubmitting}
                  rows={4}
                  className="placeholder:text-muted-foreground/50"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

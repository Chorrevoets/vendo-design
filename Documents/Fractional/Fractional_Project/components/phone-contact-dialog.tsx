"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Send } from "lucide-react";

interface PhoneContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PHONE_NUMBER = "+61 450 609 904";

export function PhoneContactDialog({ open, onOpenChange }: PhoneContactDialogProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [intentions, setIntentions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/phone-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          intentions,
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit information");
      }

      // Show phone number screen
      setShowPhoneNumber(true);
      setEmail("");
      setPhone("");
      setIntentions("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state when closing
    setTimeout(() => {
      setShowPhoneNumber(false);
      setEmail("");
      setPhone("");
      setIntentions("");
      setError("");
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {showPhoneNumber ? (
          <>
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Number
              </DialogTitle>
              <DialogDescription className="text-left">
                Here's my contact number. Feel free to call or send a message.
              </DialogDescription>
            </DialogHeader>
            <div className="py-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-6">
                <Phone className="h-8 w-8 text-accent" />
              </div>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="text-3xl font-semibold text-foreground hover:text-accent transition-colors block mb-4"
              >
                {PHONE_NUMBER}
              </a>
              <p className="text-sm text-muted-foreground mb-6">
                Tap the number to call directly
              </p>
              <p className="text-sm text-muted-foreground">
                Or{" "}
                <a
                  href="/coen-horrevoets.vcf"
                  download
                  className="text-accent hover:underline font-medium"
                >
                  download contact details as vCard
                </a>
                .
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Request Contact Number
              </DialogTitle>
              <DialogDescription className="text-left">
                Please share your email to view my contact number. Phone number and note are optional.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone-email">Email *</Label>
                  <Input
                    id="phone-email"
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
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="+61 400 000 000 (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className="placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-intentions">Note</Label>
                  <Textarea
                    id="phone-intentions"
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
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Get Number
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

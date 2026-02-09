"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KOALENDAR_URL = "https://koalendar.com/e/meet-with-coen-horrevoets";

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book a Short Intro Call
          </DialogTitle>
          <DialogDescription className="text-left">
            Select a time that works for you from my availability below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden min-h-[600px]">
          <iframe
            src={KOALENDAR_URL}
            className="w-full h-full border-0 rounded-md"
            title="Book a meeting with Coen Horrevoets"
            allow="camera; microphone; geolocation"
            style={{ minHeight: "600px" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

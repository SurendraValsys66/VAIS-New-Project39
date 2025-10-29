import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface UnlockIntentSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlockCurrent: () => void;
  onUnlockAll: () => void;
}

export default function UnlockIntentSignalModal({
  open,
  onOpenChange,
  onUnlockCurrent,
  onUnlockAll,
}: UnlockIntentSignalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-50 rounded-full">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl">Unlock Intent Signal</DialogTitle>
          <DialogDescription className="text-base text-gray-600 mt-2">
            If you want to unlock the intent signal each deduct one credit.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-6">
          <Button
            onClick={() => {
              onUnlockCurrent();
              onOpenChange(false);
            }}
            variant="default"
            className="w-full bg-primary hover:bg-primary/90"
          >
            Unlock Current
          </Button>
          <Button
            onClick={() => {
              onUnlockAll();
              onOpenChange(false);
            }}
            variant="outline"
            className="w-full"
          >
            Unlock All
          </Button>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
          <p>
            Unlocking allows you to view the full intent signal details for
            selected companies.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

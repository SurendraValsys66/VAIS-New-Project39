import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MasteryChecklist from "@/components/layout/MasteryChecklist";
import { Button } from "@/components/ui/button";

export default function MasteryGuide() {
  const [open, setOpen] = useState(true);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-valasys-gray-900 mb-2">
          VAIS Mastery Guide
        </h1>
        <p className="text-valasys-gray-600 mb-4">
          Follow these steps to complete your VAIS mastery. You can reopen the
          guide anytime.
        </p>
        <Button variant="default" onClick={() => setOpen(true)}>
          Open Mastery Guide
        </Button>
      </div>
      <MasteryChecklist open={open} onOpenChange={setOpen} />
    </DashboardLayout>
  );
}

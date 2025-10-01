import DashboardLayout from "@/components/layout/DashboardLayout";
import BuildVAISForm from "@/components/forms/BuildVAISForm";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTour } from "@/contexts/TourContext";

export default function BuildVAIS() {
  const { startTour } = useTour();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Build VAIS</h1>
        <Button
          variant="secondary"
          size="sm"
          onClick={startTour}
          title="Start Tour"
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" /> Start Tour
        </Button>
      </div>
      <BuildVAISForm />
    </DashboardLayout>
  );
}

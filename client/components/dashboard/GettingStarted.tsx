import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Upload, Plug, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTour } from "@/contexts/TourContext";

interface GettingStartedProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function GettingStarted({
  open,
  onOpenChange,
}: GettingStartedProps) {
  const navigate = useNavigate();
  const { startTour } = useTour();
  const [internalOpen, setInternalOpen] = useState<boolean>(!!open);

  useEffect(() => {
    if (open !== undefined) setInternalOpen(open);
  }, [open]);

  const setSeen = () =>
    localStorage.setItem("valasys-getting-started-seen", "true");

  const handleClose = (persistSeen: boolean) => {
    if (persistSeen) setSeen();
    if (onOpenChange) onOpenChange(false);
    setInternalOpen(false);
  };

  const handleStartTour = () => {
    setSeen();
    setInternalOpen(false);
    startTour();
  };

  return (
    <Dialog
      open={internalOpen}
      onOpenChange={(v) => {
        setInternalOpen(v);
        if (onOpenChange) onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Sparkles className="h-5 w-5" />
            </span>
            Getting Started
          </DialogTitle>
          <DialogDescription>
            Welcome! It looks like you don’t have any data yet. Choose a path
            below to get moving.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Campaign */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-valasys-orange/10 text-valasys-orange">
                  <Rocket className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base">Create Campaign</CardTitle>
                  <CardDescription>
                    Launch your first campaign to start generating results
                    immediately.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex gap-3">
              <Button
                onClick={() => {
                  handleClose(true);
                  navigate("/build-campaign");
                }}
              >
                Start new
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleClose(true);
                  navigate("/abm-lal");
                }}
              >
                ABM/LAL
              </Button>
            </CardContent>
          </Card>

          {/* Import Data */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                  <Upload className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base">Import Data</CardTitle>
                  <CardDescription>
                    Bring your existing lists to kickstart analytics and
                    workflows.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex gap-3">
              <Button
                onClick={() => {
                  handleClose(true);
                  navigate("/build-campaign");
                }}
              >
                Upload file
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleClose(true);
                  navigate("/integrations");
                }}
              >
                API options
              </Button>
            </CardContent>
          </Card>

          {/* Connect Integrations */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-green-100 text-green-600">
                  <Plug className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base">
                    Connect Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect your CRM, marketing tools, or data sources to sync
                    automatically.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex gap-3">
              <Button
                onClick={() => {
                  handleClose(true);
                  navigate("/integrations");
                }}
              >
                Open Integrations
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleClose(true);
                  navigate("/settings");
                }}
              >
                Settings
              </Button>
            </CardContent>
          </Card>

          {/* Product Tour */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-purple-100 text-purple-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base">Product Tour</CardTitle>
                  <CardDescription>
                    Take a quick tour to learn the layout and core features.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex gap-3">
              <Button onClick={handleStartTour}>Start Tour</Button>
              <Button variant="outline" onClick={() => handleClose(false)}>
                Maybe later
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{" "}
            Set up your first campaign
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{" "}
            Import historical data
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{" "}
            Enable integrations & tour
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, Megaphone, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import CampaignRequestForm from "@/components/forms/CampaignRequestForm";
import CampaignRequestsList from "@/components/campaigns/CampaignRequestsList";
import TrackCampaigns from "@/components/campaigns/TrackCampaigns";

export default function BuildMyCampaign() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("form");

  // Check for tab parameter in URL and switch to appropriate tab
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "requests") {
      setActiveTab("list"); // 'list' corresponds to Campaign Requests tab
    } else if (tabParam === "track") {
      setActiveTab("track");
    }
  }, [searchParams]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-valasys-orange to-valasys-orange-light rounded-lg flex items-center justify-center">
                <Megaphone className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-valasys-gray-900">
                Build My Campaign
              </h1>
            </div>
            <p className="text-valasys-gray-600">
              Create new campaign requests and manage existing ones
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="w-full">
              <div className="px-6 pt-6">
                <div className="flex flex-col sm:flex-row gap-1 border-b border-valasys-gray-200 -mx-6 px-6">
                  <button
                    onClick={() => setActiveTab("form")}
                    className={cn(
                      "shrink-0 flex items-center w-full sm:w-auto px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm font-medium transition-all duration-200 group relative",
                      activeTab === "form"
                        ? "text-[#FF6A00] border-b-2 border-[#FF6A00]"
                        : "text-valasys-gray-600 hover:text-valasys-gray-900 border-b-2 border-transparent hover:border-valasys-gray-300",
                    )}
                  >
                    <PlusCircle
                      className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mr-2 sm:mr-3",
                        activeTab === "form"
                          ? "text-[#FF6A00]"
                          : "text-valasys-gray-500",
                      )}
                    />
                    <span className="truncate">New Campaign</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("list")}
                    className={cn(
                      "shrink-0 flex items-center w-full sm:w-auto px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm font-medium transition-all duration-200 group relative",
                      activeTab === "list"
                        ? "text-[#FF6A00] border-b-2 border-[#FF6A00]"
                        : "text-valasys-gray-600 hover:text-valasys-gray-900 border-b-2 border-transparent hover:border-valasys-gray-300",
                    )}
                  >
                    <List
                      className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mr-2 sm:mr-3",
                        activeTab === "list"
                          ? "text-[#FF6A00]"
                          : "text-valasys-gray-500",
                      )}
                    />
                    <span className="truncate">Campaign Requests</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("track")}
                    className={cn(
                      "shrink-0 flex items-center w-full sm:w-auto px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm font-medium transition-all duration-200 group relative",
                      activeTab === "track"
                        ? "text-[#FF6A00] border-b-2 border-[#FF6A00]"
                        : "text-valasys-gray-600 hover:text-valasys-gray-900 border-b-2 border-transparent hover:border-valasys-gray-300",
                    )}
                  >
                    <Activity
                      className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mr-2 sm:mr-3",
                        activeTab === "track"
                          ? "text-[#FF6A00]"
                          : "text-valasys-gray-500",
                      )}
                    />
                    <span className="truncate">Track Campaign</span>
                  </button>
                </div>
              </div>

              {activeTab === "form" && (
                <div className="p-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-valasys-gray-900">
                        Campaign Request Form
                      </h2>
                      <p className="text-sm text-valasys-gray-600">
                        Fill out the details below to create a new campaign
                        request
                      </p>
                    </div>
                    <CampaignRequestForm />
                  </div>
                </div>
              )}

              {activeTab === "list" && (
                <div className="p-6 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-valasys-gray-900">
                          Campaign Requests
                        </h2>
                        <p className="text-sm text-valasys-gray-600">
                          View and manage all your campaign requests
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("form")}
                        className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-valasys-orange text-white shadow hover:bg-valasys-orange/90 h-9 px-4 py-2"
                        title="Add Campaign"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Campaign
                      </button>
                    </div>
                    <CampaignRequestsList />
                  </div>
                </div>
              )}

              {activeTab === "track" && (
                <div className="p-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-valasys-gray-900">
                        Track Campaign
                      </h2>
                      <p className="text-sm text-valasys-gray-600">
                        Monitor live status, performance and reports for your
                        campaigns
                      </p>
                    </div>
                    <TrackCampaigns />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, RefreshCw, Users, Sparkles, FileText, Star } from "lucide-react";

export type RecentUpload = { name: string; date: string; type: string };

export default function QuickAccess({
  recentUploads,
  onPreview,
  onReupload,
  savedAbmCategories,
  savedLalCategories,
  onClickSaved,
  todayStats,
  onNavigate,
}: {
  recentUploads: RecentUpload[];
  onPreview: (upload: RecentUpload) => void;
  onReupload: (upload: RecentUpload) => void;
  savedAbmCategories: string[];
  savedLalCategories: string[];
  onClickSaved: (section: "abm" | "lal", category: string) => void;
  todayStats: {
    abmVerified: number;
    lalGenerated: number;
    creditsUsed: number;
  };
  onNavigate?: (section: "abm" | "lal") => void;
}) {
  return (
    <Card data-tour="abm-quick-access" className="shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Quick Access
          </CardTitle>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.("abm")}
            >
              <Users className="w-4 h-4 mr-2" /> Verify ABM
            </Button>
            <Button
              size="sm"
              className="bg-valasys-orange hover:bg-valasys-orange/90"
              onClick={() => onNavigate?.("lal")}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Generate LAL
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left: Recent Uploads */}
          <Card
            data-tour="abm-recent-uploads"
            className="col-span-1 lg:col-span-1 border border-gray-100"
          >
            <CardHeader className="py-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <CardTitle className="text-sm font-medium text-gray-800">
                  Recent Uploads
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {recentUploads.length === 0 && (
                <p className="text-xs text-gray-400">No uploads found</p>
              )}
              {recentUploads.map((upload, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate max-w-[9rem] sm:max-w-[12rem]">
                        {upload.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {upload.date} • {upload.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => onPreview(upload)}
                      aria-label="View file"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => onReupload(upload)}
                      aria-label="Re-upload to section"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Middle: Saved Categories */}
          <Card
            data-tour="abm-saved-categories"
            className="col-span-1 lg:col-span-2 border border-gray-100"
          >
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-800">
                  Saved Categories
                </CardTitle>
                <div className="hidden sm:flex gap-2">
                  <Badge variant="secondary" className="text-[11px]">
                    ABM: {savedAbmCategories.length}
                  </Badge>
                  <Badge variant="secondary" className="text-[11px]">
                    LAL: {savedLalCategories.length}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] text-gray-500 mb-1">ABM</div>
                  <div className="flex flex-wrap gap-1.5">
                    {savedAbmCategories.map((category, i) => (
                      <Badge
                        key={`abm-${i}`}
                        variant="secondary"
                        className="cursor-pointer hover:bg-valasys-orange hover:text-white transition-colors"
                        onClick={() => onClickSaved("abm", category)}
                      >
                        {category}
                      </Badge>
                    ))}
                    {savedAbmCategories.length === 0 && (
                      <span className="text-xs text-gray-400">
                        No ABM saves
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 mb-1">LAL</div>
                  <div className="flex flex-wrap gap-1.5">
                    {savedLalCategories.map((category, i) => (
                      <Badge
                        key={`lal-${i}`}
                        variant="secondary"
                        className="cursor-pointer hover:bg-valasys-orange hover:text-white transition-colors"
                        onClick={() => onClickSaved("lal", category)}
                      >
                        {category}
                      </Badge>
                    ))}
                    {savedLalCategories.length === 0 && (
                      <span className="text-xs text-gray-400">
                        No LAL saves
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                Tip: Click a saved category to auto-select the subcategory and
                jump to the right tab.
              </div>
            </CardContent>
          </Card>

          {/* Right: Today's Activity */}
          <Card
            data-tour="abm-today-activity"
            className="col-span-1 lg:col-span-1 border border-gray-100"
          >
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-gray-800">
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">ABM Verified</span>
                <span className="font-medium">{todayStats.abmVerified}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">LAL Generated</span>
                <span className="font-medium">{todayStats.lalGenerated}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Credits Used</span>
                <span className="font-medium">{todayStats.creditsUsed}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Quick Actions */}
        <div className="mt-4 flex md:hidden gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onNavigate?.("abm")}
          >
            <Users className="w-4 h-4 mr-2" /> Verify ABM
          </Button>
          <Button
            className="flex-1 bg-valasys-orange hover:bg-valasys-orange/90"
            onClick={() => onNavigate?.("lal")}
          >
            <Sparkles className="w-4 h-4 mr-2" /> Generate LAL
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

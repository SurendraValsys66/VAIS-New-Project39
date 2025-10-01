import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileWarning,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type CampaignLiveStatus = {
  id: string;
  name: string;
  type: string;
  cpl: number;
  startDate: string;
  endDate: string;
  totalTarget: number;
  leadsSubmitted: number;
  leadsAccepted: number;
  leadsPending: number;
  status: "Active" | "Paused" | "Completed" | "On Hold";
  emailStatsReportUrl?: string;
  programAnalysisReportUrl?: string;
};

const mockCampaigns: CampaignLiveStatus[] = [
  {
    id: "cmp-001",
    name: "ABM Enterprise Q1",
    type: "ABM",
    cpl: 85,
    startDate: "2025-01-05",
    endDate: "2025-03-31",
    totalTarget: 1200,
    leadsSubmitted: 760,
    leadsAccepted: 690,
    leadsPending: 70,
    status: "Active",
    emailStatsReportUrl: "/robots.txt",
    programAnalysisReportUrl: "/robots.txt",
  },
  {
    id: "cmp-002",
    name: "Content Syndication NA",
    type: "Content Syndication",
    cpl: 42,
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    totalTarget: 800,
    leadsSubmitted: 820,
    leadsAccepted: 800,
    leadsPending: 0,
    status: "Completed",
    emailStatsReportUrl: "/robots.txt",
    programAnalysisReportUrl: "/robots.txt",
  },
  {
    id: "cmp-003",
    name: "Intent Leads EU",
    type: "Intent",
    cpl: 58,
    startDate: "2025-02-01",
    endDate: "2025-04-15",
    totalTarget: 500,
    leadsSubmitted: 250,
    leadsAccepted: 210,
    leadsPending: 40,
    status: "Paused",
  },
];

function statusBadgeClasses(status: CampaignLiveStatus["status"]) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Paused":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Completed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "On Hold":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

function formatCurrency(n: number) {
  return `$${n.toFixed(2)}`;
}

function percent(accepted: number, target: number) {
  if (target <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((accepted / target) * 100)));
}

function GradientProgress({ value }: { value: number }) {
  return (
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-valasys-gray-200/60">
      <div
        className="h-full rounded-full bg-gradient-to-r from-valasys-orange to-valasys-orange-light transition-[width] duration-700 ease-out shadow-[0_0_8px_rgba(255,106,0,0.35)]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

type SortKey =
  | "name"
  | "type"
  | "cpl"
  | "startDate"
  | "endDate"
  | "totalTarget"
  | "leadsSubmitted"
  | "leadsAccepted"
  | "leadsPending"
  | "goal";

type SortDir = "asc" | "desc";

export default function TrackCampaigns() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockCampaigns;
    return mockCampaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q),
    );
  }, [query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const goalA = percent(a.leadsAccepted, a.totalTarget);
      const goalB = percent(b.leadsAccepted, b.totalTarget);
      const map: Record<SortKey, number | string> = {
        name: a.name,
        type: a.type,
        cpl: a.cpl,
        startDate: a.startDate,
        endDate: a.endDate,
        totalTarget: a.totalTarget,
        leadsSubmitted: a.leadsSubmitted,
        leadsAccepted: a.leadsAccepted,
        leadsPending: a.leadsPending,
        goal: goalA,
      };
      const mapB: Record<SortKey, number | string> = {
        name: b.name,
        type: b.type,
        cpl: b.cpl,
        startDate: b.startDate,
        endDate: b.endDate,
        totalTarget: b.totalTarget,
        leadsSubmitted: b.leadsSubmitted,
        leadsAccepted: b.leadsAccepted,
        leadsPending: b.leadsPending,
        goal: goalB,
      };

      const va = map[sortKey];
      const vb = mapB[sortKey];

      let cmp = 0;
      if (typeof va === "number" && typeof vb === "number") {
        cmp = va - vb;
      } else {
        cmp = String(va).localeCompare(String(vb));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, page]);

  const changeSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const SortHead = ({
    label,
    k,
    alignRight,
  }: {
    label: string;
    k: SortKey;
    alignRight?: boolean;
  }) => (
    <TableHead className={alignRight ? "text-right text-white" : "text-white"}>
      <button
        onClick={() => changeSort(k)}
        className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/90 transition-colors"
      >
        <span>{label}</span>
        <ArrowUpDown
          className={
            sortKey === k ? "w-4 h-4 text-white" : "w-4 h-4 text-white/70"
          }
        />
      </button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, type or status"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-9 text-[18px] h-11"
              />
            </div>
            <div className="text-sm text-valasys-gray-600 ml-auto">
              <span className="font-medium">Total Records:</span>{" "}
              {sorted.length.toLocaleString()} <span className="mx-2">•</span>{" "}
              <span className="font-medium">Page:</span> {page} of {totalPages}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent />
      </Card>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-valasys-orange to-valasys-orange-light">
              <SortHead label="Campaign Name" k="name" />
              <SortHead label="Type" k="type" />
              <SortHead label="CPL" k="cpl" />
              <SortHead label="Start Date" k="startDate" />
              <SortHead label="End Date" k="endDate" />
              <SortHead label="Total Target" k="totalTarget" alignRight />
              <SortHead label="Leads Submitted" k="leadsSubmitted" alignRight />
              <SortHead label="Leads Accepted" k="leadsAccepted" alignRight />
              <SortHead label="Leads Pending" k="leadsPending" alignRight />
              <SortHead label="Goal Achieved %" k="goal" />
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">
                Email Statistics Report
              </TableHead>
              <TableHead className="text-white">
                Program Analysis Report
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={13}
                  className="text-center py-8 text-muted-foreground"
                >
                  No matching campaigns
                </TableCell>
              </TableRow>
            ) : (
              current.map((c) => {
                const p = percent(c.leadsAccepted, c.totalTarget);
                return (
                  <TableRow
                    key={c.id}
                    className="transition-all hover:bg-valasys-gray-50 hover:shadow-sm hover:-translate-y-[1px]"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span>{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-gradient-to-r from-valasys-orange to-valasys-orange-light text-white px-2 py-0.5 text-xs shadow-sm">
                        {formatCurrency(c.cpl)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(c.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(c.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {c.totalTarget.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {c.leadsSubmitted.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {c.leadsAccepted.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {c.leadsPending.toLocaleString()}
                    </TableCell>
                    <TableCell className="min-w-[190px]">
                      <div className="flex items-center gap-3">
                        <div className="w-28">
                          <GradientProgress value={p} />
                        </div>
                        <span className="text-sm font-semibold text-valasys-gray-800">
                          {p}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusBadgeClasses(c.status)}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {c.emailStatsReportUrl ? (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="group transition-transform hover:scale-[1.02]"
                          title="Download Email Statistics Report"
                        >
                          <a href={c.emailStatsReportUrl} download>
                            <Download className="w-4 h-4 text-valasys-orange group-hover:text-valasys-orange" />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileWarning className="w-4 h-4" />
                          Not available
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {c.programAnalysisReportUrl ? (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="group transition-transform hover:scale-[1.02]"
                          title="Download Program Analysis Report"
                        >
                          <a href={c.programAnalysisReportUrl} download>
                            <Download className="w-4 h-4 text-valasys-orange group-hover:text-valasys-orange" />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileWarning className="w-4 h-4" />
                          Not available
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-valasys-gray-600">
            Showing {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, sorted.length)} of {sorted.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    (p >= page - 1 && p <= page + 1),
                )
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-2 text-muted-foreground">…</span>
                    )}
                    <Button
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  </React.Fragment>
                ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

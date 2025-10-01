import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpendingRecord {
  id: string;
  date: string;
  time: string;
  task: string;
  creditsSpent: number;
  creditsAdded: number;
  creditsBalance: number;
  type: "spent" | "added" | "refund";
  description?: string;
}

const mockData: SpendingRecord[] = [
  {
    id: "1",
    date: "26 Aug 2025",
    time: "9:43 pm",
    task: "Prospect",
    creditsSpent: 1,
    creditsAdded: 0,
    creditsBalance: 999,
    type: "spent",
  },
  {
    id: "2",
    date: "26 Aug 2025",
    time: "9:43 pm",
    task: "Search",
    creditsSpent: 1,
    creditsAdded: 0,
    creditsBalance: 998,
    type: "spent",
  },
  {
    id: "3",
    date: "26 Aug 2025",
    time: "8:08 pm",
    task: "Search",
    creditsSpent: 1,
    creditsAdded: 0,
    creditsBalance: 997,
    type: "spent",
  },
  {
    id: "4",
    date: "26 Aug 2025",
    time: "9:49 pm",
    task: "Search",
    creditsSpent: 1,
    creditsAdded: 0,
    creditsBalance: 996,
    type: "spent",
  },
  {
    id: "5",
    date: "26 Aug 2025",
    time: "9:43 pm",
    task: "Search",
    creditsSpent: 1,
    creditsAdded: 0,
    creditsBalance: 995,
    type: "spent",
  },
  {
    id: "6",
    date: "25 Aug 2025",
    time: "10:30 am",
    task: "Credit Purchase",
    creditsSpent: 0,
    creditsAdded: 500,
    creditsBalance: 1500,
    type: "added",
    description: "Monthly credit package",
  },
  {
    id: "7",
    date: "24 Aug 2025",
    time: "2:15 pm",
    task: "Refund",
    creditsSpent: 0,
    creditsAdded: 50,
    creditsBalance: 1000,
    type: "refund",
    description: "Failed search refund",
  },
];

export default function SpendingHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "spent" | "added">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getDateTimeMs = (record: SpendingRecord) => {
    const ts = Date.parse(`${record.date} ${record.time}`);
    return Number.isNaN(ts) ? 0 : ts;
  };

  // Filter and sort data similar to Downloaded List page
  const filteredData = mockData
    .filter((record) => {
      const matchesSearch =
        record.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || record.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = getDateTimeMs(a) - getDateTimeMs(b);
      } else if (sortBy === "spent") {
        comparison = a.creditsSpent - b.creditsSpent;
      } else if (sortBy === "added") {
        comparison = a.creditsAdded - b.creditsAdded;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "spent":
        return <TrendingDown className="h-4 w-4" />;
      case "added":
        return <TrendingUp className="h-4 w-4" />;
      case "refund":
        return <Minus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "spent":
        return "destructive";
      case "added":
        return "default";
      case "refund":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-gradient-to-r from-valasys-orange to-valasys-orange-light rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-valasys-gray-900">
                Spending History
              </h1>
            </div>
            <p className="text-valasys-gray-600 mt-1">
              Track your credit usage and spending patterns
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </div>

        {/* Search & Filters (modeled after Downloaded List) */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <Filter className="w-5 h-5 mr-2 text-valasys-orange" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-valasys-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="spent">Credits Spent</SelectItem>
                    <SelectItem value="added">Credits Added</SelectItem>
                    <SelectItem value="refund">Refunds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div>
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [by, order] = value.split("-");
                    setSortBy(by as "date" | "spent" | "added");
                    setSortOrder(order as "asc" | "desc");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Date (Newest)</SelectItem>
                    <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                    <SelectItem value="spent-desc">Spent (High-Low)</SelectItem>
                    <SelectItem value="spent-asc">Spent (Low-High)</SelectItem>
                    <SelectItem value="added-desc">Added (High-Low)</SelectItem>
                    <SelectItem value="added-asc">Added (Low-High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <div>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setSortBy("date");
                    setSortOrder("desc");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Records */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spending Records</CardTitle>
            <CardDescription>
              Detailed breakdown of your credit transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Table */}
            <div className="rounded-lg border border-valasys-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-valasys-gray-50 border-b border-valasys-gray-200">
                    <tr>
                      <th className="text-left p-4 font-medium text-valasys-gray-900">
                        Date
                      </th>
                      <th className="text-left p-4 font-medium text-valasys-gray-900">
                        Time
                      </th>
                      <th className="text-left p-4 font-medium text-valasys-gray-900">
                        Task
                      </th>
                      <th className="text-right p-4 font-medium text-valasys-gray-900">
                        Credits Spent
                      </th>
                      <th className="text-right p-4 font-medium text-valasys-gray-900">
                        Credits Added
                      </th>
                      <th className="text-right p-4 font-medium text-valasys-gray-900">
                        Balance
                      </th>
                      <th className="text-left p-4 font-medium text-valasys-gray-900">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((record, index) => (
                      <tr
                        key={record.id}
                        className={cn(
                          "border-b border-valasys-gray-100 hover:bg-valasys-gray-25 transition-colors",
                          index % 2 === 0 ? "bg-white" : "bg-valasys-gray-25",
                        )}
                      >
                        <td className="p-4 text-valasys-gray-900 font-medium">
                          {record.date}
                        </td>
                        <td className="p-4 text-valasys-gray-600">
                          {record.time}
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-valasys-gray-900 font-medium">
                              {record.task}
                            </div>
                            {record.description && (
                              <div className="text-sm text-valasys-gray-500">
                                {record.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {record.creditsSpent > 0 ? (
                            <span className="text-red-600 font-medium">
                              -{record.creditsSpent}
                            </span>
                          ) : (
                            <span className="text-valasys-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {record.creditsAdded > 0 ? (
                            <span className="text-green-600 font-medium">
                              +{record.creditsAdded}
                            </span>
                          ) : (
                            <span className="text-valasys-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4 text-right font-medium text-valasys-gray-900">
                          {record.creditsBalance}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={getTypeColor(record.type) as any}
                            className="flex items-center gap-1 w-fit"
                          >
                            {getTypeIcon(record.type)}
                            {record.type.charAt(0).toUpperCase() +
                              record.type.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-valasys-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

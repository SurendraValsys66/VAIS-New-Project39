import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Pie,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Target,
  Award,
  DollarSign,
  Eye,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  BarChart3,
  PieChart as PieChartIcon,
  MapPin,
  Globe,
} from "lucide-react";
import EnhancedStatsCards from "@/components/dashboard/EnhancedStatsCards";
import AdvancedFilters from "@/components/dashboard/AdvancedFilters";
import { cn } from "@/lib/utils";

// Mock data for demonstrations
const executiveData = {
  accountsVerified: 2100,
  availableCredits: 15750,
  creditsSpent: 5400,
  successRate: 98.1,
};

const executiveTrends = {
  accountsVerified: [
    { value: 1850, changePercent: 8.5 },
    { value: 1920, changePercent: 3.8 },
    { value: 2010, changePercent: 4.7 },
    { value: 2100, changePercent: 4.5 },
  ],
  availableCredits: [
    { value: 18200, changePercent: -2.1 },
    { value: 17850, changePercent: -1.9 },
    { value: 16200, changePercent: -9.2 },
    { value: 15750, changePercent: -2.8 },
  ],
  creditsSpent: [
    { value: 4100, changePercent: 12.3 },
    { value: 4650, changePercent: 13.4 },
    { value: 5100, changePercent: 9.7 },
    { value: 5400, changePercent: 5.9 },
  ],
  successRate: [
    { value: 94.2, changePercent: 2.1 },
    { value: 96.8, changePercent: 2.8 },
    { value: 97.5, changePercent: 0.7 },
    { value: 98.1, changePercent: 0.6 },
  ],
};

const campaignPerformanceData = [
  {
    month: "Jul",
    email: 2400,
    social: 1398,
    search: 800,
    conversion: 24.5,
    cac: 45,
  },
  {
    month: "Aug",
    email: 1398,
    social: 2800,
    search: 967,
    conversion: 28.2,
    cac: 38,
  },
  {
    month: "Sep",
    email: 9800,
    social: 3908,
    search: 1200,
    conversion: 32.1,
    cac: 42,
  },
  {
    month: "Oct",
    email: 3908,
    social: 4800,
    search: 1548,
    conversion: 29.8,
    cac: 35,
  },
  {
    month: "Nov",
    email: 4800,
    social: 3800,
    search: 1890,
    conversion: 35.6,
    cac: 31,
  },
  {
    month: "Dec",
    email: 3800,
    social: 4300,
    search: 2100,
    conversion: 38.9,
    cac: 28,
  },
];

const aiPerformanceData = [
  {
    date: "Week 1",
    accuracy: 94.2,
    precision: 91.5,
    recall: 89.8,
    f1Score: 90.6,
    processingTime: 145,
  },
  {
    date: "Week 2",
    accuracy: 95.1,
    precision: 92.8,
    recall: 91.2,
    f1Score: 92.0,
    processingTime: 138,
  },
  {
    date: "Week 3",
    accuracy: 96.3,
    precision: 94.1,
    recall: 92.7,
    f1Score: 93.4,
    processingTime: 132,
  },
  {
    date: "Week 4",
    accuracy: 97.8,
    precision: 95.6,
    recall: 94.3,
    f1Score: 94.9,
    processingTime: 125,
  },
];

const customerSegmentData = [
  { name: "Enterprise", value: 35, color: "#FF6A00", customers: 1420 },
  { name: "Mid-Market", value: 45, color: "#1A73E8", customers: 2850 },
  { name: "SMB", value: 20, color: "#00C48C", customers: 980 },
];

const geoPerformanceData = [
  { region: "North America", revenue: 450000, customers: 1250, growth: 15.2 },
  { region: "Europe", revenue: 380000, customers: 980, growth: 22.7 },
  { region: "Asia Pacific", revenue: 290000, customers: 720, growth: 35.8 },
  { region: "Latin America", revenue: 140000, customers: 380, growth: 18.9 },
];

const VALASYS_COLORS = {
  orange: "#FF6A00",
  blue: "#1A73E8",
  green: "#00C48C",
  gray: "#6B7280",
  red: "#EF4444",
  purple: "#8B5CF6",
};

// Executive Dashboard Component
const ExecutiveDashboard = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-valasys-gray-900">
          Executive Overview
        </h2>
        <p className="text-valasys-gray-600">
          Real-time business metrics and performance indicators
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>

    <EnhancedStatsCards data={executiveData} trends={executiveTrends} />

    {/* Revenue and Growth Metrics */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light hover:bg-valasys-gray-50">
            <DollarSign className="w-5 h-5 text-valasys-green" />
            <span>Revenue Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={campaignPerformanceData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={VALASYS_COLORS.green}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={VALASYS_COLORS.green}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="conversion"
                  stroke={VALASYS_COLORS.green}
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={900}
                  animationEasing="ease-out"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light hover:bg-valasys-gray-50">
            <Globe className="w-5 h-5 text-valasys-blue" />
            <span>Geographic Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {geoPerformanceData.map((region, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-valasys-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-valasys-gray-500" />
                  <div>
                    <p className="font-medium text-valasys-gray-900">
                      {region.region}
                    </p>
                    <p className="text-sm text-valasys-gray-600">
                      {region.customers} customers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-valasys-gray-900">
                    ${region.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />+{region.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Campaign Performance Component
const CampaignPerformance = () => {
  const [hoveredChannelIdx, setHoveredChannelIdx] = useState<number | null>(null);
  const channelDistData = [
    { name: "Email", value: 35, color: VALASYS_COLORS.orange },
    { name: "Social", value: 40, color: VALASYS_COLORS.blue },
    { name: "Search", value: 25, color: VALASYS_COLORS.green },
  ];
  const channelTotal = channelDistData.reduce((s, d) => s + d.value, 0);

  return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-valasys-gray-900">
          Campaign Analytics
        </h2>
        <p className="text-valasys-gray-600">
          Multi-channel campaign performance and attribution
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Select defaultValue="30d">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={campaignPerformanceData}>
                <defs>
                  <linearGradient id="gradEmail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={VALASYS_COLORS.orange} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={VALASYS_COLORS.orange} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="gradSocial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={VALASYS_COLORS.blue} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={VALASYS_COLORS.blue} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="gradSearch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={VALASYS_COLORS.green} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={VALASYS_COLORS.green} stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="gradConversion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={VALASYS_COLORS.red} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={VALASYS_COLORS.red} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="email"
                  name="Email"
                  fill="url(#gradEmail)"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationBegin={150}
                  animationDuration={700}
                />
                <Bar
                  yAxisId="left"
                  dataKey="social"
                  name="Social"
                  fill="url(#gradSocial)"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationBegin={250}
                  animationDuration={700}
                />
                <Bar
                  yAxisId="left"
                  dataKey="search"
                  name="Search"
                  fill="url(#gradSearch)"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={true}
                  animationBegin={350}
                  animationDuration={700}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversion"
                  name="Conversion Rate (%)"
                  stroke={VALASYS_COLORS.red}
                  fill="url(#gradConversion)"
                  strokeWidth={3}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={900}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channel Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {channelDistData.map((seg, i) => (
                    <linearGradient key={i} id={`chanSeg${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={seg.color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={seg.color} stopOpacity={0.2} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={channelDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  cornerRadius={6}
                  paddingAngle={3}
                  dataKey="value"
                  isAnimationActive
                  animationDuration={800}
                  onMouseLeave={() => setHoveredChannelIdx(null)}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {channelDistData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#chanSeg${index})`}
                      stroke="white"
                      strokeWidth={hoveredChannelIdx === index ? 3 : 2}
                      onMouseEnter={() => setHoveredChannelIdx(index)}
                      style={{
                        filter:
                          hoveredChannelIdx === index
                            ? "drop-shadow(0 6px 12px rgba(255, 106, 0, 0.35))"
                            : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                        transition: "all 0.25s ease-out",
                        transform: hoveredChannelIdx === index ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                      }}
                    />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                  <tspan x="50%" dy="-0.3em" fontSize="11" fontWeight="600" className="fill-valasys-gray-600">
                    Total
                  </tspan>
                  <tspan x="50%" dy="1.4em" fontSize="18" fontWeight="800" className="fill-valasys-orange">
                    {channelTotal}%
                  </tspan>
                </text>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    border: "1px solid #FF6A00",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(255, 106, 0, 0.15)",
                    padding: "12px 16px",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#1E293B", marginBottom: 4 }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* CAC and Performance Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Target className="w-5 h-5 text-valasys-orange" />
          </div>
          <div>
            <p className="text-sm text-valasys-gray-600">Avg CAC</p>
            <p className="text-xl font-bold text-valasys-gray-900">$34.50</p>
            <p className="text-xs text-green-600">-12% vs last month</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-valasys-blue" />
          </div>
          <div>
            <p className="text-sm text-valasys-gray-600">ROAS</p>
            <p className="text-xl font-bold text-valasys-gray-900">4.2x</p>
            <p className="text-xs text-green-600">+8% vs last month</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-valasys-gray-600">CTR</p>
            <p className="text-xl font-bold text-valasys-gray-900">3.8%</p>
            <p className="text-xs text-green-600">+0.5% vs last month</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-valasys-gray-600">Lead Quality</p>
            <p className="text-xl font-bold text-valasys-gray-900">87%</p>
            <p className="text-xs text-green-600">+3% vs last month</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
  );
};

// VAIS AI Performance Component
const VAISPerformance = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-valasys-gray-900">
          VAIS AI Performance
        </h2>
        <p className="text-valasys-gray-600">
          AI model accuracy, performance metrics, and optimization insights
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Model Healthy
        </Badge>
        <Button variant="outline" size="sm">
          <Brain className="w-4 h-4 mr-2" />
          Model Settings
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-valasys-gray-600">Model Accuracy</p>
            <p className="text-2xl font-bold text-valasys-gray-900">97.8%</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +1.5% this week
            </p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <Brain className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-valasys-gray-600">Processing Time</p>
            <p className="text-2xl font-bold text-valasys-gray-900">125ms</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingDown className="w-3 h-3 mr-1" />
              -15ms improved
            </p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-5 h-5 text-valasys-blue" />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-valasys-gray-600">Precision Score</p>
            <p className="text-2xl font-bold text-valasys-gray-900">95.6%</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.8% this week
            </p>
          </div>
          <div className="p-2 bg-orange-100 rounded-lg">
            <Target className="w-5 h-5 text-valasys-orange" />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-valasys-gray-600">Data Quality</p>
            <p className="text-2xl font-bold text-valasys-gray-900">94.3%</p>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Needs attention
            </p>
          </div>
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Activity className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>AI Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={aiPerformanceData}>
              <defs>
                <linearGradient id="gradAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={VALASYS_COLORS.green} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={VALASYS_COLORS.green} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradPrec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={VALASYS_COLORS.blue} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={VALASYS_COLORS.blue} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradRecall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={VALASYS_COLORS.orange} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={VALASYS_COLORS.orange} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                domain={[85, 100]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                domain={[100, 160]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="accuracy"
                stroke={VALASYS_COLORS.green}
                fill="url(#gradAcc)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={900}
                activeDot={{ r: 5 }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="precision"
                stroke={VALASYS_COLORS.blue}
                fill="url(#gradPrec)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={900}
                activeDot={{ r: 5 }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="recall"
                stroke={VALASYS_COLORS.orange}
                fill="url(#gradRecall)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={900}
                activeDot={{ r: 5 }}
              />
              <Bar
                yAxisId="right"
                dataKey="processingTime"
                name="Processing Time (ms)"
                fill={VALASYS_COLORS.gray}
                opacity={0.4}
                isAnimationActive
                animationBegin={200}
                animationDuration={800}
                radius={[4,4,0,0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Customer Intelligence Component
const CustomerIntelligence = () => {
  const [hoveredSeg, setHoveredSeg] = useState<number | null>(null);
  const totalPercent = customerSegmentData.reduce((s, d) => s + d.value, 0);

  return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-valasys-gray-900">
          Customer Intelligence
        </h2>
        <p className="text-valasys-gray-600">
          Customer behavior, segmentation, and predictive insights
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <PieChartIcon className="w-4 h-4 mr-2" />
          Segment Analysis
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {customerSegmentData.map((seg, i) => (
                    <linearGradient key={i} id={`custSeg${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={seg.color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={seg.color} stopOpacity={0.2} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  cornerRadius={6}
                  paddingAngle={3}
                  dataKey="value"
                  isAnimationActive
                  animationDuration={800}
                  onMouseLeave={() => setHoveredSeg(null)}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#custSeg${index})`}
                      stroke="white"
                      strokeWidth={hoveredSeg === index ? 3 : 2}
                      onMouseEnter={() => setHoveredSeg(index)}
                      style={{
                        filter:
                          hoveredSeg === index
                            ? "drop-shadow(0 6px 12px rgba(255, 106, 0, 0.35))"
                            : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                        transition: "all 0.25s ease-out",
                        transform: hoveredSeg === index ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                      }}
                    />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                  <tspan x="50%" dy="-0.3em" fontSize="11" fontWeight="600" className="fill-valasys-gray-600">
                    Total
                  </tspan>
                  <tspan x="50%" dy="1.4em" fontSize="18" fontWeight="800" className="fill-valasys-orange">
                    {totalPercent}%
                  </tspan>
                </text>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    border: "1px solid #FF6A00",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(255, 106, 0, 0.15)",
                    padding: "12px 16px",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#1E293B", marginBottom: 4 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segment Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerSegmentData.map((segment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-valasys-gray-900">
                    {segment.name}
                  </h4>
                  <Badge
                    style={{ backgroundColor: segment.color, color: "white" }}
                  >
                    {segment.value}%
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-valasys-gray-600">Customers</p>
                    <p className="font-medium">
                      {segment.customers.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-valasys-gray-600">Avg Revenue</p>
                    <p className="font-medium">
                      ${(Math.random() * 5000 + 1000).toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Churn Risk and Opportunity Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">High Churn Risk</h3>
              <p className="text-red-700">142 customers at risk</p>
              <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">
                Upsell Opportunities
              </h3>
              <p className="text-green-700">89 qualified prospects</p>
              <Button
                size="sm"
                className="mt-2 bg-green-600 hover:bg-green-700"
              >
                View Prospects
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Top Performers</h3>
              <p className="text-blue-700">25 high-value customers</p>
              <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                View Champions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("executive");

  const handleFiltersChange = (filters: any[]) => {
    console.log("Applied filters:", filters);
    // Here you would typically update your data based on the filters
  };

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    console.log(`Exporting data as ${format}`);
    // Implement actual export functionality here
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-valasys-orange to-valasys-orange-light rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            </div>
            <p className="text-gray-600 mt-1">
              Comprehensive analytics and performance insights
            </p>
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap gap-2 border-b border-valasys-gray-200 pb-2">
            <TabsTrigger
              value="executive"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light hover:bg-valasys-gray-50"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Executive</span>
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light hover:bg-valasys-gray-50"
            >
              <Target className="w-4 h-4" />
              <span>Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="vais" className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light hover:bg-valasys-gray-50">
              <Brain className="w-4 h-4" />
              <span>VAIS AI</span>
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:bg-gradient-to-r data-[state=active]:from-valasys-orange data-[state=active]:to-valasys-orange-light hover:bg-valasys-gray-50"
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignPerformance />
          </TabsContent>

          <TabsContent value="vais">
            <VAISPerformance />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerIntelligence />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

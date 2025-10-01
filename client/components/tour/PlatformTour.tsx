import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  LayoutDashboard,
  Bot,
  Target,
  Search,
  Megaphone,
  PlusCircle,
  BarChart3,
  Users,
  Ticket,
  HelpCircle,
  Settings,
  Bell,
  User,
  MessageCircle,
  Crown,
  Activity,
  TrendingUp,
  Zap,
  Sparkles,
  Shield,
  CheckCircle,
  Calendar,
  PieChart,
  Monitor,
  Award,
  Clock,
  Upload,
  Save,
  Building,
  CreditCard,
  Calculator,
  Filter,
  Download,
  List,
  FileText,
} from "lucide-react";

export interface TourStep {
  id: string;
  target: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  position: "top" | "bottom" | "left" | "right" | "center";
  category: "navigation" | "dashboard" | "utilities" | "features";
  tips?: string[];
  nextAction?: string;
}

// Dashboard-specific tour steps (main content only)
const dashboardTourSteps: TourStep[] = [
  {
    id: "welcome-dashboard",
    target: "body",
    title: "Welcome to Your Dashboard! 📊",
    description:
      "This is your central command center where you can monitor all your AI scoring activities, track performance metrics, and analyze data trends in real-time.",
    icon: LayoutDashboard,
    position: "center",
    category: "dashboard",
    tips: [
      "All dashboard data updates automatically",
      "Use date filters to analyze specific time periods",
      "Charts are interactive - hover and click for details",
    ],
  },
  {
    id: "dashboard-controls",
    target: "[data-tour='dashboard-controls']",
    title: "Dashboard Controls & Settings",
    description:
      "Control your dashboard experience with real-time data toggle and date range selection. Monitor when your data was last updated and customize your view.",
    icon: Settings,
    position: "bottom",
    category: "dashboard",
    tips: [
      "Toggle live updates on/off as needed",
      "Select custom date ranges for analysis",
      "Live indicator shows real-time data status",
    ],
    nextAction: "Configure your dashboard settings",
  },
  {
    id: "stats-cards",
    target: "[data-tour='stats-cards']",
    title: "Real-time Statistics Overview",
    description:
      "Monitor key performance indicators with live updating statistics. Track accounts verified, available credits, success rates, and trending metrics at a glance.",
    icon: Activity,
    position: "bottom",
    category: "dashboard",
    tips: [
      "Cards show current values and trend indicators",
      "Color coding indicates performance status",
      "Percentage changes show period-over-period growth",
    ],
    nextAction: "Monitor your key metrics",
  },
  {
    id: "analytics-charts",
    target: "[data-tour='analytics-charts']",
    title: "Interactive Analytics Charts",
    description:
      "Dive deep into your data with interactive SaaS analytics charts. Visualize trends, compare periods, and identify patterns in your scoring activities.",
    icon: BarChart3,
    position: "bottom",
    category: "dashboard",
    tips: [
      "Hover over chart points for detailed tooltips",
      "Switch between different chart types",
      "Export chart data for external analysis",
    ],
    nextAction: "Explore your analytics data",
  },
  {
    id: "performance-analytics",
    target: "[data-tour='performance-analytics']",
    title: "Monthly Performance Analytics",
    description:
      "Track your monthly performance with detailed analytics showing accounts processed, credits utilized, conversion rates, and goal achievement over time.",
    icon: TrendingUp,
    position: "top",
    category: "dashboard",
    tips: [
      "View performance trends across multiple months",
      "Compare actual vs. target achievements",
      "Identify peak performance periods",
    ],
    nextAction: "Analyze your monthly trends",
  },
  {
    id: "distribution-analysis",
    target: "[data-tour='distribution-analysis']",
    title: "Distribution Analysis Charts",
    description:
      "Understand your data distribution with dynamic charts showing breakdowns by employee size, industry, revenue, and other key demographics.",
    icon: PieChart,
    position: "top",
    category: "dashboard",
    tips: [
      "Switch between different distribution views",
      "Interactive pie and bar charts",
      "Identify your most valuable segments",
    ],
    nextAction: "Explore data distributions",
  },
  {
    id: "detailed-overview",
    target: "[data-tour='detailed-overview']",
    title: "Detailed Overview Charts",
    description:
      "Get comprehensive insights with detailed overview charts that provide deep-dive analysis of your data patterns and performance metrics over time.",
    icon: Monitor,
    position: "top",
    category: "dashboard",
    tips: [
      "Detailed breakdowns by multiple dimensions",
      "Compare different time periods",
      "Identify optimization opportunities",
    ],
    nextAction: "Dive into detailed analytics",
  },
  {
    id: "additional-insights",
    target: "[data-tour='additional-insights']",
    title: "Additional Performance Insights",
    description:
      "Monitor additional key metrics including monthly target achievement, credit utilization rate, and overall performance status indicators.",
    icon: Award,
    position: "top",
    category: "dashboard",
    tips: [
      "Track progress toward monthly goals",
      "Monitor credit usage efficiency",
      "Performance status shows overall health",
    ],
    nextAction: "Review your performance metrics",
  },
  {
    id: "dashboard-complete",
    target: "body",
    title: "🎉 Dashboard Tour Complete!",
    description:
      "You've explored all the key features of your dashboard! You're now ready to monitor your AI scoring performance, analyze data trends, and make data-driven decisions.",
    icon: CheckCircle,
    position: "center",
    category: "dashboard",
    tips: [
      "Bookmark important views for quick access",
      "Set up alerts for key performance changes",
      "Regular monitoring helps optimize performance",
      "Use the date filters to analyze specific periods",
    ],
    nextAction: "Start monitoring your performance!",
  },
];

// BuildVAIS page tour steps (main content only)
const buildVAISTourSteps: TourStep[] = [
  {
    id: "welcome-build-vais",
    target: "body",
    title: "Welcome to VAIS Builder! 🤖",
    description:
      "Create powerful AI-driven prospect scores with our VAIS (Valasys AI Score) builder. This tool helps you identify and prioritize your best prospects using advanced AI algorithms.",
    icon: Bot,
    position: "center",
    category: "features",
    tips: [
      "Use saved searches for quick access to common configurations",
      "Configure your scoring criteria to match your ideal customer profile",
      "Intent topics help the AI understand what signals to look for",
    ],
  },
  {
    id: "vais-saved-searches",
    target: "[data-tour='vais-saved-searches']",
    title: "Quick Access - Saved Searches",
    description:
      "Access your previously saved VAIS configurations for quick reuse. Save time by reusing successful scoring criteria and intent topic combinations.",
    icon: Clock,
    position: "bottom",
    category: "features",
    tips: [
      "Click on any saved search to load its configuration",
      "Saved searches include all your previous settings",
      "Modify and re-save searches as your needs evolve",
    ],
    nextAction: "Load a saved search or create a new one",
  },
  {
    id: "vais-product-config",
    target: "[data-tour='vais-product-config']",
    title: "Product Configuration",
    description:
      "Configure your VAIS scoring parameters including industry filters, company size, revenue ranges, and geographic targeting. These settings help the AI focus on your ideal customer profile.",
    icon: Settings,
    position: "bottom",
    category: "features",
    tips: [
      "Be specific with your criteria for better AI accuracy",
      "Use industry filters to target relevant sectors",
      "Geographic targeting helps with regional campaigns",
    ],
    nextAction: "Set your targeting criteria",
  },
  {
    id: "vais-intent-topics",
    target: "[data-tour='vais-intent-topics']",
    title: "Intent Topics Selection",
    description:
      "Select intent topics that indicate buying signals from your prospects. The AI uses these topics to analyze online behavior and identify prospects showing purchase intent.",
    icon: Target,
    position: "top",
    category: "features",
    tips: [
      "Choose topics that align with your product or service",
      "More relevant topics lead to higher quality scores",
      "The AI analyzes web activity, social signals, and content engagement",
    ],
    nextAction: "Select relevant intent topics for your business",
  },
  {
    id: "vais-suppression-file",
    target: "[data-tour='vais-suppression-file']",
    title: "Upload Suppression File (Optional)",
    description:
      "Upload a suppression file to exclude specific companies or contacts from your VAIS results. This helps you avoid targeting existing customers or blacklisted accounts.",
    icon: Upload,
    position: "left",
    category: "features",
    tips: [
      "Suppression files help refine your targeting",
      "Supported formats: .xlsx, .csv, .txt files up to 10MB",
      "You can skip this step if no suppression is needed",
    ],
    nextAction: "Upload your suppression file or skip to continue",
  },
  {
    id: "vais-save-search",
    target: "[data-tour='vais-save-search']",
    title: "Save Search Configuration",
    description:
      "Save your current VAIS configuration for future use. This allows you to quickly reuse successful scoring criteria and settings for similar campaigns.",
    icon: Save,
    position: "bottom",
    category: "features",
    tips: [
      "Save configurations with descriptive names",
      "All your settings and criteria are preserved",
      "Saved searches appear in the Quick Access section",
    ],
    nextAction: "Save your configuration for future use",
  },
  {
    id: "vais-ready-to-build",
    target: "[data-tour='vais-ready-to-build']",
    title: "Ready to Build Your VAIS",
    description:
      "Once all required fields are completed, you can build your VAIS score. The AI will analyze your criteria and generate prospect scores based on your configuration.",
    icon: Building,
    position: "left",
    category: "features",
    tips: [
      "Complete all required fields to enable the Build button",
      "The AI processing typically takes 2-5 minutes",
      "You'll receive notifications when results are ready",
    ],
    nextAction: "Click 'Build Your VAIS' to start the AI processing",
  },
  {
    id: "vais-complete",
    target: "body",
    title: "🎉 VAIS Builder Tour Complete!",
    description:
      "You're now ready to build powerful AI-driven prospect scores! Configure your criteria, select intent topics, and let our AI identify your highest-value prospects.",
    icon: CheckCircle,
    position: "center",
    category: "features",
    tips: [
      "Start with broad criteria and refine based on results",
      "Monitor your scores regularly for optimization opportunities",
      "Export results to your CRM for immediate action",
      "Save successful configurations for future use",
    ],
    nextAction: "Start building your VAIS score!",
  },
];

// ABM/LAL page tour steps
const abmLALTourSteps: TourStep[] = [
  {
    id: "welcome-abm-lal",
    target: "body",
    title: "Welcome to ABM/LAL! 🎯",
    description:
      "Work with Account-Based Marketing (ABM) and generate Look-Alike (LAL) accounts. Use credits efficiently and switch between tabs to get things done fast.",
    icon: Target,
    position: "center",
    category: "features",
    tips: [
      "ABM verifies and enriches your target accounts",
      "LAL helps you discover similar high-fit accounts",
      "Use saved searches to speed up recurring workflows",
    ],
  },
  {
    id: "abm-credits",
    target: "[data-tour='abm-credits']",
    title: "Credits Overview",
    description:
      "Keep an eye on credits available and usage trends. Actions like verification and LAL generation consume credits.",
    icon: CreditCard,
    position: "bottom",
    category: "utilities",
    tips: [
      "Monitor remaining credits before running large jobs",
      "Top up or contact sales when running low",
    ],
  },
  {
    id: "abm-recent-uploads",
    target: "[data-tour='abm-recent-uploads']",
    title: "Recent Uploads",
    description:
      "Quickly access your last uploaded files. Preview or re-upload to the right section.",
    icon: FileText,
    position: "right",
    category: "utilities",
    tips: [
      "Use preview to verify the first rows",
      "Re-upload routes directly to ABM or LAL",
    ],
  },
  {
    id: "abm-saved-categories",
    target: "[data-tour='abm-saved-categories']",
    title: "Saved Categories",
    description:
      "Your saved ABM and LAL categories for quick reuse. Click to auto-select and jump to the correct tab.",
    icon: Save,
    position: "bottom",
    category: "utilities",
    tips: [
      "Name presets clearly for your team",
      "Use frequently to standardize workflows",
    ],
  },
  {
    id: "abm-today-activity",
    target: "[data-tour='abm-today-activity']",
    title: "Today's Activity",
    description:
      "At-a-glance stats for ABM verifications, LAL generations, and credits used today.",
    icon: Activity,
    position: "left",
    category: "dashboard",
  },
  {
    id: "abm-verify-accounts",
    target: "[data-tour='abm-verify-accounts']",
    title: "Verify Your ABM Accounts",
    description:
      "Upload your account list and verify details. Select your product subcategory, then verify to enrich and validate your targets.",
    icon: Users,
    position: "top",
    category: "features",
    tips: [
      "Use the provided template for best matching",
      "Save successful setups as presets",
    ],
    nextAction: "Upload file and click Verify My ABM",
  },
  {
    id: "abm-generate-lal",
    target: "[data-tour='abm-generate-lal']",
    title: "Generate Look-Alike Accounts",
    description:
      "Provide your top-performing accounts and generate similar companies that match your ICP.",
    icon: Sparkles,
    position: "top",
    category: "features",
    tips: [
      "Start with a clean, representative seed list",
      "Refine by product subcategory for better results",
    ],
    nextAction: "Upload top accounts and click Generate LAL",
  },
  {
    id: "abm-performance-insights",
    target: "[data-tour='abm-performance-insights']",
    title: "Performance Insights",
    description:
      "Track ABM and LAL outcomes, credit usage, and key metrics to optimize your workflows.",
    icon: BarChart3,
    position: "top",
    category: "dashboard",
    tips: [
      "Review trends to plan next campaigns",
      "Export insights for reporting",
    ],
  },
  {
    id: "abm-lal-tour-complete",
    target: "body",
    title: "🎉 ABM/LAL Tour Complete!",
    description:
      "You're ready to verify accounts, generate look-alikes, and track performance.",
    icon: CheckCircle,
    position: "center",
    category: "features",
    nextAction: "Start with your current priority: ABM or LAL",
  },
];

// Analytics page tour steps (main content only)
const analyticsTourSteps: TourStep[] = [
  {
    id: "welcome-analytics",
    target: "body",
    title: "Welcome to Advanced Analytics! 📊",
    description:
      "Dive deep into your performance data with comprehensive analytics, campaign insights, AI model performance, and customer intelligence. Make data-driven decisions with powerful visualizations.",
    icon: BarChart3,
    position: "center",
    category: "dashboard",
    tips: [
      "Use filters to analyze specific time periods and segments",
      "Export reports for presentations and external analysis",
      "Set up automated reporting for regular insights",
    ],
  },
  {
    id: "analytics-tabs",
    target: "[role='tablist']",
    title: "Analytics Categories",
    description:
      "Navigate between different analytics views: Executive overview for high-level metrics, Campaign performance for marketing insights, VAIS AI for model performance, and Customer intelligence for behavioral analysis.",
    icon: LayoutDashboard,
    position: "bottom",
    category: "dashboard",
    tips: [
      "Each tab provides specialized insights for different stakeholders",
      "Executive view is perfect for leadership presentations",
      "Use VAIS AI tab to monitor and optimize model performance",
    ],
    nextAction: "Explore different analytics categories",
  },
  {
    id: "analytics-complete",
    target: "body",
    title: "🎉 Analytics Tour Complete!",
    description:
      "You now have access to comprehensive analytics across all aspects of your AI-powered sales intelligence platform. Use these insights to optimize performance and drive better results.",
    icon: CheckCircle,
    position: "center",
    category: "dashboard",
    tips: [
      "Regular monitoring helps identify trends and opportunities",
      "Use filters and date ranges for detailed analysis",
      "Export important reports for stakeholder meetings",
      "Set performance benchmarks and track progress over time",
    ],
    nextAction: "Start analyzing your performance data!",
  },
];

// Downloaded list tour steps
const downloadTourSteps: TourStep[] = [
  {
    id: "welcome-downloads",
    target: "body",
    title: "Welcome to Downloads 🎁",
    description:
      "This page stores all files you exported — re-download, manage, or send them to your CRM integrations.",
    icon: Download,
    position: "center",
    category: "utilities",
    tips: [
      "Files are kept here for easy access",
      "Use filters to find the file you need quickly",
    ],
    nextAction: "Explore your downloaded files",
  },
  {
    id: "downloads-search-filters",
    target: "[data-tour='download-search-filters']",
    title: "Search & Filters",
    description:
      "Use the search box and filter controls to quickly locate files by name, type, or date. Narrow results faster with filters.",
    icon: Filter,
    position: "right",
    category: "utilities",
    tips: [
      "Search by file name or use the type filter to narrow results",
      "Sort columns to prioritize recent or large exports",
    ],
    nextAction: "Try searching for a file or applying a filter",
  },
  {
    id: "downloads-table",
    target: "[data-tour='downloads-table']",
    title: "Files & Actions",
    description:
      "The Downloads table shows file name, type, size, and quick actions like download or send to CRM.",
    icon: FileText,
    position: "bottom",
    category: "utilities",
    tips: [
      "Use the search box and filters to find specific files",
      "Click the download icon to re-download the file",
    ],
    nextAction: "Try downloading or sending a file to CRM",
  },
  {
    id: "send-to-crm",
    target: "[data-tour='send-to-crm-button']",
    title: "Send to CRM",
    description:
      "Quickly push your exported file directly into connected CRMs like Salesforce or HubSpot using this action.",
    icon: Upload,
    position: "left",
    category: "utilities",
    tips: [
      "Select the CRM account and confirm to send",
      "You can send individual or multiple files in bulk",
    ],
    nextAction: "Try sending a file to your CRM",
  },
  {
    id: "download-lal-file",
    target: "[data-tour='download-lal-row']",
    title: "Downloaded LAL File",
    description:
      "LAL exports contain look-alike account lists. You can re-download, inspect counts, or send them to your CRM.",
    icon: FileText,
    position: "bottom",
    category: "utilities",
    tips: [
      "LAL files often have larger counts — check the Data Count column",
      "Use Send to CRM to push results into your sales systems",
    ],
    nextAction: "Open a LAL file or try sending to CRM",
  },
];

// Build My Campaign page tour steps
const buildCampaignTourSteps: TourStep[] = [
  {
    id: "welcome-build-campaign",
    target: "body",
    title: "Build My Campaign",
    description:
      "Create campaign requests, manage submissions, and monitor performance from this page.",
    icon: Megaphone,
    position: "center",
    category: "features",
    tips: [
      "Start with campaign details and target criteria",
      "Track progress in the Track tab",
    ],
  },
  {
    id: "campaign-tab-form",
    target: "[data-tour='campaign-tab-form']",
    title: "New Campaign Tab",
    description: "Create a new campaign request using the guided form.",
    icon: PlusCircle,
    position: "bottom",
    category: "features",
  },
  {
    id: "campaign-form",
    target: "[data-tour='campaign-form']",
    title: "Campaign Request Form",
    description:
      "Provide campaign details, targeting criteria, and upload files here.",
    icon: Target,
    position: "right",
    category: "features",
  },
  {
    id: "campaign-tab-requests",
    target: "[data-tour='campaign-tab-requests']",
    title: "Campaign Requests",
    description: "View and manage all submitted campaign requests.",
    icon: List,
    position: "bottom",
    category: "features",
  },
  {
    id: "campaign-requests-list",
    target: "[data-tour='campaign-requests-list']",
    title: "Requests List",
    description: "Access request details, edit, or re-submit campaigns.",
    icon: Activity,
    position: "bottom",
    category: "features",
  },
  {
    id: "campaign-tab-track",
    target: "[data-tour='campaign-tab-track']",
    title: "Track Campaign",
    description:
      "Monitor live status and performance reports for your campaigns.",
    icon: Activity,
    position: "bottom",
    category: "features",
  },
];

// FindProspect page tour steps (main content only)
const findProspectTourSteps: TourStep[] = [
  {
    id: "welcome-find-prospect",
    target: "body",
    title: "Welcome to Prospect Discovery! 🔍",
    description:
      "Discover high-quality prospects using AI-powered search and filtering. Find decision-makers and key contacts based on your ideal customer profile with advanced targeting options.",
    icon: Search,
    position: "center",
    category: "features",
    tips: [
      "Start with broad search criteria and refine as needed",
      "Use advanced filters for precise targeting",
    ],
  },
  {
    id: "live-estimate",
    target: "[data-tour='live-estimate']",
    title: "Live Estimate Preview",
    description:
      "Get real-time estimates of prospect matches and credit costs as you adjust your filters. This dynamic preview helps you optimize your search before running it, ensuring you get the best value for your credits.",
    icon: Calculator,
    position: "bottom",
    category: "features",
    tips: [
      "Estimates update automatically as you change filters",
      "Higher confidence scores indicate better targeting",
      "Credit cost is calculated based on expected matches",
      "Use this to fine-tune your search before execution",
    ],
    nextAction: "Watch how estimates change as you modify filters",
  },
  {
    id: "upload-company-lists",
    target: "[data-tour='upload-company-lists']",
    title: "Upload Company Lists",
    description:
      "Upload your existing company or contact lists to enrich them with additional prospect data. Supports CSV and Excel files with automatic column mapping and data validation.",
    icon: Upload,
    position: "right",
    category: "features",
    tips: [
      "Drag and drop files or click to browse",
      "Supports .csv and .xlsx files up to 10MB",
      "Auto-mapping detects common column headers",
      "Preview sample matches before processing",
    ],
    nextAction: "Upload a company list to see enrichment in action",
  },
  {
    id: "targeting-filters",
    target: "[data-tour='targeting-filters']",
    title: "Advanced Targeting Filters",
    description:
      "Define your ideal customer profile with comprehensive targeting filters. Use geography, job functions, seniority levels, and more to find prospects that match your exact requirements.",
    icon: Filter,
    position: "left",
    category: "features",
    tips: [
      "Required fields are marked with red asterisks (*)",
      "Start with geography for fastest filtering",
      "Job function and level are required for accuracy",
      "Optional filters help narrow results further",
    ],
    nextAction: "Set up your ideal customer profile criteria",
  },
  {
    id: "save-as-preset",
    target: "[data-tour='save-as-preset']",
    title: "Save Search as Preset",
    description:
      "Save your successful search configurations as presets for quick reuse. This saves time when running similar searches and ensures consistency across your prospecting efforts.",
    icon: Save,
    position: "bottom",
    category: "features",
    tips: [
      "Only enabled when all required filters are set",
      "Give presets descriptive names for easy identification",
      "Saved presets appear in the Quick Access section",
      "Perfect for recurring search patterns",
    ],
    nextAction: "Complete your filters and save as a preset",
  },
  {
    id: "prospect-search-complete",
    target: "body",
    title: "🎉 Find Prospect Tour Complete!",
    description:
      "You've mastered the Find Prospect page! You can now efficiently discover high-quality prospects using advanced filters, live estimates, company uploads, and saved presets.",
    icon: CheckCircle,
    position: "center",
    category: "features",
    tips: [
      "Monitor live estimates to optimize credit usage",
      "Upload company lists for data enrichment",
      "Save successful searches as presets for reuse",
      "Required geography, job function, and level ensure quality results",
    ],
    nextAction: "Start building your first prospect search!",
  },
];

// BuildCampaign page tour steps (main content only)
const campaignBuilderTourSteps: TourStep[] = [
  {
    id: "welcome-build-campaign",
    target: "body",
    title: "Welcome to Campaign Builder! 📧",
    description:
      "Create and manage multi-channel marketing campaigns with our intuitive campaign builder. Design automated email sequences, set up triggers, and track performance across all touchpoints.",
    icon: Megaphone,
    position: "center",
    category: "features",
    tips: [
      "Use drag-and-drop interface for easy campaign creation",
      "Test different message variations with A/B testing",
      "Set up automated triggers based on prospect behavior",
    ],
  },
  {
    id: "campaign-builder-complete",
    target: "body",
    title: "🎉 Campaign Builder Tour Complete!",
    description:
      "You're ready to create powerful multi-channel campaigns that engage prospects and drive conversions! Use our automation tools to scale your outreach effectively.",
    icon: CheckCircle,
    position: "center",
    category: "features",
    tips: [
      "Start with proven templates and customize them",
      "Monitor campaign performance and optimize regularly",
      "Use personalization to increase engagement rates",
      "Save successful campaigns as templates for future use",
    ],
    nextAction: "Start building your first campaign!",
  },
];

// Settings page tour steps (main content only)
const settingsTourSteps: TourStep[] = [
  {
    id: "welcome-settings",
    target: "body",
    title: "Welcome to Platform Settings! ⚙️",
    description:
      "Configure your platform preferences, manage integrations, set up API connections, and customize notification settings. Make the platform work exactly how you need it to.",
    icon: Settings,
    position: "center",
    category: "utilities",
    tips: [
      "Connect your CRM for seamless data flow",
      "Set up API integrations for automation",
      "Configure notifications to stay informed without overwhelming your inbox",
    ],
  },
  {
    id: "settings-complete",
    target: "body",
    title: "🎉 Settings Tour Complete!",
    description:
      "Your platform is now configured to match your workflow! Integrations and settings help you work more efficiently and get better results from your AI-powered sales intelligence.",
    icon: CheckCircle,
    position: "center",
    category: "utilities",
    tips: [
      "Regularly review and update your integrations",
      "Test API connections to ensure data flows correctly",
      "Adjust notification preferences as your team grows",
      "Keep your profile information current for better collaboration",
    ],
    nextAction: "Explore platform integrations and customizations!",
  },
];

// Support page tour steps (main content only)
const supportTourSteps: TourStep[] = [
  {
    id: "welcome-support",
    target: "body",
    title: "Welcome to Support Center! 🎧",
    description:
      "Get help when you need it with our comprehensive support system. Submit tickets, track issue resolution, access our knowledge base, and connect with our expert team.",
    icon: HelpCircle,
    position: "center",
    category: "utilities",
    tips: [
      "Search the knowledge base first for quick answers",
      "Provide detailed information when submitting tickets",
      "Check ticket status for updates on your requests",
    ],
  },
  {
    id: "support-complete",
    target: "body",
    title: "🎉 Support Center Tour Complete!",
    description:
      "You now know how to get help whenever you need it! Our support team is here to ensure you succeed with the platform and achieve your sales intelligence goals.",
    icon: CheckCircle,
    position: "center",
    category: "utilities",
    tips: [
      "Use live chat for quick questions",
      "Submit detailed tickets for complex issues",
      "Check out video tutorials and guides",
      "Join our community for peer support and tips",
    ],
    nextAction: "Explore our knowledge base and resources!",
  },
];

// Default page tour (for pages without specific content)
const defaultPageTourSteps: TourStep[] = [
  {
    id: "welcome-page",
    target: "body",
    title: "Welcome to this Page! 👋",
    description:
      "This page provides specialized functionality within the Valasys AI Score platform. Explore the available features and tools to enhance your sales intelligence workflow.",
    icon: Sparkles,
    position: "center",
    category: "features",
    tips: [
      "Look for main content areas and interactive elements",
      "Use the navigation to explore other platform features",
      "Check out the help documentation for detailed guidance",
    ],
  },
  {
    id: "page-complete",
    target: "body",
    title: "🎉 Page Tour Complete!",
    description:
      "You've completed the tour for this page! Continue exploring the platform to discover more powerful features for your sales intelligence needs.",
    icon: CheckCircle,
    position: "center",
    category: "features",
    tips: [
      "Use the sidebar navigation to explore other features",
      "Return to the dashboard for an overview of your data",
      "Contact support if you need help with any features",
      "Check out the analytics page for performance insights",
    ],
    nextAction: "Continue exploring the platform!",
  },
];

interface PlatformTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function PlatformTour({
  isOpen,
  onClose,
  onComplete,
}: PlatformTourProps) {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(
    null,
  );
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightPosition, setHighlightPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);

  // UI animation states
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // small delay for entrance animation
      const id = window.setTimeout(() => setMounted(true), 20);
      return () => {
        window.clearTimeout(id);
        setMounted(false);
        setShowConfetti(false);
      };
    }
    setMounted(false);
    setShowConfetti(false);
  }, [isOpen]);

  // Determine which tour steps to use based on current page
  const getCurrentTourSteps = () => {
    switch (location.pathname) {
      case "/":
        return dashboardTourSteps;
      case "/build-vais":
        return buildVAISTourSteps;
      case "/analytics":
        return analyticsTourSteps;
      case "/find-prospect":
        return findProspectTourSteps;
      case "/abm-lal":
        return abmLALTourSteps;
      case "/my-downloads":
        return downloadTourSteps;
      case "/build-campaign":
        return buildCampaignTourSteps;
      case "/build-my-campaign":
        return []; // Disable tour on Build My Campaign page
      case "/settings":
        return settingsTourSteps;
      case "/support":
        return supportTourSteps;
      case "/faqs":
        return supportTourSteps; // Same tour as support
      default:
        return defaultPageTourSteps;
    }
  };

  const tourSteps = getCurrentTourSteps();
  const currentTourStep = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;
  const progress = Math.round(((currentStep + 1) / tourSteps.length) * 100);

  // Reset tour step when location changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [location.pathname, isOpen]);

  // Update highlight position during scroll (stable approach)
  useEffect(() => {
    if (!isOpen || !highlightedElement) return;

    let animationFrameId: number;

    const updateHighlightPosition = () => {
      const rect = highlightedElement.getBoundingClientRect();
      setHighlightPosition({
        top: rect.top - 4,
        left: rect.left - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      });

      animationFrameId = requestAnimationFrame(updateHighlightPosition);
    };

    animationFrameId = requestAnimationFrame(updateHighlightPosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isOpen, highlightedElement]);

  useEffect(() => {
    if (!isOpen) return;

    const updateHighlight = () => {
      const step = tourSteps[currentStep];

      // Handle ABM/LAL tab switching
      if (location.pathname === "/abm-lal") {
        const tryTabSwitch = (targetTab: string, retries = 3) => {
          const allTabs = Array.from(
            document.querySelectorAll('button[role="tab"]'),
          );
          const tab = allTabs.find((t) => {
            const text = t.textContent?.trim() || "";
            return (
              text.includes(targetTab) &&
              t.getAttribute("data-state") !== "active"
            );
          });

          if (tab) {
            console.log(`Found ${targetTab} tab, clicking`);
            (tab as HTMLElement).click();

            // Verify tab switch worked
            setTimeout(() => {
              const isActive = tab.getAttribute("data-state") === "active";
              if (!isActive && retries > 0) {
                console.log(
                  `${targetTab} tab switch failed, retrying... (${retries} attempts left)`,
                );
                tryTabSwitch(targetTab, retries - 1);
              } else if (isActive) {
                console.log(`${targetTab} tab successfully activated`);
                // Re-run highlight calculation now that the tab is active
                setTimeout(updateHighlight, 50);
              }
            }, 100);
          } else if (retries > 0) {
            console.log(
              `${targetTab} tab not found, retrying... (${retries} attempts left)`,
            );
            setTimeout(() => tryTabSwitch(targetTab, retries - 1), 200);
          } else {
            console.log(`${targetTab} tab not found after all retries`);
            console.log(
              "Available tabs:",
              allTabs.map((t) => ({
                text: t.textContent,
                state: t.getAttribute("data-state"),
              })),
            );
          }
        };

        if (step?.id?.toLowerCase().includes("lal")) {
          // Switch to LAL tab for any LAL-related step
          setTimeout(() => {
            console.log("Attempting to switch to LAL tab");
            tryTabSwitch("LAL");
          }, 200);
        } else if (step?.id === "abm-performance-insights") {
          // Switch to Insights tab
          setTimeout(() => {
            console.log("Attempting to switch to Insights tab");
            tryTabSwitch("Insights");
          }, 200);
        }
      }

      // Handle Build My Campaign tab switching
      if (location.pathname === "/build-my-campaign") {
        const clickTabByDataTour = (selector: string, retries = 3) => {
          const btn = document.querySelector(selector) as HTMLElement | null;
          if (btn) {
            btn.click();
            setTimeout(() => setTimeout(updateHighlight, 50), 100);
          } else if (retries > 0) {
            setTimeout(() => clickTabByDataTour(selector, retries - 1), 150);
          }
        };

        const id = step?.id || "";
        if (id.includes("campaign-requests")) {
          clickTabByDataTour("[data-tour='campaign-tab-requests']");
        } else if (id.includes("campaign-tab-requests")) {
          clickTabByDataTour("[data-tour='campaign-tab-requests']");
        } else if (id.includes("campaign-tab-track") || id.includes("track")) {
          clickTabByDataTour("[data-tour='campaign-tab-track']");
        } else if (
          id.includes("campaign-form") ||
          id.includes("campaign-tab-form")
        ) {
          clickTabByDataTour("[data-tour='campaign-tab-form']");
        }
      }

      if (step.target === "body") {
        setHighlightedElement(null);
        return;
      }

      // Prefer a visible element when multiple matches exist (mobile + desktop duplicates)
      const nodeList = Array.from(document.querySelectorAll(step.target));
      let element: Element | null = null;
      for (const el of nodeList) {
        // consider visible if it has client rects
        const rects = (el as HTMLElement).getClientRects();
        if (rects && rects.length > 0) {
          element = el;
          break;
        }
      }

      // fallback to first match
      if (!element && nodeList.length > 0) element = nodeList[0] || null;

      if (element) {
        setHighlightedElement(element);

        // Set initial highlight position
        const rect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        // Use viewport-relative positioning for stable highlighting
        setHighlightPosition({
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        });

        // Calculate tooltip position with viewport constraints
        // Using the same rect, scrollTop, and scrollLeft variables from above

        // Tooltip dimensions (estimated)
        const tooltipWidth = 384; // w-96 = 384px
        const tooltipHeight = 400; // estimated height
        const margin = 20;

        let top = 0;
        let left = 0;
        let actualPosition = step.position;

        // Calculate initial position
        switch (step.position) {
          case "top":
            top = rect.top + scrollTop - tooltipHeight - margin;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            break;
          case "bottom":
            top = rect.bottom + scrollTop + margin;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            break;
          case "left":
            top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
            left = rect.left + scrollLeft - tooltipWidth - margin;
            break;
          case "right":
            top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + scrollLeft + margin;
            break;
          case "center":
            top = window.innerHeight / 2 + scrollTop - tooltipHeight / 2;
            left = window.innerWidth / 2 + scrollLeft - tooltipWidth / 2;
            break;
        }

        // Viewport constraints
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxWidth = Math.min(tooltipWidth, viewportWidth * 0.9);

        // Adjust horizontal position to stay within viewport
        if (left < margin) {
          left = margin;
        } else if (left + maxWidth > viewportWidth - margin) {
          left = viewportWidth - maxWidth - margin;
        }

        // Adjust vertical position to stay within viewport
        if (top < scrollTop + margin) {
          // If tooltip would go above viewport, position it below the element
          if (step.position === "top") {
            top = rect.bottom + scrollTop + margin;
            actualPosition = "bottom";
          } else {
            top = scrollTop + margin;
          }
        } else if (top + tooltipHeight > scrollTop + viewportHeight - margin) {
          // If tooltip would go below viewport, position it above the element
          if (step.position === "bottom") {
            top = rect.top + scrollTop - tooltipHeight - margin;
            actualPosition = "top";
          } else {
            top = scrollTop + viewportHeight - tooltipHeight - margin;
          }
        }

        // For sidebar elements, prefer right positioning to avoid overflow
        if (step.category === "navigation" || step.category === "utilities") {
          const sidebarWidth = 256; // w-64 = 256px
          if (rect.left < sidebarWidth + 50) {
            // Element is in sidebar area
            left = Math.max(
              sidebarWidth + margin,
              rect.right + scrollLeft + margin,
            );
            actualPosition = "right";

            // Ensure it doesn't overflow right edge
            if (left + maxWidth > viewportWidth - margin) {
              left = viewportWidth - maxWidth - margin;
            }
          }
        }

        // Special positioning for ABM/LAL page elements
        if (location.pathname === "/abm-lal") {
          // For Quick Access section, ensure it stays centered and visible
          if (step.id === "abm-quick-access") {
            // Position above the element with safe margins
            top = rect.top + scrollTop - tooltipHeight - margin;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;

            // Ensure horizontal centering within viewport
            if (left < margin) {
              left = margin;
            } else if (left + tooltipWidth > viewportWidth - margin) {
              left = viewportWidth - tooltipWidth - margin;
            }

            // If not enough space above, position below
            if (top < scrollTop + margin) {
              top = rect.bottom + scrollTop + margin;
            }
          }

          // For tab content sections, ensure proper positioning
          if (
            step.id === "abm-verify-accounts" ||
            step.id === "abm-generate-lal" ||
            step.id === "abm-performance-insights"
          ) {
            // Position the tooltip to the right of the main content area
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            top = rect.top + scrollTop + margin;

            // Ensure it stays within viewport bounds
            if (left + tooltipWidth > viewportWidth - margin) {
              left = viewportWidth - tooltipWidth - margin;
            }
            if (left < margin) {
              left = margin;
            }
          }
        }

        setTooltipPosition({ top, left });

        // Scroll element into view with a small delay to prevent positioning conflicts
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 100);
      }
    };

    // Add a small delay to ensure DOM is ready and tabs are switched
    const timeoutId = setTimeout(updateHighlight, 500);

    const handleResize = () => {
      setTimeout(updateHighlight, 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentStep, isOpen]);

  const nextStep = () => {
    console.log(
      "nextStep called, isLastStep:",
      isLastStep,
      "currentStep:",
      currentStep,
    );
    if (isLastStep) {
      console.log("Completing tour with confetti");
      setShowConfetti(true);
      // show confetti briefly then complete tour
      setTimeout(() => {
        setShowConfetti(false);
        onComplete();
      }, 1400);
    } else {
      console.log("Moving to next step:", currentStep + 1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  if (!isOpen || tourSteps.length === 0) return null;

  const getTooltipClasses = () => {
    if (!currentTourStep || currentTourStep.position === "center") {
      return "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }

    // Use absolute positioning with viewport-aware positioning
    return "absolute";
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={(e) => {
          // Only skip tour if clicking on the overlay itself, not on child elements
          if (e.target === e.currentTarget) {
            skipTour();
          }
        }}
      >
        {/* Highlight cutout */}
        {highlightedElement && (
          <div
            className="fixed border-4 border-valasys-orange rounded-lg shadow-lg animate-pulse"
            style={{
              top: highlightPosition.top,
              left: highlightPosition.left,
              width: highlightPosition.width,
              height: highlightPosition.height,
              backgroundColor: "rgba(255, 106, 0, 0.1)",
              pointerEvents: "none",
              zIndex: 61,
            }}
          />
        )}
      </div>

      {/* Tour Tooltip */}
      <div
        ref={tooltipRef}
        className={`${getTooltipClasses()} z-[70]`}
        style={
          currentTourStep.position !== "center"
            ? {
                top: tooltipPosition.top,
                left: tooltipPosition.left,
              }
            : {}
        }
      >
        <Card className="w-96 max-w-[90vw] sm:max-w-[85vw] md:max-w-[400px] max-h-[75vh] shadow-2xl border-valasys-orange/20 bg-white/95 backdrop-blur-sm relative z-[71] pointer-events-auto overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Progress ring */}
                  <div className="relative w-10 h-10">
                    <svg viewBox="0 0 36 36" className="w-10 h-10">
                      <path
                        d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                        fill="none"
                        strokeWidth="3"
                        stroke="#E6E9EE"
                      />
                      <path
                        d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                        fill="none"
                        strokeWidth="3"
                        stroke="#FF6A00"
                        strokeLinecap="round"
                        strokeDasharray={`${progress} ${100 - progress}`}
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <currentTourStep.icon className="h-4 w-4 text-valasys-orange animate-pulse" />
                    </div>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg text-valasys-gray-900">
                    {currentTourStep.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {currentStep + 1} of {tourSteps.length}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-valasys-orange/10 text-valasys-orange border-valasys-orange/20"
                    >
                      {(() => {
                        switch (location.pathname) {
                          case "/":
                            return "Dashboard";
                          case "/build-vais":
                            return "VAIS Builder";
                          case "/analytics":
                            return "Analytics";
                          case "/find-prospect":
                            return "Find Prospect";
                          case "/abm-lal":
                            return "ABM/LAL";
                          case "/build-campaign":
                          case "/build-my-campaign":
                            return "Campaign Builder";
                          case "/settings":
                            return "Settings";
                          case "/support":
                          case "/faqs":
                            return "Support";
                          default:
                            return "Page Guide";
                        }
                      })()}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        currentTourStep.category === "navigation"
                          ? "bg-blue-100 text-blue-700"
                          : currentTourStep.category === "dashboard"
                            ? "bg-green-100 text-green-700"
                            : currentTourStep.category === "utilities"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {currentTourStep.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTour}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 max-h-[45vh] overflow-y-auto">
            <p className="text-valasys-gray-600 leading-relaxed">
              {currentTourStep.description}
            </p>

            {currentTourStep.tips && (
              <div className="bg-valasys-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-semibold text-valasys-gray-900 mb-2 flex items-center">
                  <Zap className="h-4 w-4 text-valasys-orange mr-1" />
                  Pro Tips:
                </h4>
                <ul className="space-y-1">
                  {currentTourStep.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-sm text-valasys-gray-600 flex items-start"
                    >
                      <span className="text-valasys-orange mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentTourStep.nextAction && (
              <div className="bg-valasys-orange/10 rounded-lg p-3 border border-valasys-orange/20">
                <p className="text-sm text-valasys-orange font-medium flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Next: {currentTourStep.nextAction}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-valasys-gray-100">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevStep();
                  }}
                  disabled={isFirstStep}
                  className="text-valasys-gray-600"
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    skipTour();
                  }}
                  className="text-valasys-gray-500"
                  type="button"
                >
                  Skip Tour
                </Button>
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log(
                    "Next button clicked, current step:",
                    currentStep,
                  );
                  nextStep();
                }}
                size="sm"
                className="bg-valasys-orange hover:bg-valasys-orange-light text-white cursor-pointer"
                type="button"
              >
                {isLastStep ? (
                  <>
                    Complete
                    <CheckCircle className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confetti celebration */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[80]">
          {Array.from({ length: 24 }).map((_, i) => {
            const colors = [
              "#FF6A00",
              "#F5A243",
              "#1A73E8",
              "#00C48C",
              "#FFD700",
            ];
            const left = Math.floor(Math.random() * 100);
            return (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  left: `${left}%`,
                  backgroundColor: colors[i % colors.length],
                  animationDelay: `${Math.random() * 0.6}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

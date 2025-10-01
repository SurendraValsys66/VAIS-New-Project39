import React, { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Plug,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Upload,
  Download,
  Settings2,
  Link2,
} from "lucide-react";

interface IntegrationState {
  connected: boolean;
  syncing: boolean;
  lastSync: string | null;
  twoWaySync: boolean;
  scopes: { leads: boolean; contacts: boolean; accounts: boolean };
}

const initialState: Record<string, IntegrationState> = {
  salesforce: {
    connected: false,
    syncing: false,
    lastSync: null,
    twoWaySync: true,
    scopes: { leads: true, contacts: true, accounts: false },
  },
  hubspot: {
    connected: false,
    syncing: false,
    lastSync: null,
    twoWaySync: false,
    scopes: { leads: true, contacts: true, accounts: true },
  },
};

export default function Integrations() {
  const [state, setState] = useState(initialState);
  const [autoSync, setAutoSync] = useState(true);
  const [syncFreq, setSyncFreq] = useState("15m");
  const [activeTestResult, setActiveTestResult] = useState<null | {
    vendor: string;
    ok: boolean;
    message: string;
  }>(null);

  const handleConnectToggle = async (vendor: "salesforce" | "hubspot") => {
    setState((prev) => ({
      ...prev,
      [vendor]: { ...prev[vendor], connected: !prev[vendor].connected },
    }));
  };

  const handleSyncNow = async (vendor: "salesforce" | "hubspot") => {
    setState((prev) => ({
      ...prev,
      [vendor]: { ...prev[vendor], syncing: true },
    }));
    await new Promise((r) => setTimeout(r, 1500));
    setState((prev) => ({
      ...prev,
      [vendor]: {
        ...prev[vendor],
        syncing: false,
        lastSync: new Date().toLocaleString(),
      },
    }));
  };

  const testConnection = async (vendor: "salesforce" | "hubspot") => {
    await new Promise((r) => setTimeout(r, 700));
    const ok = state[vendor].connected;
    setActiveTestResult({
      vendor,
      ok,
      message: ok
        ? "Connection is healthy. API reachable and credentials valid."
        : "Not connected. Please connect first to run tests.",
    });
  };

  const mappingRows = useMemo(
    () => [
      { field: "First Name", salesforce: "FirstName", hubspot: "firstname" },
      { field: "Last Name", salesforce: "LastName", hubspot: "lastname" },
      { field: "Email", salesforce: "Email", hubspot: "email" },
      { field: "Company", salesforce: "Account.Name", hubspot: "company" },
      { field: "Phone", salesforce: "Phone", hubspot: "phone" },
    ],
    [],
  );

  const IntegrationCard = ({
    vendor,
    title,
    description,
  }: {
    vendor: "salesforce" | "hubspot";
    title: string;
    description: string;
  }) => {
    const s = state[vendor];
    const isSF = vendor === "salesforce";

    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plug
                className={cn(
                  "w-4 h-4",
                  s.connected ? "text-green-600" : "text-gray-400",
                )}
              />
              {title}
              <Badge
                variant="secondary"
                className={cn(
                  "ml-2",
                  s.connected
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-gray-100 text-gray-700 border-gray-200",
                )}
              >
                {s.connected ? "Connected" : "Not Connected"}
              </Badge>
            </CardTitle>
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant={s.connected ? "outline" : "default"}
                className={cn(
                  s.connected
                    ? ""
                    : "bg-gradient-to-r from-valasys-orange to-orange-500",
                )}
                onClick={() => handleConnectToggle(vendor)}
              >
                {s.connected ? "Disconnect" : "Connect"}
              </Button>
              <Button variant="outline" onClick={() => testConnection(vendor)}>
                <Settings2 className="w-4 h-4 mr-2" /> Test Connection
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg border bg-white">
              <div className="text-xs text-gray-500">Last Sync</div>
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {s.lastSync ?? "—"}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white">
              <div className="text-xs text-gray-500">Sync Mode</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-700">Two-way</span>
                <Switch
                  checked={s.twoWaySync}
                  onCheckedChange={(v) =>
                    setState((p) => ({
                      ...p,
                      [vendor]: { ...p[vendor], twoWaySync: v },
                    }))
                  }
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {s.twoWaySync ? (
                  <span className="flex items-center gap-1">
                    <Upload className="w-3 h-3" />{" "}
                    <Download className="w-3 h-3" /> Both directions
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" /> Into platform only
                  </span>
                )}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white">
              <div className="text-xs text-gray-500">Scopes</div>
              <div className="space-y-2 mt-1">
                {(["leads", "contacts", "accounts"] as const).map((key) => (
                  <label
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="capitalize">{key}</span>
                    <Switch
                      checked={s.scopes[key]}
                      onCheckedChange={(v) =>
                        setState((p) => ({
                          ...p,
                          [vendor]: {
                            ...p[vendor],
                            scopes: { ...p[vendor].scopes, [key]: v },
                          },
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white">
              <div className="text-xs text-gray-500">Actions</div>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!s.connected || s.syncing}
                  onClick={() => handleSyncNow(vendor)}
                >
                  <RefreshCw
                    className={cn("w-4 h-4 mr-2", s.syncing && "animate-spin")}
                  />
                  {s.syncing ? "Syncing..." : "Sync Now"}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Link2 className="w-4 h-4 mr-2" />
                      Field Mapping
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Field Mapping — {title}</DialogTitle>
                      <DialogDescription>
                        Control how your data fields map between the platform
                        and {title}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Platform Field</TableHead>
                            <TableHead>Salesforce</TableHead>
                            <TableHead>HubSpot</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mappingRows.map((row) => (
                            <TableRow key={row.field}>
                              <TableCell className="font-medium">
                                {row.field}
                              </TableCell>
                              <TableCell>
                                <Input defaultValue={row.salesforce} />
                              </TableCell>
                              <TableCell>
                                <Input defaultValue={row.hubspot} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-valasys-orange hover:bg-valasys-orange/90">
                          Save Mapping
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Logs */}
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 text-sm font-medium">
              Recent Activity
            </div>
            <div className="divide-y">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    {i % 2 === 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>
                      {i % 2 === 0
                        ? "Sync completed"
                        : "1 record skipped (missing email)"}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
            <p className="text-sm text-gray-600 mt-1">
              Connect your CRM to sync leads, contacts, and accounts. We
              currently support Salesforce and HubSpot.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-gray-700">Auto Sync</span>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </label>
            <Select value={syncFreq} onValueChange={setSyncFreq}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5m">Every 5 minutes</SelectItem>
                <SelectItem value="15m">Every 15 minutes</SelectItem>
                <SelectItem value="1h">Hourly</SelectItem>
                <SelectItem value="1d">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ideas section (Tabs) */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b bg-white rounded-t-lg px-4 pt-3">
            <TabsList className="bg-transparent p-0 flex flex-wrap gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="connectors">Connectors</TabsTrigger>
              <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
              <TabsTrigger value="rules">Sync Rules</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-4 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Two-way sync with conflict handling (latest-write wins,
                    configurable).
                  </li>
                  <li>
                    Granular scopes per object: Leads, Contacts, Accounts.
                  </li>
                  <li>
                    Field mapping templates with validation and test runs.
                  </li>
                  <li>
                    Auto sync scheduler with manual "Sync Now" for quick pushes.
                  </li>
                  <li>Detailed activity logs with errors and retry options.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="connectors"
            className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <IntegrationCard
              vendor="salesforce"
              title="Salesforce"
              description="Connect Salesforce to sync Leads, Contacts, and Accounts with flexible field mappings."
            />
            <IntegrationCard
              vendor="hubspot"
              title="HubSpot"
              description="Connect HubSpot CRM to keep your marketing and sales data in sync."
            />
          </TabsContent>

          <TabsContent value="mapping" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Field Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform Field</TableHead>
                      <TableHead>Salesforce</TableHead>
                      <TableHead>HubSpot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mappingRows.map((row) => (
                      <TableRow key={row.field}>
                        <TableCell className="font-medium">
                          {row.field}
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={row.salesforce} />
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={row.hubspot} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button className="bg-valasys-orange hover:bg-valasys-orange/90">
                    Save Mapping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sync Rules</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>De-duplication Strategy</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Primary: Email</SelectItem>
                      <SelectItem value="email-phone">Email + Phone</SelectItem>
                      <SelectItem value="company">Account + Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>On Conflict</Label>
                  <Select defaultValue="latest">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest Write Wins</SelectItem>
                      <SelectItem value="crm">Prefer CRM</SelectItem>
                      <SelectItem value="platform">Prefer Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="py-3 flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {i % 3 === 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : i % 3 === 1 ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span>Processed batch #{1000 + i}</span>
                    </div>
                    <span className="text-gray-500">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Test connection result */}
        <Dialog
          open={!!activeTestResult}
          onOpenChange={() => setActiveTestResult(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Connection Test — {activeTestResult?.vendor}
              </DialogTitle>
              <DialogDescription>
                {activeTestResult?.ok
                  ? "Everything looks good!"
                  : "Please connect first then try again."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 text-sm">
              {activeTestResult?.ok ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{activeTestResult?.message}</span>
            </div>
            <DialogFooter>
              <Button onClick={() => setActiveTestResult(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

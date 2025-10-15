import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, CreditCard } from "lucide-react";

interface PaymentRow {
  id: string;
  transactionDate: string; // ISO or human readable
  invoiceId: string;
  paymentMethod: string; // e.g., Mastercard **** 1887
  type: string; // e.g., Subscription, Add-on
  currency: string; // e.g., USD
  invoiceAmount: number; // numeric amount
  serviceProvider: string; // e.g., Stripe
}

const rows: PaymentRow[] = [
  {
    id: "1",
    transactionDate: "2025-09-01 07:58 PM",
    invoiceId: "INV-2025-091-001",
    paymentMethod: "Mastercard **** 1887",
    type: "Subscription",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "Stripe",
  },
  {
    id: "2",
    transactionDate: "2025-08-01 08:03 PM",
    invoiceId: "INV-2025-081-002",
    paymentMethod: "Visa **** 4421",
    type: "Subscription",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "Stripe",
  },
  {
    id: "3",
    transactionDate: "2025-07-15 10:12 AM",
    invoiceId: "INV-2025-071-003",
    paymentMethod: "Amex **** 3012",
    type: "Add-on Credits",
    currency: "USD",
    invoiceAmount: 120,
    serviceProvider: "Stripe",
  },
  {
    id: "4",
    transactionDate: "2025-06-04 11:00 AM",
    invoiceId: "INV-2025-061-004",
    paymentMethod: "UPI **** 3289",
    type: "Subscription",
    currency: "INR",
    invoiceAmount: 5499,
    serviceProvider: "Razorpay",
  },
  {
    id: "5",
    transactionDate: "2025-05-02 05:34 PM",
    invoiceId: "INV-2025-051-005",
    paymentMethod: "PayPal john.doe@email.com",
    type: "Subscription",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "PayPal",
  },
  {
    id: "6",
    transactionDate: "2025-04-17 09:27 AM",
    invoiceId: "INV-2025-041-006",
    paymentMethod: "Visa **** 9301",
    type: "Add-on Credits",
    currency: "USD",
    invoiceAmount: 220,
    serviceProvider: "Stripe",
  },
  {
    id: "7",
    transactionDate: "2025-03-01 08:01 PM",
    invoiceId: "INV-2025-031-007",
    paymentMethod: "Mastercard **** 1887",
    type: "Subscription",
    currency: "USD",
    invoiceAmount: 660,
    serviceProvider: "Stripe",
  },
  {
    id: "8",
    transactionDate: "2025-02-14 01:43 PM",
    invoiceId: "INV-2025-021-008",
    paymentMethod: "NetBanking ICICI",
    type: "Add-on Credits",
    currency: "INR",
    invoiceAmount: 2999,
    serviceProvider: "Razorpay",
  },
];

function downloadInvoice(row: PaymentRow) {
  const lines = [
    "Invoice",
    "------------------------------",
    `Invoice ID: ${row.invoiceId}`,
    `Date: ${row.transactionDate}`,
    `Payment Method: ${row.paymentMethod}`,
    `Type: ${row.type}`,
    `Currency: ${row.currency}`,
    `Amount: ${row.invoiceAmount}`,
    `Service Provider: ${row.serviceProvider}`,
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${row.invoiceId}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Payments() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-valasys-gray-900 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-valasys-orange" /> Payments
            </h1>
            <p className="text-sm text-valasys-gray-600">
              View your recent transactions and download invoices.
            </p>
          </div>
        </div>

        <Card className="border border-valasys-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead>Transaction Date</TableHead>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead className="text-right">Invoice Amount</TableHead>
                    <TableHead>Service Provider</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-sm text-gray-700">
                        {row.transactionDate}
                      </TableCell>
                      <TableCell className="font-mono text-sm flex items-center gap-2">
                        <button
                          className="inline-flex items-center gap-1 text-valasys-orange hover:underline"
                          onClick={() => downloadInvoice(row)}
                          aria-label={`Download invoice ${row.invoiceId}`}
                        >
                          {row.invoiceId}
                          <Download className="w-4 h-4" />
                        </button>
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {row.paymentMethod}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {row.type}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {row.currency}
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900">
                        {row.currency === "USD"
                          ? `$${row.invoiceAmount.toLocaleString()}`
                          : `${row.invoiceAmount.toLocaleString()} ${row.currency}`}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {row.serviceProvider}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

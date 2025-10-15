import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Download } from "lucide-react";

export interface PaymentSuccessData {
  status: "Successful";
  date: string; // e.g., Aug 30, 2023 at 7:58PM
  methodBrand: "Mastercard" | "Visa" | "Amex" | string;
  last4: string;
  invoiceFileName?: string;
  invoiceContent?: string; // Plain text content to generate a downloadable file
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: PaymentSuccessData;
}

function formatInvoiceContent(d: PaymentSuccessData) {
  const lines = [
    "Invoice",
    "------------------------------",
    `Status: ${d.status}`,
    `Date: ${d.date}`,
    `Payment Method: ${d.methodBrand} **** ${d.last4}`,
  ];
  return lines.join("\n");
}

export const PaymentSuccessModal: React.FC<Props> = ({ open, onOpenChange, data }) => {
  const onDownload = React.useCallback(() => {
    const content = data.invoiceContent ?? formatInvoiceContent(data);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.invoiceFileName || `invoice-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <div className="mx-auto w-full">
          <div className="relative mx-auto w-full rounded-[28px] bg-white text-gray-900 shadow-2xl ring-1 ring-black/5">
            {/* Soft gradient background like the reference */}
            <div
              className="absolute inset-0 rounded-[28px] opacity-70"
              style={{
                background:
                  "radial-gradient(120% 80% at 20% 0%, rgba(249, 213, 180, 0.65) 0%, rgba(245, 226, 255, 0.55) 35%, rgba(255,255,255,0.9) 70%)",
                filter: "blur(0.3px)",
              }}
            />

            <div className="relative p-6 sm:p-8">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                <Check className="h-6 w-6" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Payment Successful !</h2>
                <p className="mt-2 text-sm text-gray-600">
                  We have received your membership request.
                </p>
              </div>

              <div className="my-5 h-px w-full bg-black/10" />

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="inline-flex items-center gap-2 font-medium text-emerald-600">
                    <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500" />
                    {data.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{data.date}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-500">Payment Method</div>
                  <div className="flex items-center gap-3 rounded-xl bg-indigo-50/80 p-3 ring-1 ring-indigo-100">
                    {/* Mastercard glyph */}
                    <div className="relative h-7 w-9">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#EB001B]" />
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#F79E1B] mix-blend-multiply" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-gray-900">{data.methodBrand}</div>
                      <div className="text-xs text-gray-600">Ending in {data.last4}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={onDownload}
                  className={cn(
                    "w-full rounded-xl bg-black text-white hover:bg-black/90",
                    "flex items-center justify-center gap-2 py-5 text-[15px] font-semibold"
                  )}
                >
                  Invoice Download
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;

import React from "react";

export default function OnboardingSplitLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative bg-white">
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-8 md:py-12">
          {left}
        </div>
      </div>
      <div className="relative hidden md:block">{right}</div>
    </div>
  );
}

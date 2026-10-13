import React from "react";
import { Bike } from "lucide-react";

export function FallbackComponent({ className }: { className?: string }) {
  return <Bike className={className || "size-5"} />;
}

"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useSearchParams } from "next/navigation";
import { DNSTabsData } from "@/constants/DNS";

export default function DNSTabs() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("domain");
  
  if (!search)
    return (
      <div className="text-center text-sm">
        Select a domain before proceeding further
      </div>
    );
  else
    return (
      <Tabs variant="underlined" aria-label="DNS Tabs">
        {DNSTabsData.map((i) => (
          <Tab key={i.key} title={i.title} className="text-base">
            <div className="text-sm mx-5">{i.children}</div>
          </Tab>
        ))}
      </Tabs>
    );
}

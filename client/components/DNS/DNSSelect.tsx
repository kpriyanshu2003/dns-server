"use client";

import Cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { AllDomainsBackendResponse } from "@/@types/Domain";
import { useRouter, useSearchParams } from "next/navigation";

export default function DomainSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("domain");

  const [isOpen, setIsOpen] = React.useState(false);
  const {
    items,
    isLoading,
  }: { items: AllDomainsBackendResponse[]; isLoading: boolean } = useDomainList(
    { fetchDelay: 1500 }
  );

  return (
    <Select
      className="w-full"
      isLoading={isLoading}
      aria-label="Select a domain"
      items={items}
      defaultSelectedKeys={[search || ""]}
      placeholder="Select a domain"
      selectionMode="single"
      onOpenChange={setIsOpen}
      onChange={(item) =>
        router.push(item.target.value ? `?domain=${item.target.value}` : "/dns")
      }
    >
      {(item) => <SelectItem key={item.name}>{item.name}</SelectItem>}
    </Select>
  );
}

export function useDomainList({ fetchDelay = 0 } = {}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDomains = async () => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      setIsLoading(true);

      if (fetchDelay > 0)
        await new Promise((resolve) => setTimeout(resolve, fetchDelay));
      const res = await fetch("http://localhost:3300/api/domain", {
        signal,
        headers: { Authorization: `Bearer ${Cookie.get("token")}` },
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();

      setItems(json.domains);
    } catch (error: any) {
      if (error.name === "AbortError") console.log("Fetch aborted");
      else console.error("There was an error with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDomains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, isLoading };
}

import React from "react";
import DomainsList from "@/components/Domains/DomainList";
import { DomainModalNewDomain } from "@/components/Domains/DomainModal";

function Domains() {
  return (
    <div>
      <div className="text-center text-2xl font-semibold uppercase flex items-center justify-between">
        <span>Domains</span>
        <DomainModalNewDomain />
      </div>
      <div className="mt-16 border rounded-lg p-4 bg-white">
        <span className="font-medium">
          NOTE: Some DNS providers don&apos;t support using SSL on the root
          domain (the version without SSL www)
        </span>
        <DomainsList />
      </div>
    </div>
  );
}

export default Domains;

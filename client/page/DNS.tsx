import React from "react";
import DNSTabs from "@/components/DNS/DNSTabs";
import DNSSelect from "@/components/DNS/DNSSelect";
import DNSTable from "@/components/DNS/DNSTable";

function DNS() {
  return (
    <div>
      <div className="text-2xl font-semibold uppercase">DNS Management</div>
      <div className="my-10">
        <DNSSelect />
      </div>
      <div>
        <DNSTabs />
      </div>
      <div className="my-3">
        <DNSTable />
      </div>
    </div>
  );
}

export default DNS;

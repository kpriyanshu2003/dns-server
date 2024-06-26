import React from "react";
import DNSTabs from "@/components/DNS/DNSTabs";
import DNSSelect from "@/components/DNS/DNSSelect";

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
    </div>
  );
}

export default DNS;

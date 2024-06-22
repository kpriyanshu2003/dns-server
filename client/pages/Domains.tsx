import React from "react";
import DomainModal from "@/components/Domains/Modal";

function Domains() {
  return (
    <div>
      <div className="text-center text-2xl font-semibold uppercase flex items-center justify-between">
        <span>Domains</span>
        <DomainModal />
      </div>
      <div className="mt-16 border rounded-lg p-4 bg-white">
        List Domains Here
      </div>
    </div>
  );
}

export default Domains;

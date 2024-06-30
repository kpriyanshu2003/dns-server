"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { resolveDNS } from "@/actions/resolve";

function Resolve() {
  const [input, setInput] = useState<string>("");
  const [records, setRecords] = useState([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return toast.error("Please enter a valid IP Address");
    resolveDNS(input)
      .then((res) => {
        setRecords(res.records);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="text-center text-2xl font-semibold uppercase flex items-center justify-between">
        Resolve
      </div>
      <form className="mt-16 flex items-center gap-3" onSubmit={handleSubmit}>
        <Input
          placeholder="x.x.x.x"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button color="primary" type="submit">
          Resolve
        </Button>
      </form>
      <div className="my-5">{JSON.stringify(records, null, 2)}</div>
    </>
  );
}

export default Resolve;

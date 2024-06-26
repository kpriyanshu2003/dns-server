"use client";

import { v4 as uuid } from "uuid";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import React from "react";
import { DNSRecordTypeData, TTLData } from "@/constants/DNS";

function DNSRecords() {
  const [formData, setFormData] = React.useState({
    type: "",
    name: "",
    value: "",
    ttl: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      type: "",
      name: "",
      value: "",
      ttl: "",
    });
  };

  return (
    <div>
      <div>
        DNS Records determine how your domain behaves, like showing your website
        content and delivering your email.
      </div>
      <div className="mt-10">
        <div className="font-semibold">New Records</div>
        <form
          className="bg-white p-6"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div>
            Select a record type from the dropdown menu to add a new record
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Select
              placeholder="Select a record type"
              label="Type"
              isRequired
              selectedKeys={[formData.type]}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              labelPlacement="outside"
            >
              {DNSRecordTypeData.map((i) => (
                <SelectItem key={i}>{i}</SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Name"
              isRequired
              labelPlacement="outside"
              placeholder="@ or www"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              type="text"
              label="Value"
              isRequired
              placeholder="xx.xx.xx.xx"
              labelPlacement="outside"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
            />
            <Select
              label="TTL"
              labelPlacement="outside"
              placeholder="Select TTL"
              isRequired
              selectedKeys={[formData.ttl]}
              onChange={(e) =>
                setFormData({ ...formData, ttl: e.target.value })
              }
            >
              {TTLData.map((i) => (
                <SelectItem key={i}>{i}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-end gap-2 items-center">
            <Button
              className="bg-black text-white"
              variant="solid"
              type="submit"
            >
              Save
            </Button>
            <Button color="danger" variant="flat" type="reset">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DNSRecords;

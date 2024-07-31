"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { getDNSRecordsByName } from "@/actions/dns";
import { DNSRecordEnum, IDNSRecord } from "@/@types/DNS";

const columns = [
  { key: "type", label: "Type" },
  { key: "name", label: "Name" },
  { key: "data", label: "Data" },
  { key: "ttl", label: "TTL" },
  { key: "priority", label: "Priority" },
];

function DNSTable() {
  const [dnsData, setDNSData] = useState<IDNSRecord[]>([
    {
      _id: "",
      name: "",
      type: DNSRecordEnum.None,
      data: "",
      ttl: 0,
      priority: 0,
    },
  ]);
  console.log(dnsData);
  const searchParams = useSearchParams();
  const search = searchParams?.get("domain");

  useEffect(() => {
    if (!search) return;
    getDNSRecordsByName(search)
      .then((res) => setDNSData(res.record))
      .catch((e) => console.error(e));
  }, [search]);

  if (search)
    return (
      <Table aria-label="DNS Records">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={dnsData}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {getKeyValue(item, columnKey ? columnKey : "")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  else return <div></div>;
}

export default DNSTable;

"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import api from ".";

export const getDNSRecords = async (domainId: string) => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/dns/dns/${domainId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["dnsRecords"] },
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    return await response.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e.message);
  }
};

export const createDNSRecord = async (domainId: string, data: any) => {
  try {
    if (!domainId) throw new Error("Domain ID is required");

    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/dns/dns/${domainId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    revalidateTag("dnsRecords");
    return await response.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e.message);
  }
};

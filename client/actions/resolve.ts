"use server";

import { cookies } from "next/headers";
import api from ".";

export const resolveDNS = async (ip: string) => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/dns/resolve?domain=${ip}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    return await response.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e.message);
  }
};

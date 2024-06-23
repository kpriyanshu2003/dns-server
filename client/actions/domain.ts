"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import api from ".";

export const getDomains = async () => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + "/dns/d", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["domainList"] },
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    return await response.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e.message);
  }
};

export const createDomain = async (name: string) => {
  try {
    if (!name) throw new Error("Name is required");

    const token = cookies().get("token")?.value;
    const response = await fetch(api + "/dns/d", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    revalidateTag("domainList");
    return await response.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e.message);
  }
};

export const deleteDomainById = async (id: string) => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/dns/d/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    revalidateTag("domainList");
    return await response.json();
  } catch (e: any) {
    console.error(e);
    throw new Error(e.message);
  }
};

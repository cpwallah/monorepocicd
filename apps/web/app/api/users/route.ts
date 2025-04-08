import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function Get() {
  const user = await client.user.findFirst();
  return NextResponse.json({ user });
}

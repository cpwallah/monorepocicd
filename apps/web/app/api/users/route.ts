import { NextResponse } from "next/server";
import { Prismaclient } from "@repo/db/client";

export async function Get() {
  const user = await Prismaclient.user.findFirst();
  return NextResponse.json({ user });
}

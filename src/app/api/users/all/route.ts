import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    connect();
    const response = await User.find();

    const nextResponse = NextResponse.json({ data: response });
    nextResponse.headers.set("Content-Type", "application/json");

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Ticket from "@/models/ticketModel";

export async function GET(request: NextRequest) {
  try {
    connect();
    const response = (await Ticket.find()).reverse();

    const nextResponse = NextResponse.json({ data: response });
    nextResponse.headers.set("Content-Type", "application/json");

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

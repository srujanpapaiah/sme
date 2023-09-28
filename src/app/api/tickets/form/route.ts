import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/models/ticketModel";

export async function POST(request: NextRequest) {
  try {
    connect();
    const reqBody = await request.json();

    const {
      creator,
      creatorId,
      department,
      subject,
      description,
      priority,
      date,
      studentName,
      studentEmail,
      studentPhone,
      courseEnrolled,
      courseInvoice,
    } = reqBody;

    const newTicket = new Ticket({
      creator,
      creatorId,
      department,
      subject,
      description,
      priority,
      date,
      studentName,
      studentEmail,
      studentPhone,
      courseEnrolled,
      courseInvoice,
      createdAt: new Date(),
    });

    const savedTicket = await newTicket.save();
    return NextResponse.json(
      { message: "Ticket Created Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

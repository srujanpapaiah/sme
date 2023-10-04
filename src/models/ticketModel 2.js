import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: [true, "Creator Name is required"],
  },
  creatorId: {
    type: String,
    required: [true, "Creator Id is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Priority is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  studentName: {
    type: String,
  },
  studentEmail: {
    type: String,
  },
  studentPhone: {
    type: Number,
  },
  courseEnrolled: {
    type: String,
  },
  courseInvoice: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  ticketStatus: {
    type: String,
    enum: ["open", "in review", "closed"],
    default: "open",
  },
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;

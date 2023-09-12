import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB Connection Error. Please make sure MongoDB is running. " +
          error
      );
    });
  } catch (error) {
    console.log("Something Went Wrong : ", error);
  }
}

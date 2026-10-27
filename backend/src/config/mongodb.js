import mongoose from "mongoose";
import env from "./environment.js";

const connect = async () => {
  try {
    await mongoose.connect(env.MONGOOSE_URL);
    console.log("connect successfully!");
  } catch (error) {
    console.log("connect failure");
    mongoose.disconnect();
    process.exit(1);
  }
};

export default connect;
//
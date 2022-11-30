import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("MongoDB is running smoothly!");
  } catch (err) {
    logger.error(`Error message: ${err}`);
    process.exit(1);
  }
}

export default connect;

import { Pool } from "pg";
import { envConfig } from "../config";

console.log(envConfig);
const pool = new Pool({
  user: envConfig.DB.user,
  host: envConfig.DB.host,
  database: envConfig.DB.database,
  password: envConfig.DB.password,
  port: envConfig.DB.port,
});

export default pool;

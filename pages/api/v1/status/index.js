import { Client } from "pg";
import database from "/infra/database.js";

export default async function status(request, response) {
  
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;")
  const dataBaseVersionValue = databaseVersionResult.rows[0].server_version

  const databasemaxConnectionsResult = await database.query("SHOW max_connections;")
  const databasemaxConnectionsValue = databasemaxConnectionsResult.rows[0].max_connections

  const getCurrentDataBaseConnections = await database.query("SELECT count(*) AS current_connections FROM pg_stat_activity WHERE state IN ('active', 'idle');")
  const currentDataBaseConnections = getCurrentDataBaseConnections.rows[0].current_connections
  


  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dataBaseVersionValue,
        max_connections: parseInt(databasemaxConnectionsValue),
        current_connections: parseInt(currentDataBaseConnections)
      }
    }
});



}

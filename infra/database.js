import { Client } from 'pg';

async function query(queryObject) {

    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.PGPASSWORD,
    });
  
    await client.connect();
    console.log(client.database)
    const result = await client.query(queryObject); 
    await client.end((err) => {
        if (err) {
          console.error('Erro ao fechar a conexão:', err);
          // Re-abrir a conexão, registrar erro, etc.
        } else {
          console.log('Conexão fechada com sucesso');
        }
      });
    return result;
}

export default {
    query: query,
};
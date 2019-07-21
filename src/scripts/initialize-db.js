const fs = require('fs');
const json = require('big-json');
const { Client } = require('pg');
const format = require('pg-format');

const readStream = fs.createReadStream('src/scripts/city.list.json');
const parseStream = json.createParseStream();

parseStream.on('data', async (pojo) => {
  const client = new Client({
    user: 'root',
    password: 'toor',
    database: 'postgres',
    host: 'weather-db'
  });
  const cities = [];
  for(let i in pojo) {
    cities.push([
      pojo[i].id,
      pojo[i].name,
      pojo[i].coord.lon,
      pojo[i].coord.lat,
    ])
  }
  await client.connect();
  await client.query(`
    DROP TABLE IF EXISTS cities;
  `);
  await client.query(`
    CREATE TABLE cities (
     id INT NOT NULL PRIMARY KEY,
     name VARCHAR (100),
     lng FLOAT,
     lat FLOAT
    );
  `);
  await client.query(
    format('INSERT INTO cities (id, name, lng, lat) VALUES %L', cities)
  );
  await client.end();
  console.log('Done');
});

readStream.pipe(parseStream);

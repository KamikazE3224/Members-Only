#! /usr/bin/env node
const { Client } = require("pg");
require('dotenv').config;

const SQL = `
CREATE TABLE clubhouse_members (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR (255),
  username VARCHAR (255),
  password VARCHAR (255),
  is_member BOOLEAN DEFAULT FALSE
);
CREATE TABLE messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    user_id INTEGER REFERENCES clubhouse_members(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

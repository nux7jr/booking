import fetch from 'node-fetch';
export default async function getContent () {
  
  // const url = `https://api.betting-api.com/1xbet/football/line/all?token=7f1d3664836d4fb1a295da5f9024771be7a441567eff414e8146533fe8c84665`;
  const url = `http://localhost:3000/data/data.json`;

  const response = await fetch(url);
  const data = await response.json();
  return data; 
}

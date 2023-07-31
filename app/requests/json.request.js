import fetch from 'node-fetch';
export default async function getContent (url) {
  const response = await fetch(url);
  const data = await response.json();
  return data; 
}

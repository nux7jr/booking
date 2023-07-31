import fetch from 'node-fetch';
export default async function get_defalut_content (url) {
  const response = await fetch(url);
  return response.text();
}

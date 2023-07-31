import { readFile } from 'fs/promises';

export default async function read_json (path) {
    return JSON.parse(await readFile(path, "utf8"));
}
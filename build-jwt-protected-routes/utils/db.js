import path from "path";
import fs from "fs";

const FILE = path.join(import.meta.dirname, "../data/users.json");

export const readUsers = () => {
  const data = fs.readFileSync(FILE, "utf8").trim();

  if (!data) return [];

  return JSON.parse(data);
};

export const writeUsers = (users) => {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(FILE, data);
}

export const findByEmail = (email) => {
    return readUsers().find((u) => u.email === email) || null;
}
export const findById = (id) => {
    return readUsers().find((u) => u.id === id) || null;
}
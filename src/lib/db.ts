import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface Feedback {
  id: string;
  projectId: string;
  rating: number;
  comment: string;
  createdAt: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  createdAt: string;
}

interface DB {
  projects: Project[];
  feedbacks: Feedback[];
}

const initialDB: DB = {
  projects: [],
  feedbacks: [],
};

export const getDB = (): DB => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
};

export const saveDB = (db: DB) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2));
};

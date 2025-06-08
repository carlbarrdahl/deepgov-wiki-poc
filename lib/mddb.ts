import { MarkdownDB } from "mddb";
import { MddbFile } from "mddb/dist/src/lib/schema";
import knex from "knex";

const DATABASE_URL = process.env.DATABASE_URL;
const config = {
  client: DATABASE_URL ? "pg" : "better-sqlite3",
  connection: DATABASE_URL || {
    filename: "markdown.db",
  },
};
const client = new MarkdownDB(config).init();

const db = knex(config);

export async function getFiles() {
  const mddb = await client;
  return mddb.getFiles({
    frontmatter: {},
  }) as Promise<(MddbFile & { metadata: Frontmatter })[]>;
}

export async function getFile(slug: string) {
  const mddb = await client;

  return await mddb.getFileByUrl(slug);
}

export async function searchFiles(keyword: string) {
  const results = await db("files")
    .select("*")
    .whereLike("metadata", `%${keyword}%`);

  return results.map((r) => ({ ...r, metadata: JSON.parse(r.metadata) }));
}

export default client;

export type Frontmatter = {
  title: string;
  tagline: string;
  image: string;
  category: string;
  subcategory: string;
  location: string;
  status: string;
  start_date: string;
  completion_date: string;
  total_cost: string;
  funding_secured: string;
  funding_gap: string;
  beneficiaries: string;
  impact_metrics: string[];
  sustainability: string;
  scalability: string;
  open_source: string;
  technologies: string[];
  partners: string[];
  contact: string;
  website: string;
  karma_gap_id: string;
  oso_id: string;
  gainforest_id: string;
};

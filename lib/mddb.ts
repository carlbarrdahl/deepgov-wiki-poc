import { MarkdownDB } from "mddb";
import { MddbFile } from "mddb/dist/src/lib/schema";
import { join } from "path";

const config = {
  client: "sqlite3",
  connection: {
    filename: join(process.cwd(), "markdown.db"),
  },
};
const client = new MarkdownDB(config);

export async function getFiles() {
  const mddb = await client.init();

  return mddb.getFiles({
    frontmatter: {},
  }) as Promise<(MddbFile & { metadata: Frontmatter })[]>;
}

export async function getFile(slug: string) {
  const mddb = await client;

  return await mddb.getFileByUrl(slug);
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

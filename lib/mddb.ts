import { MarkdownDB } from "mddb";
import { MddbFile } from "mddb/dist/src/lib/schema";

const client = new MarkdownDB({
  client: "better-sqlite3",
  connection: {
    filename: "markdown.db",
  },
}).init();

export async function getFiles() {
  const mddb = await client;
  return mddb.getFiles({
    frontmatter: {
      draft: false,
    },
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

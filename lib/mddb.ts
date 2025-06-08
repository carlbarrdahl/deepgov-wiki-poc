import { MarkdownDB } from "mddb";

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
  });
}

export async function getFile(slug: string) {
  const mddb = await client;

  return await mddb.getFileByUrl(slug);
}

export default client;

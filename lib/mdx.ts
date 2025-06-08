"use server";

import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Frontmatter } from "./mddb";

export async function loadFile(slug: string) {
  const filePath = path.join(process.cwd(), "wiki", slug + ".mdx");
  return compileMDX<Frontmatter>({
    source: fs.readFileSync(filePath, "utf8"),
    options: { parseFrontmatter: true },
  });
}

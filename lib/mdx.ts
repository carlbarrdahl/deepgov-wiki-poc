"use server";

import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Frontmatter } from "./mddb";
import { citePlugin } from "@benrbray/remark-cite";
import remarkGfm from "remark-gfm";

const bibliography = fs.readFileSync("references.bib", "utf8");

export async function loadFile(slug: string) {
  const filePath = path.join(process.cwd(), "wiki", slug + ".mdx");
  return compileMDX<Frontmatter>({
    source: fs.readFileSync(filePath, "utf8"),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [
            citePlugin,
            {
              // TODO: Why is this not working?
              bibliography,
              style: "apa",
              linkCitations: true,
              syntax: {
                // see micromark-extension-cite
                enableAltSyntax: false,
                enablePandocSyntax: true,
              },
              toMarkdown: {
                // see mdast-util-cite
                standardizeAltSyntax: false,
                enableAuthorSuppression: true,
                useNodeValue: false,
              },
              showTooltips: true,
              tooltipAttribute: "data-tooltip",
            },
          ],
        ],
      },
    },
  });
}

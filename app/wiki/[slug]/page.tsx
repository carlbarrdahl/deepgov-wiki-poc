import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BackgroundImage } from "@/components/background-image";

export default async function WikiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { content, frontmatter } = await loadFile((await params).slug);
    return (
      <div>
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-4">
          <article className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
              <Button icon={Pencil} variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <p className="text-xl">{frontmatter.tagline}</p>

            <div className="prose">{content}</div>
          </article>
          <aside className="w-full lg:w-72 p-4 border rounded">
            <BackgroundImage className="h-48" src={frontmatter.image} />
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(frontmatter, null, 2)}
            </pre>
          </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The requested wiki page could not be found.
        </p>
      </div>
    );
  }
}

async function loadFile(slug: string) {
  const filePath = path.join(process.cwd(), "wiki", slug + ".mdx");
  return compileMDX<Frontmatter>({
    source: fs.readFileSync(filePath, "utf8"),
    options: { parseFrontmatter: true },
  });
}

type Frontmatter = {
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

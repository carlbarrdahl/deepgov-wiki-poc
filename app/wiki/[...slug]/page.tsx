import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WikiSidebar } from "./sidebar";
import { loadFile } from "@/lib/mdx";
import Link from "next/link";
import { History } from "@/components/features/wiki/history";

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER;
const REPO = process.env.NEXT_PUBLIC_GITHUB_REPO;

export default async function WikiPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  try {
    const [slug, activeTab = "content"] = (await params).slug;
    const { content, frontmatter } = await loadFile(slug);
    return (
      <div>
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <article className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${OWNER}/${REPO}/edit/main/wiki/${slug}.mdx`}
              >
                <Button icon={Pencil} variant="ghost" size="sm">
                  Edit
                </Button>
              </a>
            </div>
            <p className="text-xl">{frontmatter.tagline}</p>

            <Tabs defaultValue={activeTab} className="w-full">
              <TabsList>
                <TabsTrigger asChild value="content">
                  <Link href={`/wiki/${slug}`}>📄 Content</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="history">
                  <Link href={`/wiki/${slug}/history`}>🕒 History</Link>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-4">
                <div className="prose">{content}</div>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <History slug={slug} />
              </TabsContent>
            </Tabs>
          </article>
          <aside className="w-full lg:w-72">
            <WikiSidebar {...frontmatter} />
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

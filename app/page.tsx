import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getFiles } from "@/lib/mddb";

export default async function Home({}) {
  const files = await getFiles();

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {files.map((project) => (
          <Link href={`/wiki/${project.url_path}`} key={project.url_path}>
            <Card key={project.url_path} className="hover:bg-muted">
              <CardContent>
                <h3 className="font-semibold truncate">{project.title}</h3>
                <p>{project.metadata?.location}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

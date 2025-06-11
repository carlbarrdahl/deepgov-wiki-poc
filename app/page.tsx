import Link from "next/link";
import { MapPin } from "lucide-react";
import { getFiles } from "@/lib/mddb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundImage } from "@/components/background-image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search = "" } = await searchParams;
  const files = await getFiles();

  return (
    <div>
      <div className="space-y-4 gap-2 grid grid-cols-2">
        {files.map((project) => {
          const { title, image, description, location, category, open_source } =
            project.metadata;
          return (
            <Link href={`/wiki/${project.url_path}`} key={project.url_path}>
              <Card
                key={project.id}
                className="hover:bg-muted transition-colors py-0 shadow-none"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <BackgroundImage
                      src={image}
                      className="size-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {location}
                        </div>
                        <Badge variant="secondary">{category}</Badge>
                        {open_source === "Yes" && <Badge>Open Source</Badge>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

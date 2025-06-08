import { GitCommit } from "lucide-react";

import { getCommitHistory } from "@/app/actions/github";

export async function History({ slug }: { slug: string }) {
  const result = await getCommitHistory(`wiki/${slug}.mdx`);

  if ("error" in result) {
    return <div className="text-red-500">Error: {result.error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <GitCommit className="w-5 h-5" />
        History
      </h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Author
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Message
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Commit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {result.commits.map((commit) => (
              <tr key={commit.hash} className="hover:bg-muted/50">
                <td className="px-4 py-2 text-sm">
                  {commit.date
                    ? new Date(commit.date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm">
                  {commit.author || "Unknown"}
                </td>
                <td className="px-4 py-2 text-sm">{commit.message}</td>
                <td className="px-4 py-2 text-sm">
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {commit.hash.slice(0, 7)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

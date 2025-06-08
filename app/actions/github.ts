"use server";

import { Octokit } from "octokit";

const octokit = new Octokit();

export type CommitHistory = {
  hash: string;
  author: string | null;
  date: string | null;
  message: string;
  url: string;
};

export async function getCommitHistory(
  path: string
): Promise<{ commits: CommitHistory[] } | { error: string }> {
  try {
    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

    if (!path) {
      return { error: "File path is required" };
    }

    if (!owner || !repo) {
      return { error: "GitHub configuration is missing" };
    }

    // Ensure the path is within the wiki directory
    if (!path.startsWith("wiki/")) {
      return { error: "Invalid file path" };
    }
    console.log([owner, repo, path].join("/"));
    // Get commit history for the file
    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      path,
      per_page: 100, // Adjust as needed
    });

    // Format the response
    const formattedCommits = commits.map((commit) => ({
      hash: commit.sha,
      author: commit.commit.author?.name ?? null,
      date: commit.commit.author?.date ?? null,
      message: commit.commit.message,
      url: commit.html_url,
    }));

    return { commits: formattedCommits };
  } catch (error) {
    console.error("Error fetching file history:", error);
    return { error: "Failed to fetch file history" };
  }
}

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { RequestRow } from "@/lib/types";

const dataDirectory = path.join(process.cwd(), ".data");
const requestsFile = path.join(dataDirectory, "requests.json");

async function readLocalRequests() {
  try {
    const file = await readFile(requestsFile, "utf8");
    return JSON.parse(file) as RequestRow[];
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeLocalRequests(requests: RequestRow[]) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(requestsFile, JSON.stringify(requests, null, 2), "utf8");
}

export async function listLocalRequests() {
  const requests = await readLocalRequests();
  return requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function saveLocalRequest(request: Omit<RequestRow, "id" | "created_at" | "admin_memo" | "assigned_craftsman_id">) {
  const requests = await readLocalRequests();
  const savedRequest: RequestRow = {
    ...request,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    admin_memo: null,
    assigned_craftsman_id: null,
  };

  requests.unshift(savedRequest);
  await writeLocalRequests(requests);
  return savedRequest;
}

import { civitai } from "@/lib/civitai";

interface JobResult {
  blobUrl: string;
  blobUrlExpirationDate: string;
}

interface Job {
  result: JobResult;
}

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  try {
    const response = await civitai.jobs.getByToken(token);

    const jobs = response.jobs || [];
    const result = jobs.map((job: Job) => ({
      imageUrl: job.result.blobUrl,
      imageUrlExpirationDate: job.result.blobUrlExpirationDate,
    }));

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

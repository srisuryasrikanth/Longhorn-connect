import JobBoardClient from "@/components/job-board-client";
import { getJobBoardData } from "@/lib/services/jobs";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const data = await getJobBoardData();

  return <JobBoardClient jobs={data.jobs} alumniOptions={data.alumniOptions} />;
}
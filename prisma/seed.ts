import { seedAlumniProfiles } from "../lib/data/alumni-seed";
import { seedJobPostings } from "../lib/data/job-seed";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.jobPosting.deleteMany();
  await prisma.starAward.deleteMany();
  await prisma.alumni.deleteMany();

  for (const profile of seedAlumniProfiles) {
    await prisma.alumni.create({
      data: profile
    });
  }

  const alumniBySlug = new Map(
    (await prisma.alumni.findMany({
      select: {
        id: true,
        slug: true,
        company: true,
        email: true
      }
    })).map((record) => [record.slug, record])
  );

  for (const job of seedJobPostings) {
    const alumni = alumniBySlug.get(job.alumniSlug);

    if (!alumni) {
      throw new Error(`Missing alumni record for job seed slug ${job.alumniSlug}`);
    }

    await prisma.jobPosting.create({
      data: {
        alumniId: alumni.id,
        title: job.title,
        company: alumni.company,
        location: job.location,
        employmentType: job.employmentType,
        workMode: job.workMode,
        description: job.description,
        applyUrl: job.applyUrl,
        applyEmail: alumni.email
      }
    });
  }

  console.log(`Seeded ${seedAlumniProfiles.length} fictional alumni profiles and ${seedJobPostings.length} job postings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
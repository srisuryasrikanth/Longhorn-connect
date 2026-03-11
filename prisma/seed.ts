import { prisma } from "../lib/prisma";
import { seedAlumniProfiles } from "../lib/data/alumni-seed";

async function main() {
  await prisma.starAward.deleteMany();
  await prisma.alumni.deleteMany();

  for (const profile of seedAlumniProfiles) {
    await prisma.alumni.create({
      data: profile
    });
  }

  console.log(`Seeded ${seedAlumniProfiles.length} fictional alumni profiles.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
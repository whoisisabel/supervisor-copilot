import { sql } from "./index";
import { generateTranscript } from "./transcriptGenerator";

async function seed() {
  console.log("Seeding database with sessions + transcripts...");

  await sql`DELETE FROM session_analysis`;
  await sql`DELETE FROM sessions`;

  for (let i = 0; i < 10; i++) {
    await sql`
  INSERT INTO sessions (fellow_name, group_id, transcript, date, status)
  VALUES (
    ${`Fellow ${i + 1}`},
    ${`Group-${i + 1}`},
    ${generateTranscript()},
    NOW() - (${i} * INTERVAL '1 day'),
    'UNPROCESSED'
  )
`;
  }

  console.log("Seed complete");
}

seed().catch(console.error);

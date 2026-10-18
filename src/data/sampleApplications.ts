import type { Application } from "@/src/types/application";

// This temporary data lets us design and test the application table.
// It will be removed after the Add Application form becomes functional.
export const sampleApplications: Application[] = [
  {
    id: "sample-1",
    university: "Kyushu University",
    country: "Japan",
    program: "International Graduate Program in Agricultural Science",
    scholarship: "MEXT University Recommendation",
    supervisor: "",
    deadline: "2026-12-11",
    status: "Preparing",
    priority: "High",
    applicationUrl:
      "https://ag.kyushu-u.ac.jp/international_exchange/how_to_apply/index.html",
    programUrl:
      "https://ag.kyushu-u.ac.jp/international_exchange/how_to_apply/index.html",
    notes: "Check the final scholarship requirements.",
    createdAt: "2026-10-19T00:00:00.000Z",
    updatedAt: "2026-10-19T00:00:00.000Z",
  },
  {
    id: "sample-2",
    university: "Kobe University",
    country: "Japan",
    program: "Global Graduate Program for Agricultural Science",
    scholarship: "Funding options need confirmation",
    supervisor: "",
    deadline: "2026-11-04",
    status: "Preparing",
    priority: "High",
    applicationUrl:
      "https://www.ans.kobe-u.ac.jp/english/nougakubu/admin.html",
    programUrl:
      "https://www.ans.kobe-u.ac.jp/english/nougakubu/admin.html",
    notes: "Confirm the scholarship route before applying.",
    createdAt: "2026-10-19T00:00:00.000Z",
    updatedAt: "2026-10-19T00:00:00.000Z",
  },
  {
    id: "sample-3",
    university: "Hokkaido University",
    country: "Japan",
    program: "International Graduate Program in Life Science",
    scholarship: "MEXT University Recommendation",
    supervisor: "",
    deadline: null,
    status: "Researching",
    priority: "Medium",
    applicationUrl:
      "https://altair.sci.hokudai.ac.jp/grad/igpoverview/info.php?id=705",
    programUrl:
      "https://altair.sci.hokudai.ac.jp/grad/igpoverview/",
    notes: "Contact the laboratory to confirm the internal deadline.",
    createdAt: "2026-10-19T00:00:00.000Z",
    updatedAt: "2026-10-19T00:00:00.000Z",
  },
];
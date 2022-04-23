import client from "@utils/graphClient";
import { PageIterator } from "@microsoft/microsoft-graph-client";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";

async function fetchAssignments() {
  const response = await client
    .api(
      "/education/me/assignments?$expand=submissions&$orderby=dueDateTime desc&$top=1000"
    )
    .get();

  const assignments: EducationAssignment[] = [];

  const iterator = new PageIterator(client, response, (data) =>
    Boolean(assignments.push(data))
  );

  await iterator.iterate();

  return assignments;
}

export default fetchAssignments;

import client from "@utils/graphClient";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";

async function getAssignment(
  classId: string,
  id: string
): Promise<EducationAssignment> {
  const assignment = await client
    .api(`/education/classes/${classId}/assignments/${id}?$expand=*`)
    .get();
  console.log(assignment); // debug
  return assignment;
}

export default getAssignment;

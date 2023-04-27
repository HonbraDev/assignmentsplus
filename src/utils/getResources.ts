import client from "@utils/graphClient";

import { PageIterator } from "@microsoft/microsoft-graph-client";

import type { EducationAssignmentResource } from "@microsoft/microsoft-graph-types";

async function getResources(
  classId: string,
  id: string
): Promise<EducationAssignmentResource[]> {
  const response = await client
    .api(`/education/classes/${classId}/assignments/${id}/resources`)
    .get();

  const resources: EducationAssignmentResource[] = [];

  const iterator = new PageIterator(client, response, (data) =>
    Boolean(resources.push(data))
  );

  await iterator.iterate();

  console.log(resources);

  return resources;
}

export default getResources;

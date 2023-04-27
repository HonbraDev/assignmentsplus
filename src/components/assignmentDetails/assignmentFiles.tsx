import AssignmentSection from "./assignmentSection";

import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import type {
  EducationAssignmentResource
} from "@microsoft/microsoft-graph-types";

function AssignmentFiles({
  resources,
}: {
  resources: EducationAssignmentResource[];
}) {
  return (
    <AssignmentSection title="Resources">
      <Grid container>
        <Grid item xs={6}>
          <List>
            {resources.map((resource) => (
              <AssignmentFile resource={resource} key={resource.id} />
            ))}
          </List>
        </Grid>
      </Grid>
    </AssignmentSection>
  );
}

function AssignmentFile({
  resource,
}: {
  resource: EducationAssignmentResource;
}) {
  let href: string | null = null;
  /* switch ((resource.resource! as Record<string, string>)["@odata.type"]) {
    case "#microsoft.graph.educationLinkResource":
      EducationLinkResource;
      break;
    case "#microsoft.graph.educationFileResource":
      EducationFileResource;
      break;
  } */
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ borderRadius: 1 }}>
        <ListItemText primary={resource.resource!.displayName!} />
      </ListItemButton>
    </ListItem>
  );
}

// educationWordResource #microsoft.graph.educationWordResource
// educationLinkResource #microsoft.graph.educationLinkResource
// educationExcelResource #microsoft.graph.educationExcelResource
// educationPowerPointResource #microsoft.graph.educationPowerPointResource
// educationFileResource #microsoft.graph.educationFileResource
// educationMediaResource #microsoft.graph.educationMediaResource

export default AssignmentFiles;

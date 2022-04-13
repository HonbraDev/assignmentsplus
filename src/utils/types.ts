import { AssignmentTurnedIn as AssignmentTurnedInIcon } from "@mui/icons-material";

import type { EducationSubmissionStatus } from "@microsoft/microsoft-graph-types";

export type AssignmentFilter = "working" | "submitted";

export type AssignmentListItem = {
  list: AssignmentFilter;
  id: string;
  classId: string;
  displayName: string;
  dueDateInt: number;
  dueDateString: string;
  returnedDateInt?: number;
  status: EducationSubmissionStatus;
  submitted: boolean;
  returned: boolean;
  reassigned: boolean;
  tags: {
    label: string;
    icon: typeof AssignmentTurnedInIcon;
  }[];
  showTags: boolean;
  submittedDateInt?: number;
};

export type CurrentAssignment = {
  id: string;
  classId: string;
};

import { AssignmentTurnedIn as AssignmentTurnedInIcon } from "@mui/icons-material";

import type { EducationSubmissionStatus } from "@microsoft/microsoft-graph-types";

export type AssignmentFilter = "working" | "submitted";

export interface AssignmentListItem {
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
  url: string;
}

export interface CurrentAssignment {
  id: string;
  classId: string;
}

export interface AssignmentTabProps {
  label: string;
  value: AssignmentFilter;
  icon: React.ReactElement;
}

export type AssignmentList = Record<AssignmentFilter, AssignmentListItem[]>;

export type AssignmentFilter =
  | "working"
  | "submitted"
  | "returned"
  | "released"
  | "reassigned";

export type AssignmentListItem = {
  id: string;
  classId: string;
  displayName: string;
  dateString: string;
};

export type CurrentAssignment = {
  id: string;
  classId: string;
};

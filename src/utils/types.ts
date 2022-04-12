export type AssignmentFilter = "working" | "submitted";

export type AssignmentListItem = {
  id: string;
  classId: string;
  displayName: string;
  dateString: string;
  due: number;
  submitted?: number;
  returned?: boolean;
  reassigned?: boolean;
  status: string;
};

export type CurrentAssignment = {
  id: string;
  classId: string;
};

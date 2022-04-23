import {
  RunningWithErrorsOutlined as RunningWithErrorsIcon,
  ReplyOutlined as ReplyIcon,
} from "@mui/icons-material";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";
import type { AssignmentListItem } from "@utils/types";

function parseAssignment(
  assignment: EducationAssignment
): AssignmentListItem | void {
  const list = getList(assignment);
  if (!list) return;

  // get statuses
  const status = assignment.submissions![0].status!;
  const submitted = ["submitted", "returned"].includes(
    assignment.submissions![0].status!
  );
  const returned = assignment.submissions![0].status === "returned";
  const reassigned = assignment.submissions![0].status === "reassigned";

  // get dates
  const dueDateInt = Date.parse(assignment.dueDateTime!);
  const dueDateString = new Date(dueDateInt).toLocaleDateString();
  const submittedDateInt = submitted
    ? Date.parse(assignment.submissions![0].submittedDateTime!)
    : undefined;
  const returnedDateInt = returned
    ? Date.parse(assignment.submissions![0].returnedDateTime!)
    : undefined;

  // get tags
  const tags: AssignmentListItem["tags"] = [];
  if (!submitted && Date.now() > dueDateInt)
    tags.push({
      label: "Past due",
      icon: RunningWithErrorsIcon,
    });
  if (status === "reassigned")
    tags.push({
      label: "Reassigned",
      icon: ReplyIcon,
    });
  else if (returned)
    tags.push({
      label: "Returned",
      icon: ReplyIcon,
    });

  const showTags = tags.length > 0;

  return {
    list,
    id: assignment.id!,
    classId: assignment.classId!,
    displayName: assignment.displayName!,
    dueDateInt,
    dueDateString,
    returnedDateInt,
    status,
    submitted,
    returned,
    reassigned,
    tags,
    showTags,
    submittedDateInt,
    url: assignment.webUrl!,
  };
}

export default parseAssignment;

function getList(assignment: EducationAssignment) {
  switch (assignment.submissions![0].status!) {
    case "working":
    case "reassigned":
      return "working";
    case "submitted":
    case "returned":
      return "submitted";
    default:
      return;
  }
}

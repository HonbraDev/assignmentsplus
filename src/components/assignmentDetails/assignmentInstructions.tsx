import AssignmentSection from "./assignmentSection";

import type { ItemBody } from "@microsoft/microsoft-graph-types";

function AssignmentInstructions({ instructions }: { instructions: ItemBody }) {
  return (
    <AssignmentSection title="Instructions" text>
      {instructions.contentType === "html" ? (
        <span
          dangerouslySetInnerHTML={{
            __html: instructions.content!,
          }}
        ></span>
      ) : (
        instructions.content!
      )}
    </AssignmentSection>
  );
}

export default AssignmentInstructions;

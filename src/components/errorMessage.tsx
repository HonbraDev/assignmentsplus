import { Link } from "@mui/material";
import { useState } from "react";

import type { TypographyProps } from "@mui/material";

function ErrorMessage({ variant }: { variant?: TypographyProps["variant"] }) {
  const [errorMessage] = useState(getErrorMessage());

  return (
    <Link href={errorMessage.url} variant={variant} target="_blank">
      {errorMessage.label}
    </Link>
  );
}

interface ErrorMessageType {
  label: string;
  url: string;
}

const errorMessages: ErrorMessageType[] = [
  {
    label: "How did this happen?",
    url: "https://youtu.be/NsQIGKwdTD8",
  },
  {
    label: "Dinkleberg!",
    url: "https://youtu.be/ts5af0aFcuw",
  },
];

function getErrorMessage() {
  const randomIndex = Math.floor(Math.random() * errorMessages.length);
  return errorMessages[randomIndex];
}

export default ErrorMessage;

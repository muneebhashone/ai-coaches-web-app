"use client"; // Error components must be Client Components

import React, { useEffect } from "react";

export default function ProgramsError({
  pageError,
  reset,
}: {
  pageError: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(pageError);
  }, [pageError]);

  return (
    <div>
      <h2>Something went wrong fetching programs!</h2>
      <button
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

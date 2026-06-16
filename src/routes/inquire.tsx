import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/inquire")({
  loader: () => {
    throw redirect({ to: "/", hash: "inquire" });
  },
});

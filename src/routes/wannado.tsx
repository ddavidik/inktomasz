import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wannado")({
  loader: () => {
    throw redirect({ to: "/", hash: "wannado" });
  },
});

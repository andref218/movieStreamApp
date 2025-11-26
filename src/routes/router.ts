import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen.ts";
import NotFoundPage from "@/components/NotFoundPage";

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

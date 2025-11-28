import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import NotFoundPage from "@/components/NotFoundPage";
import Header from "@/components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      {/* Icon from Tanstack Router to help understand the routes*/}
      <TanStackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error }) => (
    <div>
      <Header />
      <div className="container">Something wrong happened. {error.message}</div>
    </div>
  ),
});

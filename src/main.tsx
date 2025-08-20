import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyPlaylist from "./pages/MyPlaylist";
import MyAlbum from "./pages/MyAlbum/MyAlbum.tsx";
import PrivatePage from "./auth/PrivatePage.tsx";
import DashboardMusicsAnterior from "./pages/DashboardMusicsAnterior/DashboardMusicsAnterior.tsx";
import { SongPlayerProvider } from "./contexts/contextSong/SongPlayerProvider.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      {
        path: "/dashboard",
        element: <PrivatePage Component={<Dashboard />} />,
      },
      {
        path: "/album/:titleAlbum/:albumId",
        element: <PrivatePage Component={<MyAlbum />} />,
      },
      {
        path: "/playlist",
        element: <PrivatePage Component={<MyPlaylist />} />,
      },
      {
        path: "/dashboarded",
        element: <PrivatePage Component={<DashboardMusicsAnterior />} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SongPlayerProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SongPlayerProvider>
  </StrictMode>
);

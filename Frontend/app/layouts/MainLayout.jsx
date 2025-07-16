import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const queryClient = new QueryClient();

export default function MainLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

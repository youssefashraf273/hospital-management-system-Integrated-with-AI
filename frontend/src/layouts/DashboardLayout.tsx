import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SidebarContainer from "../components/ui/SidebarContainer";

const DashboardLayout = () => {
  return (
    <div
      className="rounded-md flex flex-col md:flex-row bg-gray-100 min-h-svh
       dark:bg-neutral-800 w-full flex-1"
    >
      {" "}
      <SidebarContainer />
      <div className="container w-full flex flex-col gap-5  mx-auto md:py-10">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

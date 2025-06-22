import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { SidebarBody, SidebarLink } from "./Sidebar";

// import logo from "../assets/logo.jpg";

import SidebarDropdown from "./SidebarDropdown";
import { navDropDowns, navGeneralLinks } from "../../config/navLinks";
import { HeartPulse } from "lucide-react";
import { useAuthCtx } from "@/context/authContext";
// import { useAuthCtx } from "@/context/authContext";

const SidebarContainer = () => {
  const [open, setOpen] = useState(false);
  const [openedDropdown, setOpenedDropdown] = useState("");

  const { user } = useAuthCtx();

  return (
    <div className="sidebar">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between rounded-2xl m-6 text-white top-6  gap-10 bg-primary shadow-xl p-5 md:sticky h-[calc(100vh-50px)] ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden gap-4">
            <>
              <div className="flex justify-center items-center">
                <HeartPulse className="size-28" />
              </div>
            </>
            <div className="mt-8 flex flex-col gap-2">
              {navGeneralLinks.map((link, idx) => {
                if (link.role && link.role !== user?.role) return null;

                return (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className="text-2xl font-semibold border-b-2 mb-0 capitalize"
                  />
                );
              })}
            </div>

            {navDropDowns.map((dropdown) => {
              if (dropdown.role && dropdown.role !== user?.role) return null;

              return (
                <SidebarDropdown
                  key={dropdown.name}
                  name={dropdown.name}
                  openedDropdown={openedDropdown}
                  setIsShown={setOpenedDropdown}
                  className="text-2xl whitespace-pre font-semibold text-white "
                  title={dropdown.title}
                  Icon={dropdown.icon}
                >
                  <div className="mt-2 flex flex-col gap-1">
                    {dropdown.links.map((link, idx) => {
                      return (
                        <SidebarLink
                          key={idx}
                          link={link}
                          className="text-2xl font-semibold capitalize"
                        />
                      );
                    })}
                  </div>
                </SidebarDropdown>
              );
            })}
          </div>
          <div className="p-2 mb-5 flex justify-center flex-col ">
            {/* <div className="flex gap-2 items-center">
              <div className="bg-black/15 rounded-full flex size-9 justify-center items-center">
                <FaUser className="size-5" />
              </div>
              <p className="text-lg font-semibold text-slate-600">اهلا,</p>
              <span className="font-bold">{user?.name}</span>
            </div> */}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};

export default SidebarContainer;

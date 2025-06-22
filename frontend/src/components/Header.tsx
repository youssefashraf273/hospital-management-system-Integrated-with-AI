import { BellRing, LucideInfo, Search, SettingsIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useAuthCtx } from "@/context/authContext";

const Header = () => {
  const { user } = useAuthCtx();
  return (
    <div className="flex items-center mt-7 justify-between">
      <div className="relative h-10 bg-white rounded-r-md">
        <Input
          className="min-w-lg h-full p-3 py-4 pr-11 rounded-r-md"
          placeholder="Search for..."
        />
        <div className="absolute top-0 w-10 flex items-center justify-center rounded-r-md h-full right-0 bg-gray-300">
          <Search className="cursor-pointer" />
        </div>
      </div>
      <div className="flex text-sm items-center gap-2">
        <LucideInfo className="text-sky-800 mr-5 cursor-pointer" />
        <BellRing fill="#000" className="size-5 mt-1 mr-1" />
        <div className="flex flex-col">
          <span className="font-bold">{(user && user.FullName) || user?.name}</span>
          <span className="text-xs">
            {user?.role === "user" ? "Patient" : user?.role} Profile
          </span>
        </div>
        <div className="size-10 rounded-full overflow-hidden p-2 bg-white">
          <img src="/vite.svg" className="w-full object-cover " />
        </div>
        <SettingsIcon className="size-5" />
      </div>
    </div>
  );
};

export default Header;

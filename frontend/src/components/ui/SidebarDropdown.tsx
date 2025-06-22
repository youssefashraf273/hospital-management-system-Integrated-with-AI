import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";

type Props = {
  children: React.ReactNode;
  title: string;
  className: string;
  openedDropdown: string;
  setIsShown: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  Icon: React.ReactElement;
};

const SidebarDropdown = ({
  children,
  className,
  title,
  Icon,
  openedDropdown,
  setIsShown,
  name,
}: Props) => {
  const isShown = openedDropdown === name;

  const toggleDropdownHandler = () => {
    setIsShown((prevState) => (prevState === name ? "" : name));
  };

  return (
    <div
      // style={{ direction: "rtl" }}
      className={`text-white ${className} ${
        isShown ? "border-r-4 pr-1" : ""
      } border-white`}
    >
      <div
        onClick={toggleDropdownHandler}
        className="flex justify-between items-center pr-1 cursor-pointer group/dropdown"
      >
        <div className="flex items-center gap-2">
          {Icon}
          <p className=" text-xl group-hover/dropdown:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
            {title}
          </p>
        </div>
        <ChevronDown
          className={`size-7 transition duration-300 ${
            isShown ? "rotate-0" : "rotate-90"
          }`}
        />
      </div>
      <AnimatePresence>
        {isShown && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: isShown ? "auto" : 0,
              //   scaleY: isShown ? 1 : 0.8,
            }}
            exit={{ height: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
              duration: 0.8,
            }}
            // layout
            className="overflow-hidden mr-4 "
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-2">
        <Separator />
      </div>
    </div>
  );
};

export default SidebarDropdown;

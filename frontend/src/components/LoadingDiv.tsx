import { Loader2 } from "lucide-react";

const LoadingDiv = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Loader2 className="animate-spin text-slate-600 size-[100px] md:size-[150px]" />
      <h2 className="text-xl md:text-3xl text-slate-600 font-bold">Loading...</h2>
    </div>
  );
};

export default LoadingDiv;

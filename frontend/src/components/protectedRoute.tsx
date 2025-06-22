import LoadingDiv from "@/components/LoadingDiv";
import { useAuthCtx } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthCtx();
  if (isLoading) {
    return (
      <div className="flex justify-center -mt-[10%] items-center h-svh">
        <LoadingDiv />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

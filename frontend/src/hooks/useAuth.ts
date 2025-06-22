import { useMutation, useQuery } from "@tanstack/react-query";
// import { UserResponse } from "../types";
import { checkAuthStatus, loginRequest, registerRequest } from "@/services/auth";
import { toast } from "sonner";
import { AuthCheckResponse, RegisterResponse } from "@/types";
import { RegisterFormValues } from "@/pages/RegisterPage";
import { AxiosError } from "axios";
export const useAuthCheck = (checkAuth = false) => {
  const {
    data: user,
    isLoading: isAuthCheckLoading,
    error: authCheckError,
  } = useQuery<AuthCheckResponse, Error>({
    queryKey: ["authStatus"],
    queryFn: checkAuthStatus,
    enabled: checkAuth,
    retry: 1,
  });

  return { user, isAuthCheckLoading, authCheckError };
};

//   return { user, isAuthCheckLoading, authCheckError };
// };

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      toast.info("Welcome back!");
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const message = "Login failed";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterFormValues>({
    mutationFn: registerRequest,
    onSuccess: () => {
      toast.info("You have successfully registered", {
        description: "Redirecting...",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });
};

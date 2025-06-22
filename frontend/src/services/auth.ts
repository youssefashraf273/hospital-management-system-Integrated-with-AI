import { authAxios } from "@/lib/authAxios";
import { LoginFormSchema } from "@/pages/LoginPage";
import { RegisterFormValues } from "@/pages/RegisterPage";
import { AuthCheckResponse, LoginResponse, RegisterResponse } from "@/types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const loginRequest = async (body: LoginFormSchema): Promise<LoginResponse> => {
  const response = await axios.post(`${baseUrl}/login`, body);

  const { token, ["user data"]: user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

export const checkAuthStatus = async (): Promise<AuthCheckResponse> => {
  try {
    const response = await authAxios.get("/profile");

    return {
      user: response.data.data, //
      message: response.data.message,
      //   role: response.data.role,
    };
  } catch (error: unknown) {
    // Check if it's an AxiosError
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || "Unauthorized";
      throw new Error(message);
    }

    throw new Error("An unknown error occurred");
  }
};

export const registerRequest = async (
  body: RegisterFormValues
): Promise<RegisterResponse> => {
  const response = await axios.post(`${baseUrl}/register`, body);

  const { token, user } = response.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

import { Link, Outlet } from "react-router-dom";
import loginPageImg from "../assets/loginPage.png";
import logo from "../assets/logo.png";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side with image - hidden on small mobile */}
      <div className="hidden md:flex md:w-1/2 bg-sky-50 relative flex-col items-center justify-center p-8">
        <div className="max-w-md mx-auto">
          {/* <Link to="/" className="text-4xl font-bold text-teal-600 mb-8 block">
            Corvida
          </Link> */}
          <img src={logo} className="object-contain w-[230px] h-auto -my-20" />
          <div className="relative w-full aspect-square max-w-lg mx-auto -my-[5rem]">
            <img
              src={loginPageImg}
              alt="Healthcare professionals team"
              className="object-contain"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Healthcare Professionals Portal
            </h2>
            <p className="mt-2 text-gray-600">
              Secure access to patient records, schedules, and healthcare resources
            </p>
          </div>
        </div>
      </div>

      {/* Right side with auth forms */}
      <div className="flex flex-1 md:w-1/2 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Small logo for mobile only */}
          <div className="md:hidden mb-8">
            <img src={logo} className="mx-auto object-contain w-[230px] h-auto -my-15" />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import loginImg from "../../assets/login.jpg"

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12" style={{backgroundImage: `url(${loginImg})`}} >
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-300">
            Welcome to Web Shopping
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background bg-[url('../src/assets/login.jpg')] md:bg-gradient-to-r md:from-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

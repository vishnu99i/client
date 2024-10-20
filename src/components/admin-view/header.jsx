import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b bg-gradient-to-r from-black to-slate-900 z-10 w-[100vw] md:w-[80vw] fixed">
      {/* <div className="fixed"> */}
      {/* <div className="absolute"> */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow hover:scale-105 ease-in-out duration-300 border bg-black text-slate-200 mr-3"
        >
          <LogOut />
          Logout
        </Button>
      </div>
      {/* </div> */}
      {/* </div> */}
    </header>
  );
}

export default AdminHeader;

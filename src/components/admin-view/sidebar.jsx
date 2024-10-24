import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  ShieldCheck
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2 fixed top-20">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-md sm:text-xl items-center gap-2 rounded-md px-3 py-2 hover:scale-105 ease-in-out duration-300 text-slate-100 hover:bg-slate-900 bg-slate-950"
        >
          {menuItem.icon}
          <span className="text-slate-300 font-bold">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetContent side="left" className="w-auto bg-transparent border-transparent">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ShieldCheck size={30} className="text-slate-300 hover:scale-105 ease-in-out duration-300 text-md"/>
                <h1 className="text-md font-bold hover:scale-105 ease-in-out duration-300 text-slate-300">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r p-6 lg:flex bg-gradient-to-r from-blackto-slate-950 border-slate-700">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="fixed">
          <div className="relatiive">
          <ShieldCheck size={30} className="text-slate-300 hover:scale-105 ease-in-out duration-300 absolute top-5"/>
          <h1 className="text-2xl font-bold hover:scale-105 ease-in-out duration-300 text-slate-300 absolute left-10">Admin Panel</h1>
          </div>
          </div>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
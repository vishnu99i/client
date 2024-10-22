import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Shirt } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (


        <Label
          onClick={() => {
            handleNavigate(menuItem)
          }}
          className="text-xl font-bold cursor-pointer hover:translate-x-1 sm:hover:translate-x-0 hover:scale-110 ease-in-out duration-300"
          key={menuItem.id}> 
          {menuItem.label}
        </Label>


      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative hover:scale-105 ease-in-out duration-300 text-slate-100 bg-slate-900 hover:bg-slate-300 pt-2"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-2px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black hover:scale-110 ease-in-out duration-300 text-2xl">
            <AvatarFallback className="bg-slate-950 text-white font-extrabold border border-slate-500">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-auto bg-black text-slate-300">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);




  ///////////////////////////////////////////

  const [open,setOpen] = useState(false);
  
  //MenuItems
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

  //HeaderRightContent
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);
  
    function handleNavigate(getCurrentMenuItem) {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
          ? {
              category: [getCurrentMenuItem.id],
            }
          : null;
  
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
          )
        : navigate(getCurrentMenuItem.path);
    }
  
  
  

  //////////////////////////////////////////

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-gradient-to-r from-black to-slate-900 text-slate-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <Shirt className="h-6 w-6 hover:scale-125 ease-in-out duration-300"/> {/* <HousePlug className="h-6 w-6" /> */}
          <span className="font-bold text-2xl hover:scale-105 ease-in-out duration-300">WebShopping</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-slate-900" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-xs w-auto bg-transparent text-slate-100 border-none font-mono">
            

            {/*  */}
            {/* <MenuItems/> */}
            <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-5 sm:gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
  
  
          <Label
            onClick={() => {
              handleNavigate(menuItem)
              setOpen(false)
            }}
            className="text-xl font-bold cursor-pointer hover:translate-x-1 sm:hover:translate-x-0 hover:scale-110 ease-in-out duration-300"
            key={menuItem.id}> 
            {menuItem.label}
          </Label>
  
  
        ))}
      </nav>
            {/*  */}

{/*  */}
            {/* <HeaderRightContent /> */}
            <div className="flex lg:items-center lg:flex-row flex-col gap-5 mt-7">
      <Sheet open={openCartSheet} onOpenChange={() => {
        setOpenCartSheet(false)
        setOpen(false)}}>
        <Button
          onClick={() => {
            setOpenCartSheet(true)
          }}
          variant="outline"
          size="icon"
          className="relative hover:scale-105 ease-in-out duration-300 text-slate-100 bg-slate-900 hover:bg-slate-300 pt-2"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-2px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          setOpen={setOpen}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black hover:scale-110 ease-in-out duration-300 text-2xl">
            <AvatarFallback className="bg-slate-950 text-white font-extrabold border border-slate-500">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-auto bg-black text-slate-300">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            navigate("/shop/account")
            setOpen(false)
          }}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
{/*  */}

          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;






// import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Shirt } from "lucide-react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { shoppingViewHeaderMenuItems } from "@/config";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Label } from "../ui/label";


// function MenuItems() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   function handleNavigate(getCurrentMenuItem) {
//     sessionStorage.removeItem("filters");
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" &&
//       getCurrentMenuItem.id !== "products" &&
//       getCurrentMenuItem.id !== "search"
//         ? {
//             category: [getCurrentMenuItem.id],
//           }
//         : null;

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));

//     location.pathname.includes("listing") && currentFilter !== null
//       ? setSearchParams(
//           new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
//         )
//       : navigate(getCurrentMenuItem.path);
//   }

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderMenuItems.map((menuItem) => (


//         <Label
//           onClick={() => {
//             handleNavigate(menuItem)
//           }}
//           className="text-xl font-bold cursor-pointer hover:translate-x-1 sm:hover:translate-x-0 hover:scale-110 ease-in-out duration-300"
//           key={menuItem.id}>
//           {menuItem.label}  
//         </Label>


//       ))}
//     </nav>
//   );
// }

// function HeaderRightContent() {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);



//   const [openCartSheet, setOpenCartSheet] = useState(false);



//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   function handleLogout() {
//     dispatch(logoutUser());
//   }

//   useEffect(() => {
//     dispatch(fetchCartItems(user?.id));
//   }, [dispatch]);

//   console.log(cartItems);

//   return (
//     <div className="flex lg:items-center lg:flex-row flex-col gap-4">
//       <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
//         <Button
//           onClick={() => setOpenCartSheet(true)}
//           variant="outline"
//           size="icon"
//           className="relative hover:scale-105 ease-in-out duration-300 text-slate-100 bg-slate-900 hover:bg-slate-300 pt-2"
//         >
//           <ShoppingCart className="w-6 h-6" />
//           <span className="absolute top-[-2px] right-[2px] font-bold text-sm">
//             {cartItems?.items?.length || 0}
//           </span>
//           <span className="sr-only">User cart</span>
//         </Button>
//         <UserCartWrapper
//           setOpenCartSheet={setOpenCartSheet}
//           cartItems={
//             cartItems && cartItems.items && cartItems.items.length > 0
//               ? cartItems.items
//               : []
//           }
//         />
//       </Sheet>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="bg-black hover:scale-110 ease-in-out duration-300 text-2xl">
//             <AvatarFallback className="bg-slate-950 text-white font-extrabold border border-slate-500">
//               {user?.userName[0].toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" className="w-auto bg-black text-slate-300">
//           <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => navigate("/shop/account")}>
//             <UserCog className="mr-2 h-4 w-4" />
//             Account
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={handleLogout}>
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// function ShoppingHeader() {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-black to-slate-900 text-slate-300">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <Link to="/shop/home" className="flex items-center gap-2">
//           <Shirt className="h-6 w-6 hover:scale-125 ease-in-out duration-300"/> {/* <HousePlug className="h-6 w-6" /> */}
//           <span className="font-bold text-2xl hover:scale-105 ease-in-out duration-300">WebShopping</span>
//         </Link>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-6 w-6 text-slate-900" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="max-w-xs w-auto bg-transparent text-slate-100 border-none font-mono">
//             <MenuItems/>
//             <HeaderRightContent />
//           </SheetContent>
//         </Sheet>
//         <div className="hidden lg:block">
//           <MenuItems />
//         </div>

//         <div className="hidden lg:block">
//           <HeaderRightContent />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default ShoppingHeader;









///////////////////////////////////////////////////////////
// import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Shirt } from "lucide-react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { shoppingViewHeaderMenuItems } from "@/config";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Label } from "../ui/label";

// function MenuItems() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   function handleNavigate(getCurrentMenuItem) {
//     sessionStorage.removeItem("filters");
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" &&
//       getCurrentMenuItem.id !== "products" &&
//       getCurrentMenuItem.id !== "search"
//         ? {
//             category: [getCurrentMenuItem.id],
//           }
//         : null;

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));

//     location.pathname.includes("listing") && currentFilter !== null
//       ? setSearchParams(
//           new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
//         )
//       : navigate(getCurrentMenuItem.path);
//   }

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderMenuItems.map((menuItem) => (
//         <Label
//           onClick={() => handleNavigate(menuItem)}
//           className="text-xl font-bold cursor-pointer hover:translate-x-10 md:hover:translate-x-0 hover:scale-125 ease-in-out duration-300"
//           key={menuItem.id}
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//     </nav>
//   );
// }

// function HeaderRightContent() {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   function handleLogout() {
//     dispatch(logoutUser());
//   }

//   useEffect(() => {
//     dispatch(fetchCartItems(user?.id));
//   }, [dispatch]);

//   console.log(cartItems);

//   return (
//     <div className="flex lg:items-center lg:flex-row flex-col gap-4">
//       <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
//         <Button
//           onClick={() => setOpenCartSheet(true)}
//           variant="outline"
//           size="icon"
//           className="relative hover:scale-105 ease-in-out duration-300 text-slate-950 hover:bg-slate-300"
//         >
//           <ShoppingCart className="w-6 h-6" />
//           <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
//             {cartItems?.items?.length || 0}
//           </span>
//           <span className="sr-only">User cart</span>
//         </Button>
//         <UserCartWrapper
//           setOpenCartSheet={setOpenCartSheet}
//           cartItems={
//             cartItems && cartItems.items && cartItems.items.length > 0
//               ? cartItems.items
//               : []
//           }
//         />
//       </Sheet>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="bg-black hover:scale-110 ease-in-out duration-300">
//             <AvatarFallback className="bg-black text-white font-extrabold border">
//               {user?.userName[0].toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" className="w-auto bg-black text-slate-300">
//           <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => navigate("/shop/account")}>
//             <UserCog className="mr-2 h-4 w-4" />
//             Account
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={handleLogout}>
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// function ShoppingHeader() {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-black to-slate-900 text-slate-300">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <Link to="/shop/home" className="flex items-center gap-2">
//           <Shirt className="h-6 w-6 hover:scale-125 ease-in-out duration-300"/> {/* <HousePlug className="h-6 w-6" /> */}
//           <span className="font-bold text-2xl hover:scale-105 ease-in-out duration-300">WebShopping</span>
//         </Link>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="max-w-xs w-auto bg-gradient-to-r from-black to-slate-900 text-slate-400 border-none font-mono">
//             <MenuItems />
//             <HeaderRightContent />
//           </SheetContent>
//         </Sheet>
//         <div className="hidden lg:block">
//           <MenuItems />
//         </div>

//         <div className="hidden lg:block">
//           <HeaderRightContent />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default ShoppingHeader;
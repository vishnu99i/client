import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet, setOpen }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="w-auto sm:max-w-md bg-gradient-to-r from-black to-slate-900 text-slate-300 font-mono border-none">
      <SheetHeader>
        <SheetTitle className="text-slate-300 hover:scale-105 ease-in-out duration-300">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold hover:scale-105 ease-in-out duration-300">Total</span>
          <span className="font-bold hover:scale-105 ease-in-out duration-300">₹{totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
          setOpen(false);
        }}
        className="w-full mt-6 hover:scale-95 ease-in-out duration-300 border border-slate-500"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
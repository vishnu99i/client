import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="w-[90vw] sm:max-w-[600px] bg-gradient-to-r from-black to-slate-900 h-[95vh] font-mono rounded-lg sm:3xl">
      <div className="grid gap-3">
        <div className="grid gap-1 sm:gap-2">
          <div className="flex mt-3 items-center justify-between bg-slate-900 rounded-lg pl-3">
            <p className="font-medium text-slate-300">Order ID</p>
            <Label className="text-blue-600 text-[12px] sm:text-md">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 rounded-lg pl-3">
            <p className="font-medium text-slate-300">Order Date</p>
            <Label className="text-orange-600">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 rounded-lg pl-3">
            <p className="font-medium text-slate-300">Order Price</p>
            <Label className="text-green-600">₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 rounded-lg pl-3">
            <p className="font-medium text-slate-300">Payment method</p>
            <Label className="text-blue-600">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 rounded-lg pl-3">
            <p className="font-medium text-slate-300">Payment Status</p>
            <Label className="text-orange-600">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 rounded-lg pl-3">
            <p className="font-medium text-blue-500">Order Status</p>
            <Label>
              <Badge
                className={`pt-2 pb-3 px-3 hover:scale-95 hover:bg-slate-950 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 text-slate-300">
          <div className="grid gap-2">
            <div className="font-medium text-green-600">Order Details</div>
            <ul className="grid gap-3 bg-slate-900 rounded-lg pl-5">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-start sm:items-center flex-col sm:flex-row justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span className="text-green-600">Price: ₹{item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-green-600">Shipping Info</div>
            <div className="grid gap-0.5 text-slate-200 bg-slate-900 pl-3 rounded-lg">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
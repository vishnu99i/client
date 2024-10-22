import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-scroll bg-gradient-to-r from-black to-slate-900 rounded-xl">
      <div className="grid gap-6">
        <div className="grid gap-1 sm:gap-2">
          <div className="flex mt-6 items-center justify-between bg-slate-900 pl-1 rounded-lg">
            <p className="font-medium text-slate-300">Order ID</p>
            <Label className="text-blue-600">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 pl-1 rounded-lg">
            <p className="font-medium text-slate-300">Order Date</p>
            <Label className="text-slate-300">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 pl-1 rounded-lg">
            <p className="font-medium text-slate-300">Order Price</p>
            <Label className="text-green-500">₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 pl-1 rounded-lg">
            <p className="font-medium text-slate-300">Payment method</p>
            <Label className="text-orange-500">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between bg-slate-900 pl-1 rounded-lg">
            <p className="font-medium text-slate-300">Payment Status</p>
            <Label className="text-slate-300">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-slate-300">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 pb-2 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
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
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-slate-300">Order Details</div>
            <ul className="grid gap-3 bg-slate-900 pl-1 rounded-lg">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex flex-col sm:flex-row items-center justify-between text-slate-300">
                      <span>Title: {item.title}</span>
                      <span className="text-orange-500">Quantity: {item.quantity}</span>
                      <span className="text-green-600">Price: ₹{item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-slate-300">Shipping Info</div>
            <div className="grid gap-0.5 text-slate-300 bg-slate-900 pl-2 rounded-lg py-3">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
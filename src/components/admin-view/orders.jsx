import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="bg-inherit border-black w-[90vw] md:w-[80vw]">
      <CardHeader>
        <CardTitle className="hover:scale-105 hover:translate-x-5 ease-in-out duration-300 text-slate-300">All Orders</CardTitle>
        <h3 className="text-orange-500 animate-pulse sm:hidden">To see more details scroll from left to right</h3>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-scroll">
          <TableHeader>
            <TableRow>
              <TableHead className="hover:scale-105 ease-in-out duration-300 text-slate-300 font-bold">Order ID</TableHead>
              <TableHead className="hover:scale-105 ease-in-out duration-300 text-slate-300 font-bold">Order Date</TableHead>
              <TableHead className="hover:scale-105 ease-in-out duration-300 text-slate-300 font-bold">Order Price</TableHead>
              <TableHead className="hover:scale-105 ease-in-out duration-300 text-slate-300 font-bold text-center">Order Status</TableHead>
              
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-slate-300">
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell className="text-blue-500">{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>₹{orderItem?.totalAmount}</TableCell>

                    <TableCell>
                      <Badge
                        className={`py-2 px-3 hover:scale-105 border-slate-500 ease-in-out duration-300 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                          className="hover:scale-105 ease-in-out duration-300 text-[10px] break-words sm:text-sm whitespace-normal border bg-slate-950"
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;

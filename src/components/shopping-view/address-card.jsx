import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4 text-slate-300 bg-gradient-to-r from-black to-slate-900 border rounded-lg">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between bg-gradient-to-r from-black to-slate-900 border rounded-lg">
        <Button onClick={() => handleEditAddress(addressInfo)} className="border border-slate-300 bg-green-700 hover:bg-green-500 ease-in-out duratiion-300 hover:scale-105">Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} className="border border-slate-300 bg-red-700 hover:bg-red-500 ease-in-out duration-300 hover:scale-105">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
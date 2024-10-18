import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto hover:scale-105 ease-in-out duration-300">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[150px] sm:h-[200px] object-contain rounded-t-lg"
          />
        </div>
        <CardContent className="bg-slate-200">
          <h2 className="text-xl font-bold mb-2 mt-2 text-slate-900">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
            ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">₹{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-1 pt-5 bg-slate-400">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="hover:bg-green-900"
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)} className="hover:bg-red-900">Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;

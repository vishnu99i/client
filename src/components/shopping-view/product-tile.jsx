import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto hover:scale-105 ease-in-out duration-300 mb-7">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[150px] sm:h-[200px] object-contain rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 animate-pulse">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4 bg-slate-300">
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-slate-900 hover:scale-105 ease-in-out duration-300">{product?.title}</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2">
            <span className="text-[16px] font-bold text-muted-foreground text-yellow-900 hover:scale-105 ease-in-out duration-300">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] font-bold text-muted-foreground text-rose-950 hover:scale-105 ease-in-out duration-300">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-xl font-semibold text-primary text-red-700 hover:scale-105 ease-in-out duration-300`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-xl font-semibold text-primary text-green-700 hover:scale-105 ease-in-out duration-300">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="bg-slate-800 rounded-b-lg pb-0 py-3">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full border hover:scale-105 ease-in-out duration-300 hover:bg-slate-950"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={`rounded sm:rounded-full transition-colors bg-slate-500 w-7 sm:w-10 ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-slate-500 hover:text-slate-100"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-slate-700"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
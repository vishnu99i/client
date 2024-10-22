import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="text-slate-300 rounded-lg shadow-sm border border-slate-500 bg-gradient-to-r from-black to-slate-900">
      
      <div className="md:fixed">
      <div className="p-4 border-b-2 md:w-[198px] border-slate-300">
        <h2 className="text-lg md:text-2xl font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-3">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base md:text-xl font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex text-[12px] md:text-sm font-medium items-center gap-2 md:gap-5 ">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="text-slate-100 bg-white"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ProductFilter;
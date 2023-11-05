"use client";

import { Product } from "@/types";
import React, { MouseEventHandler } from "react";
import PriceCurrency from "@/components/ui/PriceCurrency";
import Button from "@/components/Button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";

const Info = ({ data }: { data: Product }) => {
  // Cart
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex-end justify-between">
        <div className="text-2xl text-gray-900">
          <PriceCurrency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color.value }}
          />
        </div>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        {/* Add to Cart click */}
        <Button className="flex items-center gap-x-2" onClick={onAddToCart}>
          Add To Cart
          <ShoppingCart className="" />
        </Button>
      </div>
    </div>
  );
};

export default Info;

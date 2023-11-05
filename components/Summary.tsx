"use client";

// 9:39:33

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import PriceCurrency from "@/components/ui/PriceCurrency";
import useCart from "@/hooks/useCart";
import CheckoutForm from "./ui/CheckoutForm";


const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }
    if (searchParams.get("cancelled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  // Total Price
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  return (
    <div
      className="
        mt-16 rounded-lg bg-gray-50 
        px-4 py-6 sm:p-6 lg:col-span-5 
        lg:mt-0 lg:p-8
    "
    >
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-base font-medium text-gray-900">Order Total</div>
        <PriceCurrency value={totalPrice} />
      </div>
      
      <CheckoutForm />
    </div>
  );
};

export default Summary;
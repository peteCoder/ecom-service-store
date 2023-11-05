"use client";

import CartItem from "@/components/CartItem";
import Summary from "@/components/Summary";
import Container from "@/components/ui/Container";
import useCart from "@/hooks/useCart";
import React, { useEffect } from "react";

import { useSearchParams } from "next/navigation";

const CartPage = () => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const items = useCart();

  

  

  // Cart
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, [])


  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-6">
          <h1 className="">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No Items added to cart</p>
              )}
              {cart.items.length > 0 && (
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              )}
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

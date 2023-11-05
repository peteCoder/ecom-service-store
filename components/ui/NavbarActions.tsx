"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/Button";
import { ShoppingBag } from "lucide-react";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();

  // Cart
  const cart = useCart();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <div className="ml-auto flex items-center gap-4">
      <Button
        className="flex items-center rounded-full bg-black px-4 py-2"
        onClick={() => router.push("/cart")}
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;

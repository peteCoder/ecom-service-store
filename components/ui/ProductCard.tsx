"use client";

import { MouseEventHandler } from "react";

import { Product as ProductType } from "@/types";
import Image from "next/image";
import IconButton from "./IconButton";
import { ExpandIcon, ShoppingCart } from "lucide-react";
import PriceCurrency from "./PriceCurrency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";

interface ProductCardProps {
  data: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const previewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  // Cart
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  // Render
  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images */}
      <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden">
        <Image
          alt="image"
          src={data?.images?.[0]?.url}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            {/*  */}
            <IconButton
              onClick={onPreview}
              Icon={<ExpandIcon size={20} />}
              className="text-gray-600"
            />
            <IconButton
              onClick={onAddToCart}
              Icon={<ShoppingCart size={20} />}
              className="text-gray-600"
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="">
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      {/* Price */}
      <div className="">
        <PriceCurrency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;

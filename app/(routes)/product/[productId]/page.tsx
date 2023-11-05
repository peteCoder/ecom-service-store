import getProducts from "@/actions/getProducts";
import React from "react";

import { Product as ProductType } from "@/types";
import getProduct from "@/actions/getProduct";
import Container from "@/components/ui/Container";
import ProductList from "@/components/ProductList";
import Gallery from "@/components/Gallery";
import Info from "@/components/Info";

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

// type ProductType = { category?: { id?: string } };

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  console.log(product);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="sm:grid sm:grid-cols-2 lg:items-start sm:gap-x-2 lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList items={suggestedProducts} title={"Related Items"} />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;

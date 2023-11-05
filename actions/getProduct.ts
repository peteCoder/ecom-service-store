import { Product as ProductType } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<ProductType> => {
  const response = await fetch(`${URL}/${id}`, { cache: "no-store" });
  return response.json();
};

export default getProduct;

import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import Billboard from "@/components/Billboard";

import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";

const HomePage = async () => {
  const billboard = await getBillboard("edc0d069-1982-4317-9227-9e998d71a408");
  const products = await getProducts({ isFeatured: true });
  
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="fex flexx-col gap-y-8 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;

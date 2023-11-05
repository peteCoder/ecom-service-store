import getCategory from "@/actions/getCategory";
import getColors from "@/actions/getColors";
import getProducts from "@/actions/getProducts";
import getSizes from "@/actions/getSizes";
import Billboard from "@/components/Billboard";
import Filter from "@/app/(routes)/category/[categoryId]/components/Filter";
import Container from "@/components/ui/Container";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";
import MobileFilters from "./components/MobileFilters";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage = async ({
  params: { categoryId },
  searchParams,
}: CategoryPageProps) => {
  // All Products
  const products = await getProducts({
    categoryId: categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  console.log(searchParams);

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          {/* Mobile Filters */}
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard data={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;

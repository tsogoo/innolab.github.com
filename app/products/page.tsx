
import { getAllProducts } from "@/lib/api";
import { Markdown } from "@/lib/markdown";

export const dynamic = "force-static"


const ProductPage = async ({ params }: any) => {
  const products = await getAllProducts(true);
  return (
    <div className="container mx-auto px-5">
      {products.map((product: any) => (
        <div key={product.slug} className="mb-8">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          
          <p className="text-lg font-semibold">Үнэ: {product.price} MNT</p>
          <a href={`/products/${product.slug}`} className="text-blue-500 hover:underline">
            View Product    
          </a> 
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
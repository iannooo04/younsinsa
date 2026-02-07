import { getPublicProductDetailAction } from "@/actions/product-actions";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ productId: string }>;
}

import { auth } from "@/auth";

export default async function ProductDetailPage(props: PageProps) {
  const { productId } = await props.params;
  const { success, product } = await getPublicProductDetailAction(productId);
  const session = await auth();

  if (!success || !product) {
    notFound();
  }

  return <ProductDetailClient product={product} userId={session?.user?.id} />;
}

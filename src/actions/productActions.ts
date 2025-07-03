"use server";

import { getProductDetails, getShopId } from "@/services/api";
import { ProductDetail } from "@/types/product";

// API response interfaces
interface ProductImageResponse {
  Id: number;
  Position: number;
  Src: string;
}

interface ProductOptionItemResponse {
  Id: number;
  CatItemId: number;
  ItemName: string;
  BcolorHex: string;
  FcolorHex: string;
}

interface ProductOptionResponse {
  OptId: number;
  Position: number;
  CatId: number;
  CatName: string;
  Items: ProductOptionItemResponse[];
}

interface ProductResponse {
  Id: number;
  Name: string;
  Description: string;
  SPrice: number;
  Caprice: number;
  ProductImages: ProductImageResponse[];
  ProductOptions: ProductOptionResponse[];
}

interface RelatedProductResponse {
  Id: number;
  Name: string;
  Sprice: string;
  Caprice: string;
  CoverImg: string;
}

interface ApiResponse {
  Data: {
    Product: ProductResponse;
    RelatedProducts: RelatedProductResponse[];
  };
  IsSuccess: boolean;
}

export async function fetchShopId(referer: string): Promise<number> {
  try {
    const data = await getShopId(referer);

    return data.Data.Id;
  } catch (error) {
    console.error("Error in fetchShopId:", error);
    throw new Error("Failed to fetch shop ID");
  }
}

export async function fetchProductDetails(productId: number, sId: number): Promise<ProductDetail> {
  try {
    const response = (await getProductDetails(productId, sId)) as ApiResponse;

    // Check if the response has the expected structure
    if (response && response.Data && response.Data.Product) {
      const apiProduct = response.Data.Product;

      // Map API response to ProductDetail interface
      const productDetail: ProductDetail = {
        id: apiProduct.Id,
        name: apiProduct.Name,
        description: apiProduct.Description,
        sPrice: apiProduct.SPrice,
        cPrice: apiProduct.Caprice,
        // rating: 4.5, // Default rating since it's not in the API
        // reviewsCount: 10, // Default reviews count since it's not in the API
        images:
          apiProduct.ProductImages?.map((img: ProductImageResponse) => ({
            id: img.Id,
            imageUrl: img.Src,
            isMain: img.Position === 1, // Assume first image is main
          })) || [],
        options:
          apiProduct.ProductOptions?.map((opt: ProductOptionResponse) => ({
            id: opt.OptId,
            name: opt.CatName,
            variants:
              opt.Items?.map((item: ProductOptionItemResponse) => ({
                id: item.Id,
                name: item.ItemName,
                value: item.ItemName,
                colorCode: item.BcolorHex,
              })) || [],
          })) || [],
        relatedProducts:
          response.Data.RelatedProducts?.map((rp: RelatedProductResponse) => ({
            id: rp.Id,
            name: rp.Name,
            imageUrl: rp.CoverImg,
            sPrice: parseFloat(rp.Sprice),
            cPrice: parseFloat(rp.Caprice),
          })) || [],
      };

      return productDetail;
    } else {
      console.error("Unexpected API response structure:", response);
      throw new Error("Invalid product data structure");
    }
  } catch (error) {
    console.error("Error in fetchProductDetails:", error);
    throw new Error("Failed to fetch product details");
  }
}

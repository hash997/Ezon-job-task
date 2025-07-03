import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://shop-api-test-v2.ezone.ly';

export const getShopId = async (referer: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shop/getRequestShopId`, {
      headers: {
        Referer: referer,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shop ID:', error);
    throw error;
  }
};

export const getProductDetails = async (productId: number, sId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ShopProducts/ProductDetail/${productId}`, {
      headers: {
        sId: sId.toString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};
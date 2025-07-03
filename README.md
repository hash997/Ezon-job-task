# Ezone Product Detail App

## Overview

This is a Next.js e-commerce application that displays product details with a focus on Arabic language support. The application allows users to view product information, including images, prices, options, and related products.

## Features

- Product detail page with comprehensive information
- Image gallery with thumbnails
- Product options selection
- Price display with discount calculation
- Related products section
- Responsive design for all device sizes
- RTL support for Arabic language
- Add to cart and buy now functionality

## Technologies Used

- Next.js 15.3.4
- React 19.0.0
- TypeScript
- Tailwind CSS for styling
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd product-detail-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=https://shop-api-test-v2.ezone.ly
NEXT_PUBLIC_DEFAULT_REFERER=http://localhost:58961
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:58961](http://localhost:58961) with your browser to see the application

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/actions` - Server actions for data fetching
- `/src/services` - API service functions
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions
- `/public` - Static assets

## API Integration

The application integrates with the Ezone API to fetch product data. The API endpoints used are:

- `/shop/getRequestShopId` - Get the shop ID
- `/ShopProducts/ProductDetail/{productId}` - Get product details

## Deployment

This application can be deployed on Vercel or any other hosting platform that supports Next.js applications.

```bash
npm run build
npm run start
```

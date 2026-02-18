# API Service Usage Examples

## Setup

The API service is organized into separate files for better maintainability:

```
services/
├── api/
│   ├── client.ts          # API configuration (base URL, headers)
│   ├── fetch-utils.ts     # Fetch wrapper with error handling
│   ├── error-handler.ts   # Error handling utilities
│   ├── types.ts           # TypeScript types for API responses
│   └── index.ts           # API utilities exports
├── product.ts             # Product service
├── campaign.ts            # Campaign service
└── index.ts               # Services exports
```

## Configuration

Set your API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Or it will default to `http://localhost:3000`.

---

## Product Service Examples

### Import

```typescript
import {
  productService,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  type ProductResponse,
  type CreateProductRequest,
} from '@/services'
```

### Create Product

```typescript
const newProduct = await createProduct({
  title: 'Sample Product',
  image_url: 'https://example.com/image.jpg',
  price: 299.99,
})
```

### Get All Products

```typescript
const products = await getAllProducts()
console.log(products)
```

### Get Product by ID

```typescript
const product = await getProductById('ad340e15-ca54-47b3-b2a1-ad0afc458c98')
console.log(product)
```

### Update Product

```typescript
const updated = await updateProduct('ad340e15-ca54-47b3-b2a1-ad0afc458c98', {
  title: 'Updated Product Name',
  price: 349.99,
})
```

### Delete Product

```typescript
await deleteProduct('ad340e15-ca54-47b3-b2a1-ad0afc458c98')
```

### Using Service Object

```typescript
// All methods available on productService object
const products = await productService.getAll()
const product = await productService.getById(id)
const created = await productService.create(data)
const updated = await productService.update(id, data)
await productService.delete(id)
```

---

## Campaign Service Examples

### Import

```typescript
import {
  campaignService,
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  type CampaignResponse,
  type CreateCampaignRequest,
} from '@/services'
```

### Create Campaign

```typescript
const newCampaign = await createCampaign({
  name: 'Q1 2026 Promo',
  UTMSource: 'google',
  UTMMedium: 'cpc',
  UTMCampaign: 'q1-2026-promo',
  productIds: [
    'ad340e15-ca54-47b3-b2a1-ad0afc458c98',
    'daf8a1ed-3491-4cd3-8498-b487aafb072b',
  ],
  startDate: '2026-02-17T00:00:00.000Z',
  endDate: '2026-03-31T23:59:59.999Z',
})
```

### Get All Campaigns

```typescript
const campaigns = await getAllCampaigns()
```

### Get Campaign by ID

```typescript
const campaign = await getCampaignById('9c1f9993-d544-4992-93e9-7c62b7a96385')
```

### Update Campaign

```typescript
const updated = await updateCampaign('9c1f9993-d544-4992-93e9-7c62b7a96385', {
  name: 'Updated Q1 Promo',
  UTMSource: 'facebook',
  endDate: '2026-04-15T23:59:59.999Z',
})
```

### Delete Campaign

```typescript
await deleteCampaign('9c1f9993-d544-4992-93e9-7c62b7a96385')
```

### Using Service Object

```typescript
const campaigns = await campaignService.getAll()
const campaign = await campaignService.getById(id)
const created = await campaignService.create(data)
const updated = await campaignService.update(id, data)
await campaignService.delete(id)
```

---

## Error Handling

### Basic Error Handling

```typescript
import { productService, ApiError } from '@/services'

try {
  const product = await productService.getById('invalid-id')
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Status: ${error.statusCode}`)
    console.error(`Message: ${error.message}`)
  }
}
```

### In React Components (Async/Await)

```typescript
'use client';

import { useState } from 'react';
import { productService, ApiError } from '@/services';

export default function ProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProduct = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await productService.create({
        title: formData.get('title') as string,
        image_url: formData.get('image_url') as string,
        price: parseFloat(formData.get('price') as string),
      });

      console.log('Product created:', result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCreateProduct(new FormData(e.currentTarget));
    }}>
      {/* form fields */}
    </form>
  );
}
```

---

## Advanced Usage

### Custom Fetch Options

```typescript
import { apiFetch, apiGet } from '@/services'

// With custom timeout
const product = await apiGet('/product/123', {
  timeout: 60000, // 60 seconds
})

// With custom headers
const data = await apiGet('/product', {
  headers: {
    'X-Custom-Header': 'value',
  },
})
```

### Direct API Calls

```typescript
import { apiPost, apiPatch, apiDelete } from '@/services'

// POST
const created = await apiPost('/product', { title: 'New Product' })

// PATCH
const updated = await apiPatch('/product/123', { title: 'Updated' })

// DELETE
await apiDelete('/product/123')
```

### type Safety

All functions are fully typed with TypeScript:

```typescript
import type {
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
  CampaignResponse,
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from '@/services'

// Autocomplete and type checking included
const createData: CreateProductRequest = {
  title: 'Product',
  image_url: 'https://example.com/image.jpg',
  price: 100,
}
```

---

## API Methods Reference

### Product Service

| Method             | Parameters                     | Returns                        |
| ------------------ | ------------------------------ | ------------------------------ |
| `create(data)`     | `CreateProductRequest`         | `Promise<ProductResponse>`     |
| `getAll()`         | -                              | `Promise<ProductResponse[]>`   |
| `getById(id)`      | `string`                       | `Promise<ProductResponse>`     |
| `update(id, data)` | `string, UpdateProductRequest` | `Promise<ProductResponse>`     |
| `delete(id)`       | `string`                       | `Promise<{ message: string }>` |

### Campaign Service

| Method             | Parameters                      | Returns                        |
| ------------------ | ------------------------------- | ------------------------------ |
| `create(data)`     | `CreateCampaignRequest`         | `Promise<CampaignResponse>`    |
| `getAll()`         | -                               | `Promise<CampaignResponse[]>`  |
| `getById(id)`      | `string`                        | `Promise<CampaignResponse>`    |
| `update(id, data)` | `string, UpdateCampaignRequest` | `Promise<CampaignResponse>`    |
| `delete(id)`       | `string`                        | `Promise<{ message: string }>` |

---

## File Structure Breakdown

### `/services/api/client.ts`

- API configuration (base URL, headers)
- `getApiUrl()` helper function

### `/services/api/fetch-utils.ts`

- `apiFetch()` - Main fetch wrapper
- `apiGet()` - GET requests
- `apiPost()` - POST requests
- `apiPatch()` - PATCH requests
- `apiDelete()` - DELETE requests

### `/services/api/error-handler.ts`

- `ApiError` class
- Error parsing and handling utilities

### `/services/api/types.ts`

- All TypeScript types for requests and responses
- Type definitions for Product, Campaign, MarketplaceProduct, etc.

### `/services/product.ts`

- Product service functions
- `productService` object with all methods

### `/services/campaign.ts`

- Campaign service functions
- `campaignService` object with all methods

### `/services/index.ts`

- Central exports for all services and utilities

# Jenosize Backend API Documentation

## Overview

**Title:** Jenosize Backend API  
**Version:** 1.0.0  
**Description:** NestJS backend API for product and campaign management

---

## Base URL

```
http://localhost:3000
```

---

## Table of Contents

- [Product Endpoints](#product-endpoints)
- [Campaign Endpoints](#campaign-endpoints)
- [Schemas](#schemas)
- [Error Responses](#error-responses)

---

## Product Endpoints

### 1. Create Product

**POST** `/product`

Create a new product with marketplace information.

#### Request

```json
{
  "name": "Sample Product",
  "marketplaces": [
    {
      "marketplaceName": "Shopee",
      "productLink": "https://shopee.co.th/product/123",
      "price": 299.99
    },
    {
      "marketplaceName": "Lazada",
      "productLink": "https://lazada.co.th/product/456",
      "price": 289.99
    }
  ]
}
```

#### Response

**Status:** `201 Created`

```json
{
  "id": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
  "name": "Sample Product",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T10:30:00.000Z",
  "marketPlaceProducts": [
    {
      "id": "mp-001",
      "marketplaceName": "Shopee",
      "productLink": "https://shopee.co.th/product/123",
      "price": 299.99,
      "productId": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
      "createdAt": "2026-02-17T10:30:00.000Z",
      "updatedAt": "2026-02-17T10:30:00.000Z"
    }
  ]
}
```

#### Error Response

**Status:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

### 2. Get All Products

**GET** `/product`

Retrieve a list of all products.

#### Response

**Status:** `200 OK`

```json
[
  {
    "id": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
    "name": "Sample Product",
    "createdAt": "2026-02-17T10:30:00.000Z",
    "updatedAt": "2026-02-17T10:30:00.000Z",
    "marketPlaceProducts": [
      {
        "id": "mp-001",
        "marketplaceName": "Shopee",
        "productLink": "https://shopee.co.th/product/123",
        "price": 299.99,
        "productId": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
        "createdAt": "2026-02-17T10:30:00.000Z",
        "updatedAt": "2026-02-17T10:30:00.000Z"
      }
    ]
  }
]
```

---

### 3. Get Product by ID

**GET** `/product/{id}`

Retrieve a single product by its ID.

#### Parameters

| Name | In   | Type   | Required | Description                                                         |
| ---- | ---- | ------ | -------- | ------------------------------------------------------------------- |
| id   | path | string | Yes      | Product ID (UUID) - Example: `ad340e15-ca54-47b3-b2a1-ad0afc458c98` |

#### Response

**Status:** `200 OK`

```json
{
  "id": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
  "name": "Sample Product",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T10:30:00.000Z",
  "marketPlaceProducts": [
    {
      "id": "mp-001",
      "marketplaceName": "Shopee",
      "productLink": "https://shopee.co.th/product/123",
      "price": 299.99,
      "productId": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
      "createdAt": "2026-02-17T10:30:00.000Z",
      "updatedAt": "2026-02-17T10:30:00.000Z"
    }
  ]
}
```

#### Error Response

**Status:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

---

### 4. Update Product

**PATCH** `/product/{id}`

Update an existing product by ID.

#### Parameters

| Name | In   | Type   | Required | Description       |
| ---- | ---- | ------ | -------- | ----------------- |
| id   | path | string | Yes      | Product ID (UUID) |

#### Request

```json
{
  "name": "Updated Product Name",
  "marketplaces": [
    {
      "marketplaceName": "Shopee",
      "productLink": "https://shopee.co.th/product/123",
      "price": 349.99
    }
  ]
}
```

#### Response

**Status:** `200 OK`

```json
{
  "id": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
  "name": "Updated Product Name",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T11:45:00.000Z",
  "marketPlaceProducts": [
    {
      "id": "mp-001",
      "marketplaceName": "Shopee",
      "productLink": "https://shopee.co.th/product/123",
      "price": 349.99,
      "productId": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
      "createdAt": "2026-02-17T10:30:00.000Z",
      "updatedAt": "2026-02-17T11:45:00.000Z"
    }
  ]
}
```

#### Error Response

**Status:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

---

### 5. Delete Product

**DELETE** `/product/{id}`

Delete a product by ID.

#### Parameters

| Name | In   | Type   | Required | Description       |
| ---- | ---- | ------ | -------- | ----------------- |
| id   | path | string | Yes      | Product ID (UUID) |

#### Response

**Status:** `200 OK`

```json
{
  "message": "Product deleted successfully"
}
```

#### Error Response

**Status:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

---

## Campaign Endpoints

### 1. Create Campaign

**POST** `/campaign`

Create a new campaign with UTM parameters and product IDs.

#### Request

```json
{
  "name": "Q1 2026 Promo",
  "UTMSource": "google",
  "UTMMedium": "cpc",
  "UTMCampaign": "q1-2026-promo",
  "productIds": [
    "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
    "daf8a1ed-3491-4cd3-8498-b487aafb072b"
  ],
  "startDate": "2026-02-17T00:00:00.000Z",
  "endDate": "2026-03-31T23:59:59.999Z"
}
```

#### Response

**Status:** `201 Created`

```json
{
  "id": "9c1f9993-d544-4992-93e9-7c62b7a96385",
  "name": "Q1 2026 Promo",
  "UTMSource": "google",
  "UTMMedium": "cpc",
  "UTMCampaign": "q1-2026-promo",
  "startDate": "2026-02-17T00:00:00.000Z",
  "endDate": "2026-03-31T23:59:59.999Z",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T10:30:00.000Z",
  "campaignsProducts": [
    {
      "campaignId": "9c1f9993-d544-4992-93e9-7c62b7a96385",
      "productId": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
      "product": {
        "id": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
        "name": "Sample Product",
        "marketPlaceProducts": [
          {
            "id": "mp-001",
            "marketplaceName": "Shopee",
            "productLink": "https://shopee.co.th/product/123",
            "price": 299.99
          }
        ]
      }
    }
  ]
}
```

#### Error Response

**Status:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

### 2. Get All Campaigns

**GET** `/campaign`

Retrieve all campaigns with nested products and marketplace data.

#### Response

**Status:** `200 OK`

```json
[
  {
    "id": "9c1f9993-d544-4992-93e9-7c62b7a96385",
    "name": "Q1 2026 Promo",
    "UTMSource": "google",
    "UTMMedium": "cpc",
    "UTMCampaign": "q1-2026-promo",
    "startDate": "2026-02-17T00:00:00.000Z",
    "endDate": "2026-03-31T23:59:59.999Z",
    "createdAt": "2026-02-17T10:30:00.000Z",
    "updatedAt": "2026-02-17T10:30:00.000Z",
    "campaignsProducts": [
      {
        "campaignId": "9c1f9993-d544-4992-93e9-7c62b7a96385",
        "productId": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
        "product": {
          "id": "ad340e15-ca54-47b3-b2a1-ad0afc458c98",
          "name": "Sample Product",
          "marketPlaceProducts": []
        }
      }
    ]
  }
]
```

---

### 3. Get Campaign by ID

**GET** `/campaign/{id}`

Retrieve a single campaign by its ID.

#### Parameters

| Name | In   | Type   | Required | Description                                                          |
| ---- | ---- | ------ | -------- | -------------------------------------------------------------------- |
| id   | path | string | Yes      | Campaign ID (UUID) - Example: `9c1f9993-d544-4992-93e9-7c62b7a96385` |

#### Response

**Status:** `200 OK`

```json
{
  "id": "9c1f9993-d544-4992-93e9-7c62b7a96385",
  "name": "Q1 2026 Promo",
  "UTMSource": "google",
  "UTMMedium": "cpc",
  "UTMCampaign": "q1-2026-promo",
  "startDate": "2026-02-17T00:00:00.000Z",
  "endDate": "2026-03-31T23:59:59.999Z",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T10:30:00.000Z",
  "campaignsProducts": []
}
```

#### Error Response

**Status:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Campaign not found",
  "error": "Not Found"
}
```

---

### 4. Update Campaign

**PATCH** `/campaign/{id}`

Update campaign details.

#### Parameters

| Name | In   | Type   | Required | Description        |
| ---- | ---- | ------ | -------- | ------------------ |
| id   | path | string | Yes      | Campaign ID (UUID) |

#### Request

```json
{
  "name": "Updated Q1 Promo",
  "UTMSource": "facebook",
  "endDate": "2026-04-15T23:59:59.999Z"
}
```

#### Response

**Status:** `200 OK`

```json
{
  "id": "9c1f9993-d544-4992-93e9-7c62b7a96385",
  "name": "Updated Q1 Promo",
  "UTMSource": "facebook",
  "UTMMedium": "cpc",
  "UTMCampaign": "q1-2026-promo",
  "startDate": "2026-02-17T00:00:00.000Z",
  "endDate": "2026-04-15T23:59:59.999Z",
  "createdAt": "2026-02-17T10:30:00.000Z",
  "updatedAt": "2026-02-17T12:00:00.000Z",
  "campaignsProducts": []
}
```

#### Error Response

**Status:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Campaign not found",
  "error": "Not Found"
}
```

---

### 5. Delete Campaign

**DELETE** `/campaign/{id}`

Delete a campaign by ID.

#### Parameters

| Name | In   | Type   | Required | Description        |
| ---- | ---- | ------ | -------- | ------------------ |
| id   | path | string | Yes      | Campaign ID (UUID) |

#### Response

**Status:** `200 OK`

```json
{
  "message": "Campaign deleted successfully"
}
```

#### Error Response

**Status:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Campaign not found",
  "error": "Not Found"
}
```

---

## Schemas

### MarketplaceProduct

Product listing on a marketplace platform.

| Field           | Type               | Required | Description                                    |
| --------------- | ------------------ | -------- | ---------------------------------------------- |
| id              | string (UUID)      | No       | Marketplace product ID                         |
| marketplaceName | string             | Yes      | Name of the marketplace (e.g., Shopee, Lazada) |
| productLink     | string (URI)       | Yes      | URL to the product on the marketplace          |
| price           | number             | Yes      | Product price                                  |
| productId       | string (UUID)      | No       | Associated product ID                          |
| createdAt       | string (date-time) | No       | Creation timestamp                             |
| updatedAt       | string (date-time) | No       | Last update timestamp                          |

### CreateProductDto

Input schema for creating a new product.

| Field        | Type   | Required | Description                                  |
| ------------ | ------ | -------- | -------------------------------------------- |
| name         | string | Yes      | Product name (min length: 1)                 |
| marketplaces | array  | Yes      | Array of marketplace listings (min items: 1) |

### UpdateProductDto

Input schema for updating a product.

| Field        | Type   | Required | Description                   |
| ------------ | ------ | -------- | ----------------------------- |
| name         | string | No       | Product name (min length: 1)  |
| marketplaces | array  | No       | Array of marketplace listings |

### Product

Complete product object with marketplace listings.

| Field               | Type               | Description                     |
| ------------------- | ------------------ | ------------------------------- |
| id                  | string (UUID)      | Product ID                      |
| name                | string             | Product name                    |
| createdAt           | string (date-time) | Creation timestamp              |
| updatedAt           | string (date-time) | Last update timestamp           |
| marketPlaceProducts | array              | Associated marketplace products |

### CreateCampaignDto

Input schema for creating a new campaign.

| Field       | Type               | Required | Description                            |
| ----------- | ------------------ | -------- | -------------------------------------- |
| name        | string             | Yes      | Campaign name (min length: 1)          |
| UTMSource   | string             | Yes      | UTM source parameter (min length: 1)   |
| UTMMedium   | string             | Yes      | UTM medium parameter (min length: 1)   |
| UTMCampaign | string             | Yes      | UTM campaign parameter (min length: 1) |
| productIds  | array              | Yes      | Array of product IDs (min items: 1)    |
| startDate   | string (date-time) | Yes      | Campaign start date                    |
| endDate     | string (date-time) | Yes      | Campaign end date                      |

### UpdateCampaignDto

Input schema for updating a campaign.

| Field     | Type               | Required | Description                          |
| --------- | ------------------ | -------- | ------------------------------------ |
| name      | string             | No       | Campaign name (min length: 1)        |
| UTMSource | string             | No       | UTM source parameter (min length: 1) |
| UTMMedium | string             | No       | UTM medium parameter (min length: 1) |
| startDate | string (date-time) | No       | Campaign start date                  |
| endDate   | string (date-time) | No       | Campaign end date                    |

### Campaign

Complete campaign object with products and marketplace data.

| Field             | Type               | Description                               |
| ----------------- | ------------------ | ----------------------------------------- |
| id                | string (UUID)      | Campaign ID                               |
| name              | string             | Campaign name                             |
| UTMSource         | string             | UTM source parameter                      |
| UTMMedium         | string             | UTM medium parameter                      |
| UTMCampaign       | string             | UTM campaign parameter                    |
| startDate         | string (date-time) | Campaign start date                       |
| endDate           | string (date-time) | Campaign end date                         |
| createdAt         | string (date-time) | Creation timestamp                        |
| updatedAt         | string (date-time) | Last update timestamp                     |
| campaignsProducts | array              | Associated campaign-product relationships |

### Error

Standard error response object.

| Field      | Type    | Description      |
| ---------- | ------- | ---------------- |
| statusCode | integer | HTTP status code |
| message    | string  | Error message    |
| error      | string  | Error type       |

---

## Error Responses

### 400 Bad Request

Returned when validation fails or required parameters are missing.

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 404 Not Found

Returned when a requested resource does not exist.

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error

Returned when an unexpected server error occurs.

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Data Types

### UUID Format

All IDs use UUID v4 format:

```
Example: ad340e15-ca54-47b3-b2a1-ad0afc458c98
```

### Date-Time Format

All dates use ISO 8601 format with UTC timezone:

```
Example: 2026-02-17T00:00:00.000Z
```

---

## Notes

- All timestamps are returned in UTC timezone
- Product IDs and Campaign IDs are universally unique identifiers (UUIDs)
- Marketplace names should be one of: `Shopee`, `Lazada`
- Campaign startDate must be before endDate

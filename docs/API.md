# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Upload Image

Upload an image to Cloudinary.

**Endpoint:** `POST /upload`

**Content-Type:** `multipart/form-data`

**Request Body:**
- `image` (File): Image file to upload

**Response:**
```json
{
  "success": true,
  "data": {
    "publicId": "cloudinary-image-editor/abc123",
    "url": "http://res.cloudinary.com/.../image.jpg",
    "secureUrl": "https://res.cloudinary.com/.../image.jpg",
    "format": "jpg",
    "width": 1920,
    "height": 1080,
    "bytes": 245678
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

### 2. Transform Image

Apply transformations to an uploaded image.

**Endpoint:** `POST /transform`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "publicId": "cloudinary-image-editor/abc123",
  "transformations": {
    "resize": {
      "width": 800,
      "height": 600,
      "crop": "fill"
    },
    "effects": {
      "brightness": 20,
      "contrast": 10,
      "saturation": 15
    },
    "filters": ["grayscale"],
    "rotate": 90,
    "flip": "horizontal",
    "removeBackground": true,
    "text": {
      "content": "Sample Text",
      "fontSize": 48,
      "color": "#FFFFFF",
      "position": "north",
      "fontFamily": "Arial"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://res.cloudinary.com/.../transformed.jpg",
    "secureUrl": "https://res.cloudinary.com/.../transformed.jpg"
  }
}
```

---

### 3. Download Image

Download a transformed image.

**Endpoint:** `GET /download`

**Query Parameters:**
- `publicId` (string, required): Public ID of the image
- `format` (string, optional): Output format (jpg, png, webp). Default: jpg
- `quality` (number, optional): Image quality (1-100). Default: 90

**Example:**
```
GET /api/download?publicId=cloudinary-image-editor/abc123&format=png&quality=95
```

**Response:**
- Binary image data
- Content-Type: image/jpeg (or appropriate format)
- Content-Disposition: attachment

---

### 4. Delete Image

Delete an image from Cloudinary.

**Endpoint:** `DELETE /images/:publicId`

**URL Parameters:**
- `publicId` (string): Public ID of the image (URL encoded)

**Example:**
```
DELETE /api/images/cloudinary-image-editor%2Fabc123
```

**Response:**
```json
{
  "success": true
}
```

---

### 5. Get Image Details

Get information about an uploaded image.

**Endpoint:** `GET /images/:publicId`

**URL Parameters:**
- `publicId` (string): Public ID of the image (URL encoded)

**Response:**
```json
{
  "success": true,
  "data": {
    "publicId": "cloudinary-image-editor/abc123",
    "format": "jpg",
    "width": 1920,
    "height": 1080,
    "bytes": 245678,
    "createdAt": "2025-11-15T00:00:00.000Z"
  }
}
```

---

## Transformation Options

### Resize

```typescript
resize: {
  width?: number;        // Target width in pixels
  height?: number;       // Target height in pixels
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
}
```

**Crop Modes:**
- `fill`: Resize to fill the given dimensions, may crop
- `fit`: Resize to fit within dimensions, no cropping
- `scale`: Force resize to exact dimensions
- `crop`: Crop to exact dimensions
- `thumb`: Create thumbnail

### Effects

```typescript
effects: {
  brightness?: number;   // -100 to 100
  contrast?: number;     // -100 to 100
  saturation?: number;   // -100 to 100
}
```

### Filters

Available filters:
- `grayscale`: Convert to grayscale
- `sepia`: Apply sepia tone
- `blur`: Apply blur effect
- `sharpen`: Sharpen the image
- `vignette`: Add vignette effect

### Rotation

```typescript
rotate: number  // 0, 90, 180, 270
```

### Flip

```typescript
flip: 'horizontal' | 'vertical' | 'both'
```

### Background Removal

```typescript
removeBackground: boolean  // AI-powered background removal
```

### Text Overlay

```typescript
text: {
  content: string;       // Text to display
  fontSize?: number;     // Font size in pixels
  color?: string;        // Hex color (e.g., "#FFFFFF")
  position?: string;     // north, south, east, west, center, etc.
  fontFamily?: string;   // Font family name
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "details": {}  // Optional additional error details
}
```

**Common Error Codes:**
- `400`: Bad Request - Invalid parameters
- `404`: Not Found - Resource not found
- `413`: Payload Too Large - File size exceeds limit
- `500`: Internal Server Error - Server-side error

---

## Rate Limiting

- No rate limiting in development
- Production: TBD based on Cloudinary plan

---

## CORS

CORS is enabled for:
- Development: `http://localhost:5173`
- Production: Configure via `CORS_ORIGIN` environment variable

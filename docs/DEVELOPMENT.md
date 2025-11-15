# Development Guide

This guide covers development practices, architecture, and contribution guidelines for the Cloudinary Image Editor project.

## Project Structure

```
cloudinary-image-editor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── EditorToolbar.tsx
│   │   │   └── PreviewPanel.tsx
│   │   ├── contexts/      # React contexts
│   │   │   └── ImageContext.tsx
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   │   └── image.types.ts
│   │   ├── utils/         # Utility functions
│   │   │   ├── api.ts
│   │   │   └── cloudinary.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── config/       # Configuration
│   │   │   └── cloudinary.config.ts
│   │   ├── controllers/  # Request handlers
│   │   │   ├── upload.controller.ts
│   │   │   └── transform.controller.ts
│   │   ├── services/     # Business logic
│   │   │   └── cloudinary.service.ts
│   │   ├── middleware/   # Express middleware
│   │   │   ├── upload.middleware.ts
│   │   │   └── errorHandler.middleware.ts
│   │   ├── routes/       # API routes
│   │   │   ├── upload.routes.ts
│   │   │   ├── transform.routes.ts
│   │   │   └── index.ts
│   │   ├── types/        # TypeScript types
│   │   │   └── api.types.ts
│   │   └── server.ts     # Entry point
│   └── package.json
│
└── docs/                 # Documentation
    ├── API.md
    ├── SETUP.md
    └── DEVELOPMENT.md
```

## Architecture

### Frontend Architecture

**Tech Stack:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for API calls

**Key Components:**

1. **ImageUploader** - Handles file upload with drag & drop
2. **EditorToolbar** - Provides transformation controls
3. **PreviewPanel** - Shows real-time preview of edits

**Data Flow:**
```
User Action → Component → API Call → Backend → Cloudinary → Response → UI Update
```

### Backend Architecture

**Tech Stack:**
- Node.js + Express
- TypeScript
- Cloudinary SDK
- Multer for file uploads

**Layers:**

1. **Routes** - Define API endpoints
2. **Controllers** - Handle requests/responses
3. **Services** - Business logic and Cloudinary integration
4. **Middleware** - Request processing (upload, error handling)

## Development Practices

### TypeScript

- Use strict type checking
- Define interfaces for all data structures
- Avoid `any` type when possible
- Use type inference where appropriate

### Code Style

- Use ESLint for linting
- Use Prettier for formatting
- Follow React best practices
- Write descriptive variable names
- Add comments for complex logic

### Component Guidelines

```typescript
// Good: Functional component with TypeScript
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Click me</button>
    </div>
  );
};
```

### State Management

- Use React hooks (useState, useEffect, useCallback)
- Keep state close to where it's used
- Lift state up when needed by multiple components
- Consider Context API for global state

### API Integration

```typescript
// Centralize API calls in utils/api.ts
export const imageAPI = {
  uploadImage: async (file: File) => {
    // Implementation
  },
  transformImage: async (request: TransformRequest) => {
    // Implementation
  },
};
```

## Testing

### Unit Tests

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Manual Testing Checklist

- [ ] Upload various image formats (JPEG, PNG, WebP)
- [ ] Test file size limits (< 10MB)
- [ ] Apply each transformation type
- [ ] Test transformation combinations
- [ ] Verify download functionality
- [ ] Test error scenarios
- [ ] Check responsive design on different devices

## Adding New Features

### Adding a New Transformation

1. **Update Types** (`server/src/types/api.types.ts`):
```typescript
export interface TransformRequest {
  transformations: {
    // ... existing transformations
    myNewTransform?: {
      param1: number;
      param2: string;
    };
  };
}
```

2. **Update Service** (`server/src/services/cloudinary.service.ts`):
```typescript
if (transformations.myNewTransform) {
  transformArray.push({
    effect: `my_effect:${transformations.myNewTransform.param1}`,
  });
}
```

3. **Update UI** (`client/src/components/EditorToolbar.tsx`):
```typescript
// Add UI controls for the new transformation
```

4. **Update Client Types** (`client/src/types/image.types.ts`)

5. **Test the feature thoroughly**

### Adding a New API Endpoint

1. **Create Route** (`server/src/routes/myfeature.routes.ts`)
2. **Create Controller** (`server/src/controllers/myfeature.controller.ts`)
3. **Add to Router** (`server/src/routes/index.ts`)
4. **Add Client API Call** (`client/src/utils/api.ts`)
5. **Update Documentation** (`docs/API.md`)

## Performance Optimization

### Frontend

- Use React.memo for expensive components
- Debounce transformation updates
- Lazy load images
- Optimize bundle size with code splitting

### Backend

- Implement request caching
- Use async/await properly
- Handle errors gracefully
- Implement rate limiting for production

## Deployment

### Frontend (Vercel)

```bash
# Build
cd client
npm run build

# Deploy
vercel
```

### Backend (Railway/Render)

```bash
# Build
cd server
npm run build

# Deploy via platform CLI or Git integration
```

### Environment Variables

Ensure all environment variables are set in production:

**Server:**
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ORIGIN`
- `NODE_ENV=production`

**Client:**
- `VITE_API_URL`
- `VITE_CLOUDINARY_CLOUD_NAME`

## Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/what-changed` - Code refactoring

### Commit Messages

Follow conventional commits:

```
feat: add background removal feature
fix: resolve upload error for large files
docs: update API documentation
refactor: improve transformation logic
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Write/update tests
4. Update documentation
5. Create PR with description
6. Wait for review
7. Address feedback
8. Merge when approved

## Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Documentation](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## License

MIT License - see LICENSE file for details

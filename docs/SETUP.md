# Setup Guide

This guide will help you set up the Cloudinary Image Editor project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git**
- **Cloudinary Account** (free tier available)

## Step 1: Clone the Repository

```bash
git clone https://github.com/net-runners-com/cloudinary-image-editor.git
cd cloudinary-image-editor
```

## Step 2: Cloudinary Account Setup

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. Once logged in, go to your Dashboard
3. Note down the following credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Step 3: Server Setup

### Install Dependencies

```bash
cd server
npm install
```

### Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and add your Cloudinary credentials:

```env
PORT=5000
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Build TypeScript

```bash
npm run build
```

### Start Development Server

```bash
npm run dev
```

The server should now be running on `http://localhost:5000`

## Step 4: Client Setup

### Install Dependencies

Open a new terminal window:

```bash
cd client
npm install
```

### Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and add your configuration:

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

### Start Development Server

```bash
npm run dev
```

The client should now be running on `http://localhost:5173`

## Step 5: Test the Application

1. Open your browser and navigate to `http://localhost:5173`
2. You should see the CloudEdit homepage
3. Try uploading an image
4. Apply some transformations
5. Download the edited image

## Troubleshooting

### Server Issues

**Port already in use:**
```bash
# Change the PORT in server/.env to a different port
PORT=5001
```

**Cloudinary authentication failed:**
- Double-check your credentials in `server/.env`
- Ensure there are no extra spaces or quotes around the values
- Verify your Cloudinary account is active

### Client Issues

**Cannot connect to API:**
- Ensure the server is running on `http://localhost:5000`
- Check that `VITE_API_URL` in `client/.env` matches the server URL
- Verify CORS is properly configured in server

**Image upload fails:**
- Check browser console for errors
- Verify file size is under 10MB
- Ensure file is a valid image format (JPEG, PNG, WebP, GIF)

### General Issues

**TypeScript errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clean build and rebuild
npm run build
```

## Development Workflow

### Running Both Servers Concurrently

You can use tools like `concurrently` to run both servers from the root:

```bash
# From project root
npm install
npm run dev
```

### Code Changes

- **Server changes**: The dev server will auto-reload
- **Client changes**: Vite will hot-reload the browser

### Linting

```bash
# Server
cd server
npm run lint

# Client
cd client
npm run lint
```

## Next Steps

- Read the [API Documentation](./API.md)
- Explore the [Development Guide](./DEVELOPMENT.md)
- Check out example transformations
- Deploy to production

## Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [Cloudinary documentation](https://cloudinary.com/documentation)
3. Open an issue on [GitHub](https://github.com/net-runners-com/cloudinary-image-editor/issues)

---

Happy coding! 🎨

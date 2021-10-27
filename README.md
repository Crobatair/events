

# Dj Events project, to learn about NEXTjs & Strapi as Backend.

This is the project built with [Strapi](https://strapi.io/).
While learning about NextJs and Strapi, on course [Next.js Udemy course](https://www.udemy.com/course/nextjs-dev-to-deployment)


![DJ Events](/events-frontend/public/images/showcase.png 'DJ Events')


The project, is structured as monolithic architecture, the frontend is built with React, the backend is built with Strapi, the database is PostgreSQL for production and a sqlite database is available for development server, provided by the default strapi configuration.


[VIEW DEMO](https://customevents.vercel.app/)

## Project Structure:

```python
'''
    /events-frontend
        - NextJs Frontend App, with cloudinary integration for uploaded images to show on DJ events.
        - BoxMap to display the location of the events.
        - The Demo is deployed to Vercel.
        
    /backend
        - Strapi Backend App, with the database and the API.
        - The Demo is deployed to Heroku.
        
'''
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Backend preparations.
First, run the development server for backend:

```bash
$ git clone git@github.com:Crobatair/events.git
$ cd backend/
$ npm install
$ touch .env
$ nano .env
# Copy and paste the environment variables for the project.
HOST=0.0.0.0
PORT=1337
CLOUDINARY_NAME=__CLOUDINARY_NAME__
CLOUDINARY_KEY=__CLOUDINARY_KEY__
CLOUDINARY_SECRET=__CLOUDINARY_SECRET__

$ npm run development
```

Notes:
- Verify that the environment variables are set correctly.
- The development server is running on port 1337.
- The development server is running on localhost.
- Go to http://localhost:1337/admin to manage the Strapi instance.
- You must create manually the first event, to avoid errors with empty objects.
- Ensure to set permissions for role `Authenticated` & `Public`

### Frontend preparations.

First, run the development server for frontend:

```bash
$ cd ../events-frontend/
$ npm install
$ touch .env.local
$ nano .env.local
# Copy and paste the environment variables for the project.
NEXT_PUBLIC_MAPBOX_API_TOKEN = __MAPBOX_API_TOKEN__
NEXT_PUBLIC_GOOGLE_MAP_API_KEY = __GOOGLE_MAP_API_KEY__
$ npm run dev
```


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

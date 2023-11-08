## Objective

- The Objective of this project is to make the searching of rental properties easier,
  where user can search properties on the basis of its requirement, there are multiple filters is
  is used.so user can prioritize its searching properties on the basis of that filters.
  and can maintain the favourite list, so that if he wants to see the properties which he choose previously.

## Available Scripts

- `npm install` : to install the all the dependencies in the project

- `REACT_APP_API_URL=BACKEND_URL npm start` : to run the developement server or to start the project (Backend URL needs to be passed as environment variable) `REACT_APP_API_URL=http://localhost:3001 npm start` to run against the local backend

- `npm run build` : to create the build for production.

## Resources

- React used for component based rendering to optimize the performance using single page web applications for client side rendering to least interact with server.

- For styling Material UI is used and some styled components of Material UI.

- Used tailwind by configuring it into the project.

## Features

- There are two roles of user one is admin and one is end user

- For Admin there are some operations

  - Admin can perform some operation on the properties like edit, delete and create new properties.

- For end user there is also some operation that one can perform like searching on some parameters mentioned below :

  - rent-range.
  - net-size range.
  - city.
  - district.
  - property-type.
    and also can made a favourite list in which user can save his favourite properties.

- Authenticated routing is also used from frontend also without login user can not proceed.

## Required dependencies version

    * node version : 16.9.0.
    * React version : 18.0.0.
    * react-router-dom : 6.18.0

## Environment Variables
- REACT_APP_API_URL=https://property-list-ojui.onrender.com

The app is deployed on Render and accessible on https://property-list-client.onrender.com

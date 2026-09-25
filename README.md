# Product Admin Dashboard

A responsive product dashboard built with **React, Tailwind CSS, and Axios**, using the [DummyJSON API](https://dummyjson.com/) for product data.

The goal of this project was to build a practical admin dashboard with authentication, product browsing, filtering, search, sorting, pagination, and product management.

## What’s Included

- Login with protected product routes
- Product table for desktop and cards for mobile
- Pagination with 10, 20, and 50 items per page
- Product search with debounce
- Category filtering
- Sorting by price, rating, and title
- Search, category, sorting, pagination, and page size synced with the URL
- Product details with images, description, price, and reviews
- Review sorting by rating
- Add, edit, and delete products
- Delete confirmation popup
- Loading, empty, error, and not-found states
- Retry button for failed API requests
- Request cancellation for outdated search requests
- Protection against repeated form submissions while a request is in progress
- Responsive design for desktop and mobile

## Tech Stack

- React
- React Router
- Tailwind CSS
- Axios
- DummyJSON API
- Vite

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/PranavChopade/nexgensis-task.git
cd nexgensis-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment file setup

run below command in terminal,

```
cp .env.sample .env
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal.

## Login Credentials

Use the following DummyJSON credentials to log in:

```text
Username: emilys
Password: emilyspass
```

## Implementation Notes

### Some choices I made

- Search and category filtering are treated as separate filters. When a category is selected, the search is cleared, and when a search is entered, the category is cleared. This is because the DummyJSON API does not provide a combined search + category endpoint.
- Pagination, search, category, sorting, and page size are stored in the URL so the current product view can be refreshed or shared.
- Search requests use a short debounce, and previous requests are cancelled when a newer search is made. This prevents outdated search results from replacing newer ones.
- Add, edit, and delete operations are handled in the UI, but DummyJSON does not permanently save these changes.

### One problem I faced

While testing the application, I found that refreshing a URL such as `/products?category=furniture&page=1&limit=10` was making both the normal products request and the category request. The normal products response could overwrite the category results.

I fixed this by keeping a single product-fetching effect that decides which API to call based on the current search and category state.

### Where AI helped

I used AI mainly as a development assistant for understanding implementation choices, debugging issues, and reviewing the approach while building the project.

I still implemented and tested the application myself, and used the explanations to understand things such as request cancellation, URL-based state, pagination, and React state/effect behaviour.

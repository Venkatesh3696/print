# Frontend Routes

This project uses React Router for navigation. Below are the main frontend routes:

## Public Routes

- `/`  
  **Home page** – Landing page for all users.

- `/login`  
  **Login page** – User authentication.

- `/register`  
  **Register page** – New user registration.

- `/products`  
  **Products listing** – Browse all products.

- `/products/:id`  
  **Product details** – View details for a single product.

## Protected Routes (Require Login)

- `/cart`  
  **Shopping cart** – View and modify cart items.

- `/checkout`  
  **Checkout** – Enter address, payment, and place order.

- `/orders`  
  **My Orders** – List of all orders placed by the user.

- `/orders/:orderid`  
  **Order Details** – View details for a specific order.

## Other

- `/profile`  
  **User profile** – View or edit user information.

---

> **Note:**  
> Protected routes require the user to be logged in. If not authenticated, a login popup or redirect will appear.
>
> you can yoe theese sample credentials
>
> - email : "user1@gmail.com"
> - password : "123456"

Login is required only for operations based on cart and orders

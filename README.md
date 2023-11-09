# Hungry Hub

Hungry Hub is a food discovery platform, inspired by applications like Zomato, that allows users to explore, discover, and interact with various restaurants, cuisines, and menus. Users can browse restaurants, place orders, leave reviews, update their profiles, and engage in various features related to food discovery and delivery. Moreover, users can also act as restaurant owners, adding and managing their own restaurants within the platform.

## Table of Contents

- [Overview](#overview)
- [Local Setup (For Users with Node and MongoDB)](#local-setup-for-users-with-node-and-mongodb)
- [Using Docker for Setup](#using-docker-for-setup)
- [Usage](#usage)
- [Configuration](#configuration)

## Overview

Hungry Hub is designed as a food discovery platform where users can:

- Browse restaurants and their menus.
- Place orders and simulate the food ordering process.
- Interact with restaurants, leave reviews, and rate restaurants.
- Update user profile.
- **Act as restaurant owners:** Users can create and manage their own restaurants, add menus, update information, and interact with customers.

## Local Setup (For Users with Node and MongoDB)

If you prefer to set up the project without Docker:

1. **Clone this repository:**

2. **Install project dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   - Install MongoDB on your local machine.
   - Start the MongoDB service and configure as needed.

4. **Configure the environment variables:**

   - Create or the `.env` file and copy details from `.env.example` and update it with necessary variables:

5. **Start the application:**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000` in your web browser.

## Using Docker for Setup

If you prefer to use Docker for the setup:

1. **Clone this repository:**

2. **Ensure Docker and Docker Compose are installed.**

3. **Build and start the services defined in the Docker Compose file:**
   ```bash
   docker-compose up
   ```
   Access the application at `http://localhost:3000` in your web browser.

## Usage

Once the application is running, users can navigate through the platform to:

- Discover and explore restaurants.
- Browse menus and place sample food orders.
- Interact with restaurants and leave reviews after orders.
- **Manage their own restaurants:** Users can create, update, and manage their own restaurants, add menus, update information, and interact with customers.

## Configuration

To configure your Hungry Hub application, follow these steps:

### Environment Variables

Create a `.env` file in the root directory of the project and fill it with the required environment variables. You can use the `.env.example` file as a template.

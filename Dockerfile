# Step 1: Use an official Node.js image as a base for building the app
FROM node:22.13.1-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package.json ./

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Install PM2 globally (for process management)
RUN npm install pm2 -g

# Step 6: Copy the rest of the application files
COPY . .

# Step 7: Build the React app for production
RUN npm run build

# Step 8: Use a lightweight Node.js image for runtime (to serve the app)
FROM node:22.13.1-alpine

# Step 9: Install bash
RUN apk add --no-cache bash

# Step 10: Set the working directory inside the container
WORKDIR /app

# Step 11: Copy only the necessary files from the build stage (including build and node_modules)
COPY --from=build /app /app

# Step 12: Install PM2 globally again (for process management)
RUN npm install pm2 -g

# Step 13: Expose the port your app will run on
EXPOSE 3000

# Step 14: Use PM2 to serve the static files from the 'build' folder
CMD ["pm2-runtime", "npm", "--", "run", "serve"]

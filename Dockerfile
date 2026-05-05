# 1. Start with a lightweight Linux machine that already has Node 20 installed
FROM node:20-alpine

# 2. Create a folder inside the container to hold our code
WORKDIR /app

# 3. Copy only the package files first (this makes future builds much faster)
COPY package*.json ./

# 4. Install our dependencies inside the container
RUN npm install

# 5. Copy the rest of our source code into the container
COPY . .

# 6. Expose the port our Express server uses
EXPOSE 3000

# 7. The command to start our app
CMD ["npx", "tsx", "src/index.ts"]
# ---------- Builder Stage ----------
    FROM node:slim AS builder

    WORKDIR /app
    
    COPY package.json yarn.lock ./
    RUN yarn install
    
    COPY . .
    RUN yarn build
    
    # ---------- Runner Stage ----------
    FROM node:slim AS runner
    
    WORKDIR /app
    
    # Copy only what's needed to run the preview server
    COPY --from=builder /app ./
    
    EXPOSE 3101
    
    # Use Vite's preview command
    CMD ["yarn", "preview", "--host", "--port", "3101"]
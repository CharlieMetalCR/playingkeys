FROM node:22-alpine

WORKDIR /app

# Copy monorepo root files needed
COPY package*.json ./
COPY tsconfig.json ./

# Copy app directory
COPY apps/api ./apps/api

WORKDIR /app/apps/api

# Install dependencies
RUN npm ci --omit=dev

# Build
RUN npx prisma generate && npm run build

# Start command
CMD ["npm", "run", "start:prod"]


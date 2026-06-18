FROM node:18 AS builder
WORKDIR /app

# Client build
COPY client/package*.json client/
RUN cd client && npm ci
COPY client/ client/
RUN cd client && npm run build

FROM node:18
WORKDIR /app

# Install server dependencies
COPY server/package*.json server/
RUN cd server && npm ci --only=production
COPY server/ server/

# Copy client build into expected path used by server
COPY --from=builder /app/client/build client/build

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server/src/server.js"]

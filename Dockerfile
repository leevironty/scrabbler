FROM node AS builder

WORKDIR /var/app
# COPY ./frontend/package-lock.json .
COPY ./frontend/package.json .
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM node:16.13-alpine3.14 AS server
WORKDIR /var/app 
# COPY ./backend/package-lock.json .
COPY ./backend/package.json .
# RUN npm ci --only=production
RUN npm install --only=production
ENV PORT=80
# EXPOSE $PORT
COPY ./backend/ .
# COPY ./frontend/build ./static
COPY --from=builder /var/app/build ./static
CMD npm run docker
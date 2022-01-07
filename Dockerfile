FROM node:16.13-alpine3.14
WORKDIR /var/app 
COPY ./backend/package-lock.json .
COPY ./backend/package.json .
RUN npm ci --only=production
ENV PORT=80
EXPOSE $PORT
COPY ./backend/* .
COPY ./frontend/build ./static
CMD npm run docker
FROM node:21-alpine3.19
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
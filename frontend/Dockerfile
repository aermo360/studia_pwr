FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# We don't build here yet because we need the backend running to fetch content.
# The command defined in docker-compose will handle the sync & build sequence.

EXPOSE 4321

CMD ["npm", "run", "dev", "--", "--host"]

FROM node:20

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y bash

# For run the wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose ports
EXPOSE 3000

ENTRYPOINT [ "wait-for-it.sh", "blog-db:3306", "--" ]
# Start in dev mode with nodemon
# CMD ["npm", "start"]
CMD ["node", "index.js"]
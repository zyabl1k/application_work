FROM node:21

WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

#RUN npm run build

#RUN rm -rf ./src

EXPOSE 5173

CMD ["npm", "run", "preview"]
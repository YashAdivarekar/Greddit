FROM node:18.13.0 as build-stage 
WORKDIR /frontend

# ENV PATH=/frontend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "start"  ]
# http connection is one-way 
# gotta create web-socket connection
# for 2 way connection
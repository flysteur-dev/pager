# Node
FROM node:lts-alpine as build

# Initialize
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

# Install requirements
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install --production \
	&& npm install react-scripts -g --production \
    && apk del .gyp

# Building app
COPY . /app
RUN npm run build

# Nginx
FROM nginx:stable-alpine

# Copying app build to nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# Adding reserve proxy conf
RUN rm /etc/nginx/conf.d/default.conf
COPY proxy.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
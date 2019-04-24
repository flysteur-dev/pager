FROM nginx

COPY build /usr/share/nginx/html
COPY proxy.conf /etc/nginx/default

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
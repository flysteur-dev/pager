FROM nginx

# Copying app build to nginx folder
COPY build /usr/share/nginx/html

# Adding reserve proxy conf
RUN rm /etc/nginx/conf.d/default.conf
COPY proxy.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
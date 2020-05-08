FROM nginx
COPY sisi-frontend/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
RUN su - &&\
    apt-get update &&\
    apt-get install certbot python-certbot-nginx -y
CMD ["nginx", "-g", "daemon off;"] 
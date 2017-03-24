FROM nginx:alpine

ADD ci/production/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080

COPY dist/ /usr/share/nginx/html
COPY ci/production/404.html /usr/share/nginx/html/404.html

FROM fholzer/nginx-brotli:v1.14.0
COPY ./prod/default.conf /etc/nginx/conf.d/default.conf 
COPY --from=andreaenterprisedockerid/client-prod:latest ./app/build /usr/share/nginx/html
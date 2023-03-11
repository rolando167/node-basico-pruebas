# node-basico-pruebas
node-basico-pruebas - nginx para pruebas



------------------------- configuracion nginx 
Descargar:
https://nginx.org/en/download.html
-------------------------
cambiar puerto defecto: 80 - conf/nginx.conf 

    server {
        listen       8080;

-------------------------
http://localhost:8080/

-------------------------

>start nginx

>nginx -s reload

>nginx -t


-------------------------
-------------------------
REFERENCIAS:

http://nginx.org/en/docs/windows.html


https://stackoverflow.com/questions/7646972/nginx-invalid-pid-number
https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms-es

https://gist.github.com/jonabasque/6cfe9c3b7fe0e20cef2cf6c87a943165

YT:
07 - Instalación, Configuración y Prueba de NGINX en Windows [NGINX - Español]

-------------------------
https://www.geeksforgeeks.org/express-js-app-get-request-function/


----------------------------

server {
    # Establece la dirección y puerto IP, o la ruta de un socket UNIX-domain en donde el servidor aceptará solicitudes.
    listen *:80;
    #listen      80  default_server; #Establece este servidor como predeterminado, en lugar del que incluye en nginx.conf  

    # Establece el dominio (header 'Host') para el que va a aceptar las solicitudes.
    server_name example.local www.example.local;


    # Para debug este ejercicio.
    access_log	/var/log/nginx/web-server-basic.conf.access.log combined;
    error_log   /var/log/nginx/web-server-basic.conf.error.log error;   


    # Cuando la URI comienza por / (todas)
    #location / {
     #   proxy_pass http://localhost:3009;
    #}


    # La URI es exacta a / (sin URI)
    location = / {
        # Redirigimos la solicitud al siguiente URL que puede ser HTTP, HTTPS y socket UNIX-domain
        proxy_pass http://localhost:3009;
        #proxy_pass http://unix:/tmp/backend.socket:/uri/;
    }

    # Cuando la URI empieza por /calc (DUDA: los parámetros no se tienen en consideración en el maching pero si se pasan al backend)
    location /calc {
        # 
	proxy_pass http://localhost:3009;
    }

     
    location /wrong {
        return 404;
    }


    # Cuando la URI comienza por /search ()
    location /search {
        # Hacemos un return de redirección a google (DUDA: que pasa con parámetros ? es posible que no se pasen como en proxy_pass)
        return 301 https://google.es;
    }


    # Cuando la URI termina en .html o .htm en minúsculas (case-sensitive)
    location ~ \.html? {
         return 403;    
    }


    # Las URI que empiecen por /media
    location /media {

        # Le agregamos al inicio de la URI /data (puesto que en el server tenemos /data/media/images o /data/media/videos )
        root /home/jonabasque/SISTEMAS/DOCS/NGINX/proxy-server/data ; # Hay que crear la ruta absoluta, quizás haya alguna directiva que establezca en $uri la ruta absoluta hasta un determinado sitio, como 'document_root' quizás. 

        # Activación de la funcón de autenticación y un título para la ventana modal.
	auth_basic           "Área de imagenes";
        # Ubicación del archivo donde se encuentran los pares user:password encripada.
        auth_basic_user_file /etc/nginx/.htpasswd;


	# Cuando la URI empiece por /images y otro bloque location de expresión regular coincida con esta URI, anula el de expresión regular y usa este location.
	location ^~ /media/images/ {
            # Reescribe la URI con la regexp y la path nueva usando las variables y con last 
            #rewrite ^(/media/images/.*/)\.(gif|jpg|jpeg|png)$ $1/imgs/$2 redirect;
            #return 403;

            # Intenta devolver el archivo de $uri, si no existe la de default, la cual puede ser un .html y si todas son false devuelve un 404.
	    try_files $uri /media/images/default.jpg =404; # Al menos hay que poner 2 parámetros.
	}

	# Cuando la URI termina en estas extensiones en mayusculas o minusculas (case-insensitive)
        location ~* \.(gif|jpg|jpeg|png) {
             
             # Desactiva la función de autenticación para este location
             auth_basic off;
             # Intenta devolver el archivo de $uri, si no existe la de default, la cual puede ser un .html y si todas son false ejecuta el location @images.
             try_files $uri /media/images/default.jpg @images;
        }

        # Cuando la URI termina en estas extensiones en mayusculas o minusculas (case-insensitive)
        location ~* \.(ogg|mp4|avi) {
            try_files $uri =200;
        }

    }


    # 
    location @images {
    
    }


}

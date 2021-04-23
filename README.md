# 11-ts-rest-server
Rest Server con typescript y conexión a base de datos relacional mariadb a través de sequelize ORM

Descargar y ejecutar ```npm install```.

Renombrar el archivo ```.example.env``` a ```.env``` y colocar el puerto, actualmente 8086

El nombre de la base de datos, el nombre de usuario de la base de datos y el password del usuario de la base de datos no es necesario colocarlo aquí, se deja así para futuras modificaciones pero debe colocarse en su lugar respetivo en el archivo ```db/connection.ts```

Para correr ejecutar en una terminal ```tsc --watch``` y en otra ```nodemon /dist/app```

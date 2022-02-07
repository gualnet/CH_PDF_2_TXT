# CH_PDF_2_TXT
A test repository

## General process: 
In the front app the user performs the upload of his pdt file.
The front sends the file to the server by a POST request on ../api/pdf.
Then a response is sent back to the front with a file identifier
and can then make a GET request on ../api/pdf/text/[identifier] to receive the text contained in the file.

## Start with docker
 - Use the docker compose file at the root of the project:
```
docker-compose up
```

## Start without docker
 - TO start the backend:
```
cd ./back
npm run dev
```
 - To start the frontend:
 ```
 cd ./front
 npm run start
 ```

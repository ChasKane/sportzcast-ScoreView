docker run -p 1337:1337 -v `pwd`:/etc/ -w /etc/ webapp

# docker stop $(docker ps -q --filter ancestor=<image-name> )

Helpful commands for testing

Start webapp docker container on port 1337 and with current directory mounted in container
```
docker run -p1337:1337 -v `pwd`:/src/ webapp
```

Stops webapp docker container automatically
```
docker stop $( docker ps -q --filter ancestor=webapp )
```

Copies <file> from disk to docker container
```
docker cp `pwd` $( docker ps -q --filter ancestor=webapp ):/src/
```

Enter webapp docker container shell
```
docker exec -it $( docker ps -q --filter ancestor=webapp ) /bin/bash
```

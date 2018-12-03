[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

Helpful commands for testing

Build `webapp` docker container
```
docker build -t webapp .
```

Start `webapp` on port 1337 and with current directory mounted in container
```
docker run -p1337:1337 -v `pwd`:/src/ webapp
```

Stops `webapp` automatically
```
docker stop $( docker ps -q --filter ancestor=webapp )
```

Copies <file> from disk to `webapp`
```
docker cp `pwd`/src/ $( docker ps -q --filter ancestor=webapp ):/src/
```

Enter `webapp` shell
```
docker exec -it $( docker ps -q --filter ancestor=webapp ) /bin/bash
```

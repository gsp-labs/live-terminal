# live-terminal
Sample repository to explore live terminal access for remote machines

## Custom build for linux arm64 
```
GOOS=linux GOARCH=arm64 go build -x -v -mod=vendor -ldflags "-X main.version=1 -w -s" -o "tty-share"
```

## Run ubuntu on docker
```
docker build -t ssh_on_docker . 

docker run -dit -p 3000:22 -v $(pwd)/assets:/assets ssh_on_docker:latest

docker run -dit --network=host -v $(pwd)/assets:/assets ssh_on_docker:latest
```

## Start public terminal access
Exec into running container
```
docker exec -it <container-id> /bin/bash
```

```
cd assets
chmod +x tty-share
./tty-share -public -no-wait
```

### Create key pair
```
ssh-keygen -t ed25519 -C "your_email@example.com"

eval "$(ssh-agent -s)"
```

---

## Upterm

### Create session
```
./upterm host --server wss://upterm-f232c0de815c.herokuapp.com --accept -- bash
```

> With keys
```
./upterm host --authorized-keys ../keys/keyfile.pub --server wss://upterm-f232c0de815c.herokuapp.com --accept -- bash

```
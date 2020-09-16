# @wilsjs/core

## manual packages

- certbot-1.0.0-r0
- certbot-nginx-1.0.0-r0
- htop-2.2.0-r0
- inotify-tools-3.20.1-r1
- nginx-1.16.1-r6
- nodejs-12.15.0-r1

```sh
apk add \
certbot-1.0.0-r0 \
certbot-nginx-1.0.0-r0 \
htop-2.2.0-r0 \
nginx-1.16.1-r6 \
nodejs-12.15.0-r1
```

---

## manual files

- /home/alpine/\*.sqlite3
- /home/alpine/wilsjs.pem

---

```sh
#!/sbin/openrc-run
# /etc/init.d/wilsjs-core

name="wilsjs-core"
description="todo"

command="/usr/bin/node"
command_args="--require dotenv/config server.js"
command_user="alpine"
supervisor="supervise-daemon"
supervise_daemon_args="--chdir '/home/alpine'"

start_post() {
  (inotifywait --event modify /home/alpine/server.js && rc-service wilsjs-core restart) &
}
```

```sh
#!/bin/sh
# /etc/periodic/weekly/certbot-renew.sh

/usr/bin/certbot renew --nginx --post-hook "rc-service nginx restart"
```

```sh
# /home/alpine/.env

AWS_ACCESS_KEY_ID=""
AWS_DEFAULT_REGION="ca-central-1"
AWS_SECRET_ACCESS_KEY=""
HOST="127.0.0.1"
NODE_ENV="production"
PINO_OPTIONS='{"redact":[]}'
PORT="8080"
ROOT="/home/alpine"
SECRET=""
```

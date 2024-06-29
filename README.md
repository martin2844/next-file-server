## Env Variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXT_AUTH_SECRET=secret
JWT_PASSWORD=1234
NEXT_PUBLIC_URL=http://localhost:3000
```

So it's important to have both the `NEXT_PUBLIC_URL` and the `NEXTAUTH_URL` set to the domain that you chose for your fileserver.
`JWT_PASSWORD` is the password used to get a JWT, so if you set it to `1234`, then you'll login as admin to upload files using `1234`

# Running it on your VPS

I use an Ubuntu VPS, where I have `pm2` installed.
You do need as well `node`

1. ssh into your vps
2. clone the repo into a location you'll remember I use `/var/www/`
3. build the server `npm run build`
4. Run the app with pm2 `pm2 start npm --name "file-server" -- start`
5. Save processes `pm2 save`
6. Setup NGINX or your file server
7. Point your domain towards your VPS
8. Get an ssl certificate running certbot.

## Nginx config

You can host with whatever server you like. I run NGINX on my vps this is how I set it up for my file server.

```nginx
server {
        server_name your.domain.com;
        location / {
                proxy_pass http://localhost:4001;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_connect_timeout 600;
                proxy_send_timeout 600;
                proxy_read_timeout 600;
                client_body_timeout 600;
                client_max_body_size 300M;
        }
}
```

## Todo open modal - delete

button to enable delete column that would be nice
set delete
actually delete if confirmed
set delete empty remove file and db entry

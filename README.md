# bone-native
A React Native Expo managed skeleton project configured for use with Bone Framework Oauth2 API.
## requirements
 - Expo CLI https://docs.expo.dev/get-started/installation/
 - Expo Go iOS https://apps.apple.com/us/app/expo-go/id982107779 
 - Expo Go Android https://play.google.com/store/apps/details?id=host.exp.exponent&gl=US 
 - Proxyman https://proxyman.io/ 
 - Optional but recommended for the backend is to use the Docker dev environment https://github.com/delboy1978uk/lamp.
## installation
### frontend
Clone the repository, then remove our git repo info and initialise your own, and commit the files
```
git clone git@github.com:delboy1978uk/bone-native.git newprojectname
cd newprojectname
rm -fr .git
git init
git add .
git commit -a
```
### backend
A configured project is available on the `feature/full` branch of Bone Framework here 
https://github.com/delboy1978uk/boneframework/tree/feature/full. 
This example uses the recommended Docker dev environment for the backend.
```
git clone git@github.com:delboy1978uk/lamp.git lampstack
cd lampstack
rm -fr .git
rm -fr code
git clone git@github.com:delboy1978uk/boneframework.git code
cd code
rm -fr .git
git init
git add .
git commit -a
```
## setup
### dev domain & ssl certificate 
You can edit the virtual host settings if using the Docker LAMP project in the `docker-compose.yml`, `build/httpd/Dockerfile`,
and `build/httpd/httpd-vhosts.conf`.
where self signed certificate generation code should be tweaked. The default dev domain is `https://awesome.scot`. Whatever you set
this domain as, remember to add `127.0.0.1 awesome.scot` (or your custom domain) to your development machine's `/etc/hosts` file.
If you change the domain name, be sure to run `docker compose build`.

Next you need the SSL certificate to be trusted on your iPhone/Android.

If using docker, start up the server, then copy the certificate from inside the docker container to a new file 
on your dev machine.
```
cd /path/to/lampstack
docker compose up
```
Open another tab, then jump into the container defined in the LAMP `docker-compose.yml` ...
```
docker compose exec awesome.scot bash
cd /etc/ssl/certs
cat selfsigned.crt
exit
```
Use whichever text editor you like to create `~/Desktop/selfsigned.crt`, pasting in the contents.

The following instructins are for iPhone. Android will be different, but the idea is to add the certificate to the Trust Store.

- Send your `selfsigned.crt` to your iPhone via airdrop, install the profile in the Settings app.
- On the iPhone, go into the Settings app and install the profile
- Startup Proxyman on your dev machine
- In your iPhone Wifi settings, set the proxy as your dev box IP and port 9090 (or whatever your proxy port is)
- Open Safari and goto `proxy.man/ssl`, again install the Profile in Settings
- Finally, go into `Settings > General > About > Certificate Trust Settings`, and switch on Enable Full Trust for both the proxy man cert and your dev domain self signed cert.
You should now be able to browse to `https://awesome.scot` on yoour iPhone, with a fully secure padlock.
### frontend
Frontend config files that should be changed are the `./app.json` in the project root and the files found in `./app/config`.
### backend
Backend Bone Framework config files are found in the `./config` folder.
Detailed instructions for how to configure the backend will be added in the future.
Quickly though, start up the lamp stack (see deverlopment section below) and then it's;
```
docker compose exec php bash
composer install
bone migrant:diff
bone migrant:migrate
bone migrant:generate-proxies
bone migrant:fixtures
bone assets:deploy
```
## development
Start up proxyman, and set your device's Wifi connection to use the proxy.

Start up the PHP backend. If using the docker LAMP stack then it's simply
```
cd /path/to/lampstack
docker compose up
```
Start up the frontend
```
cd /path/to/bone-native-project
yarn expo start
```
To stop the backend, press `CTRL-C`, then type `docker compose down` to tidy up. To stop the  frontend, it's simply `CTRL-C`.


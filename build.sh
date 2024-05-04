echo "----- Build process started @$(TZ='Asia/Kolkata' date "+%F %T %Z") ----- "
echo "----- Removing existing dist files -----"
rm -rf server/public/dist
rm -rf client/dist

echo "----- Installing the dependencies -----"
npm ci --prefix client
npm ci --prefix server

echo "----- Building frontend ----- "
npm run build --prefix client

echo "----- Moving frontend build to backed -----"
mv client/dist server/public/dist
echo "----- build process completed @$(TZ='Asia/Kolkata' date "+%F %T %Z") -----"
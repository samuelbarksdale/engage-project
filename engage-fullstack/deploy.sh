cd ../src/client/src/
pwd
yarn build
cd ../../server/src/
pwd
rm -rf ./public/*
ls ./public/
cp ../../client/src/build/ ./public
ls ./public/
docker build -t engage-server .

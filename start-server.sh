echo "starting Publisher..."
cd publisher
tsc
PORT=8000 MONGO_URL=mongodb://localhost:27017/pub-sub node ./dist/index.js &>/dev/null &
echo "Publisher started!"

echo "starting Subscriber..."
cd ..
cd subscriber
tsc
PORT=9000 node ./dist/index.js &>/dev/null &
echo "Subscriber started!"
curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/"}' http://localhost:8000/subscribe/topic1 
echo "\n"
curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:8000/publish/topic1
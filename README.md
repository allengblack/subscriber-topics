# Subscriber Topics

This application keeps track of Subscribers to various Topics. 
A Topic is any string and the subsriber is an HTTP URL.
When a message is published on a topic, it should be forwarded to all subscriber endpoints.

It was written using Typescript and NodeJS/Express and uses MongoDB as a database. There are two server applications bundled in this project. The server that keeps track of subscriptions is in the publisher directory. The other project is for a test subscriber URL that can be used to test.
To run this application, endure that you have a Mongo DB instance running and then set up environment variables as seen in the env.example file(s).

Then install all the dependencies using by running `yarn` in the directories of the publisher and subcriber respectively. Then inside each directory, the script "compile" should be run using `yarn compile" to transpile into JavaScript.
The server can then be run using `yarn start`.

To subscribe, send a POST request the publisher at route '/subscribe/{topic} where the Topic is any string. The body of the request takes one `url` parameter that is the URL of the endpoint that future pulish messages should be sent to.
To publish, send a POST request to '/publish/{topic} and the payload can be any valid JSON object is to be broadcast.

There are sample bash scripts to help with the demo. After the repo has been cloned, run `yarn` in the respective directories
and then use `start-server.sh` to start the servers. 
Once the servers are running, `sample.sh` makes sample CURL calls to the servers, both to subscribe to a topic and publish from it. <br>
NOTE: Remember to run `stop-server.sh` to stop the servers or they'll keep running in the background. Also note that the sample scripts set the demo servers to run on ports 8000 and 9000 respectively. If you have processes running on those ports, there will be conflicts.

Thank you for reading this far. 
I'm more than happy to answer any questions you have about this project.

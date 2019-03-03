# API Gateway

This contains the code for API Gateway, written in Rails <br />

All API requests go through API Gateway so that the UI remains light weight. Intention of the API Gateway is to make UI handle just the presentation aspect. <br />

Service Discovery is done by the API Gateway. All micro-services who registered with ZooKeeper will be discovered based on the ZNode path (such as /AuthServices, /RecoEngine etc) <br />

API Gateway is also responsible for acting as intermediary between Recommendation Engine and Profile Service. The RecoEngine needs history of logged in user, which is handled by Profile Service. RecoEngine asks the gateway for this information and gateway discovers the address of Profile Service and makes the required API call <br />

This, along with Zookeeper, is a single point of failure for the app

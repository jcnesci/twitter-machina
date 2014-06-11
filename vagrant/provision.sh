sudo apt-get update

sudo apt-get install -y python-software-properties

sudo add-apt-repository ppa:nginx/stable
sudo add-apt-repository ppa:chris-lea/node.js
#sudo add-apt-repository ppa:nilya/couchdb-1.3

sudo apt-get update

sudo apt-get install -y vim curl
sudo apt-get install -y build-essential
sudo apt-get install -y nginx
sudo apt-get install -y nodejs
#sudo apt-get install -y couchdb
sudo apt-get install -y default-jre

# We no longer need couch db setup, leaving this for reference
# couchdb config
#curl -X PUT http://localhost:5984/superbowl_dev_master
#curl -X PUT http://localhost:5984/superbowl_dev_slave

#curl -X POST http://localhost:5984/_replicator -H "Content-Type: application/json" -d "{\
#\"_id\": \"my_rep\",\
#\"source\": \"superbowl_dev_master\",\
#\"target\": \"superbowl_dev_slave\",\
#\"create_target\": true,\
#\"continuous\": true,\
#\"user_ctx\": {\
#\"name\": null,\
#\"roles\": [\"_admin\"],\
#\"create_target\": true\
#}\
#}"
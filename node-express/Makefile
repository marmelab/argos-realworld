DOCKER_COMPOSE = docker-compose -p conduit --project-directory ..
TESTS_DIR=../tests

install:
	cd api && yarn

restore:
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_COMPOSE) exec -T mongo mongo localhost:27027/conduit --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_COMPOSE) exec -T mongo mongorestore --uri mongodb://localhost:27027/conduit --gzip --archive=/data/dump.zip

dump:
	mongodump --gzip --archive=$(TESTS_DIR)/data/dump.zip --uri mongodb://localhost:27027/conduit

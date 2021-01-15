default: help

### select API_DIR and CLIENT_DIR here
############################################################
API_DIR ?= node-express
CLIENT_DIR ?= react-redux
# CLIENT_DIR ?= vanilla-js-web-components
############################################################

TESTS_DIR = .

DOCKER_COMPOSE = docker-compose -p conduit --project-directory . -f ${API_DIR}/docker-compose.yml -f ${CLIENT_DIR}/docker-compose.yml
DOCKER_COMPOSE_TEST = ${DOCKER_COMPOSE} -f docker-compose.test.yml
DOCKER_MONGO = docker-compose -p conduit --project-directory . -f ${API_DIR}/docker-compose.yml

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: ## Install all dependencies
	cd ${API_DIR}/api && yarn
	cd ${CLIENT_DIR}/client && yarn
	cd ${TESTS_DIR}/tests && yarn

build: ## Build client
	cd ${CLIENT_DIR}/client && yarn build

start: install build ## Start project inside docker (Db, API and Client)
	$(DOCKER_COMPOSE) up

stop: ## Stop all docker containers
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE_TEST) down

import-db:
	$(DOCKER_MONGO) exec db sh -c "psql --username=test foobar < app/data/pagila-insert-data.sql"

test-docker-environment-start:
	$(DOCKER_COMPOSE_TEST) up -d --force-recreate

test-docker-environment-restart:
	$(DOCKER_COMPOSE_TEST) restart cypress

test-open: ## Start local tests
	cd ${TESTS_DIR}/tests && CYPRESS_BASE_URL="http://localhost:8080/" MONGO_URL="mongodb://localhost:27027/conduit" yarn run cypress open

setup-test: install build test-docker-environment-start  ## Setup tests

run-test: ## Start automated tests
	rm -rf ${TESTS_DIR}/tests/data/timeline.txt
	$(DOCKER_COMPOSE_TEST) exec -T cypress yarn wait-and-test

dump:
	mongodump --gzip --archive=${TESTS_DIR}/tests/data/dump.zip --uri mongodb://localhost:27027/conduit

restore:
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_MONGO) exec -T mongo mongo localhost:27027/conduit --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_MONGO) exec -T mongo mongorestore --uri mongodb://localhost:27027/conduit --gzip --archive=/data/dump.zip

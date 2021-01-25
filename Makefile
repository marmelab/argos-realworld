default: help

### select API_DIR and CLIENT_DIR here
############################################################
<<<<<<< HEAD
API_DIR ?= node-express
# CLIENT_DIR ?= react-redux
CLIENT_DIR ?= vanilla-js-web-components
=======
# API_DIR = node-express
API_DIR = rails
<<<<<<< HEAD
CLIENT_DIR = react-redux
# CLIENT_DIR = vanilla-js-web-components
>>>>>>> d4920cd... first import of rails
=======
# CLIENT_DIR = react-redux
CLIENT_DIR = vanilla-js-web-components
>>>>>>> e85809d... fix password pb and prepare for importing db
############################################################

TESTS_DIR = .

DOCKER_COMPOSE = docker-compose -p conduit --project-directory . -f ${API_DIR}/docker-compose.yml -f ${CLIENT_DIR}/docker-compose.yml
DOCKER_API = docker-compose -p conduit --project-directory . -f ${API_DIR}/docker-compose.yml
ifeq ($(API_DIR),node-express)
DOCKER_COMPOSE_TEST = ${DOCKER_COMPOSE} -f docker-compose.test.node-express.yml
else
DOCKER_COMPOSE_TEST = ${DOCKER_COMPOSE} -f docker-compose.test.rails.yml
endif

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
ifeq ($(API_DIR),node-express)
	cd ${TESTS_DIR}/tests && CYPRESS_BASE_URL="http://localhost:8080/" MONGO_URL="mongodb://localhost:27027/conduit" yarn run cypress open
else
	cd ${TESTS_DIR}/tests && CYPRESS_BASE_URL="http://localhost:8080/" yarn run cypress open
endif

setup-test: install build test-docker-environment-start  ## Setup tests

run-test: ## Start automated tests
	rm -rf ${TESTS_DIR}/tests/data/timeline.txt
	$(DOCKER_COMPOSE_TEST) exec -T cypress yarn wait-and-test

dump:
ifeq ($(API_DIR),node-express)
	mongodump --gzip --archive=${TESTS_DIR}/tests/data/dump.zip --uri mongodb://localhost:27027/conduit
	# mongoexport --uri mongodb://localhost:27027/conduit --out dump.json
else
	sqlite3 rails/api/db/development.sqlite3 .dump > ${TESTS_DIR}/tests/data/dump-rails.sql
endif

restore:
ifeq ($(API_DIR),node-express)
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_API) exec -T mongo mongo localhost:27027/conduit --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_API) exec -T mongo mongorestore --uri mongodb://localhost:27027/conduit --gzip --archive=/data/dump.zip
else
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_API) exec -T api bundle exec rake db:reset
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_API) exec -T api bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_API) exec -T api sqlite3 db/development.sqlite3 < tests/data/dump-rails.sql
endif

import-rails:
	sqlite3 rails/api/db/development.sqlite3 < ${TESTS_DIR}/tests/data/dump-rails.sql

reinit-rails:
	$(DOCKER_API) exec api bundle exec rake db:reset
	$(DOCKER_API) exec api bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup

connect-api:
	$(DOCKER_API) exec api bash

connect-cypress:
	$(DOCKER_COMPOSE_TEST) exec cypress bash

default: help

### select API_DIR and CLIENT_DIR here
############################################################
# API_DIR ?= node-express
API_DIR ?= rails
# CLIENT_DIR ?= react-redux
CLIENT_DIR ?= vanilla-js-web-components
############################################################

TESTS_DIR = tests

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
	$(MAKE) -C $(API_DIR) install
	$(MAKE) -C $(CLIENT_DIR) install
	cd ${TESTS_DIR} && yarn

start: install ## Start project inside docker (Db, API and Client)
	$(DOCKER_COMPOSE) up

stop: ## Stop all docker containers
	$(DOCKER_COMPOSE_TEST) down --remove-orphans

test-docker-environment-start:
	$(DOCKER_COMPOSE_TEST) up -d --force-recreate

test-docker-environment-restart:
	$(DOCKER_COMPOSE_TEST) restart cypress

setup-test: install test-docker-environment-start  ## Setup tests

run-test: ## Start automated tests
	rm -rf ${TESTS_DIR}/data/timeline.txt
	$(DOCKER_COMPOSE_TEST) exec -T cypress yarn wait-and-test

restore: ## Restore fixtures in DB
	$(MAKE) -C $(API_DIR) restore

test-open: ## Start local tests
ifeq ($(API_DIR),node-express)
	cd ${TESTS_DIR} && CYPRESS_BASE_URL="http://localhost:8080/" MONGO_URL="mongodb://localhost:27027/conduit" yarn run cypress open
else
	cd ${TESTS_DIR} && CYPRESS_BASE_URL="http://localhost:8080/" yarn run cypress open
endif

connect-api:
	$(DOCKER_API) exec api bash

connect-cypress:
	$(DOCKER_COMPOSE_TEST) exec cypress bash

default: help

DOCKER_COMPOSE_TEST = docker-compose -p conduit -f docker-compose.yml -f docker-compose.test.yml


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: ## Install all dependencies
	cd ./api && yarn
	cd ./client && yarn
	cd ./tests && yarn

build: ## Build client
	cd ./client && yarn build

start: ## Start project inside docker (Db, API and Client)
	docker-compose up

stop: ## Stop all docker containers
	docker-compose down
	$(DOCKER_COMPOSE_TEST) down

import-db:
	docker-compose exec db sh -c "psql --username=test foobar < app/data/pagila-insert-data.sql"

install-test-deps:
	cd ./tests && yarn
	#docker-compose run client yarn

test-docker-build:
	#$(DOCKER_COMPOSE_TEST) run client yarn build

test-docker-environment-start:
	$(DOCKER_COMPOSE_TEST) up -d --force-recreate

test-docker-environment-restart:
	$(DOCKER_COMPOSE_TEST) restart cypress

test-open: ## Start local tests
	cd tests && yarn run cypress open


setup-test: install build install-test-deps test-docker-environment-start  ## Setup tests

run-test: ## Start automated tests
	rm -rf tests/data/timeline.txt
	$(DOCKER_COMPOSE_TEST) exec -T cypress yarn wait-and-test

dump:
	mongodump --gzip --archive=tests/data/dump.zip --uri mongodb://localhost:27027/conduit

restore:
	COMPOSE_PROJECT_NAME="conduit" ./bin/mongo.sh --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
	COMPOSE_PROJECT_NAME="conduit" ./bin/mongorestore.sh --gzip --archive=/data/dump.zip

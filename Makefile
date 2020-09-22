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

import-db:
	docker-compose exec db sh -c "psql --username=test foobar < app/data/pagila-insert-data.sql"

install-test-deps:
	cd ./tests && yarn
	#docker-compose run client yarn

test-docker-build:
	#$(DOCKER_COMPOSE_TEST) run client yarn build

test-docker-environment-start:
	$(DOCKER_COMPOSE_TEST) up -d


test-open: ## Start local tests
	cd tests && yarn run cypress open


setup-test: install build install-test-deps test-docker-environment-start  ## Setup tests

run-test: ## Start automated tests
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps --name=client_cypress_run cypress bash -ci 'yarn wait-and-test'

dump:
	mongodump --gzip --archive=tests/data/dump.zip --uri mongodb://mongo:27027/conduit

restore:
	mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})' mongodb://mongo:27027/conduit
	mongorestore --gzip --archive=tests/data/dump.zip --uri mongodb://mongo:27027/conduit

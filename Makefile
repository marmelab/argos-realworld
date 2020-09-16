default: help

DOCKER_COMPOSE_TEST = docker-compose -p film-db -f docker-compose.yml -f docker-compose.test.yml


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

start: ## Start project inside docker (Db, API and Client)
	docker-compose up

import-db:
	docker-compose exec db sh -c "psql --username=test foobar < app/data/pagila-insert-data.sql"

install-admin-deps:
	docker-compose run client npm install

test-docker-build:
	$(DOCKER_COMPOSE_TEST) run client yarn build

test-docker-environment-start:
	$(DOCKER_COMPOSE_TEST) up -d
	$(MAKE) test-docker-build
	#$(MAKE) test-update-db
	#$(MAKE) test-load-fixtures


test-open: ## Start local tests
	cd tests && npm run cypress open


setup-test: install-admin-deps test-docker-build test-docker-environment-start  ## Setup tests

run-test: ## Start automated tests
	$(DOCKER_COMPOSE_TEST) run --rm --no-deps --name=client_cypress_run cypress bash -ci 'npm wait-and-test'

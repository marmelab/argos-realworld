DOCKER_COMPOSE = docker-compose -p conduit --project-directory ..
TESTS_DIR=../tests
install:

restore:
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_COMPOSE) exec -T api bundle exec rake db:reset
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_COMPOSE) exec -T api bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup
	COMPOSE_PROJECT_NAME="conduit" $(DOCKER_COMPOSE) exec -T api sqlite3 db/development.sqlite3 < $(TESTS_DIR)/data/dump-rails.sql

dump:
	mongodump --gzip --archive=$(TESTS_DIR)/data/dump.zip --uri mongodb://localhost:27027/conduit

import-rails:
	sqlite3 rails/api/db/development.sqlite3 < $(TESTS_DIR)/data/dump-rails.sql

reinit-rails:
	$(DOCKER_COMPOSE) exec api bundle exec rake db:reset
	DOCKER_COMPOSECO) exec api bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup

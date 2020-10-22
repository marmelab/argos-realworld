FROM cypress/included:5.1.0

## Install mongo cli
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN apt-get update
RUN apt-get install -y mongodb-org-shell
RUN apt-get install -y mongodb-org-tools

# by default cypress is run once container is started (because of inherited image)
# we don't want this behaviour but instead want to launch it using `make test-run`
# using the `tail` command makes this container do nothing but wait so we can still
# run `docker exec` commands within it (and so run `make test-run`)
ENTRYPOINT [""]
CMD ["tail", "-f", "/dev/null"]

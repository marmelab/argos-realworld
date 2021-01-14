FROM ruby:2.2.2

RUN apt-get update -qq && apt-get install -y nodejs

WORKDIR /app

COPY api/Gemfile rails/api/
COPY api/Gemfile.lock rails/api/
COPY . /app
RUN cd api && bundle install

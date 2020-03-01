## <a href="https://ibb.co/cuWEim"><img width="100%" src="https://preview.ibb.co/kkCy9R/project_logo.png" alt="project_logo" border="0"></a>

[![Build Status](https://travis-ci.org/CharlyJazz/Rails-Graphql-React-Apollo.svg?branch=master)](https://travis-ci.org/CharlyJazz/Rails-Graphql-React-Apollo)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A project to learn a lot of tecnologies and build something awesome and great inspired on Medium.

**You can use this API to create your own front end to study new frameworks of stacks.**

## Getting Started

The easy way to start is to clone this repo, read the prerequisites and then get a Ruby package manager to install everything. We recommend rbenv or RVM to handler this task.

### Prerequisites

- Ruby v2.4.2
- Gem v2.6.14+
- Bundler v1.16.1+

### Installing

Get only one package manager and install Ruby depending of your choice

- rbenv - [Install Guide](https://github.com/rbenv/rbenv)

```
$ rbenv install 2.4.2
```

- RVM - [Install Guide](https://rvm.io/rvm/install)

```
$ rvm install 2.4.2
```

#### Then follow the next instrucctions:

1. Integrate bundler :

```
$ gem install bundler
```

2. Go to the Project's directory and install all the dependencies with:

```
$ bundle install
```

3. Configurate the Data Base with:

```
$ rails db:schema:load && rails db:seed
```

## Docker

Resource: https://www.digitalocean.com/community/tutorials/containerizing-a-ruby-on-rails-application-for-development-with-docker-compose

```bash
$ docker-compose up -d
$ docker-compose exec app bundle exec rake db:setup db:migrate db:seed
```

Check http://localhost:3000/graphiql

## Built With

- Ruby on Rails
- Graphql - Query language for APIs
- JWT

## You can build your own front end, some ideas:

- React - JavaScript library for building user interfaces
- Apollo - Get everything you need from Graphql.
- React Native - Cross platform mobile framework
- Angular
- Svelte
- Electron

## Project Status

Backend ready to use, tested. But you can improve this, some ideas:

- Cache Strategies
- Send emails for events like register, recover password.

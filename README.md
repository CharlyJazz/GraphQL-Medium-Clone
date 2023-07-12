## <a href="https://ibb.co/cuWEim"><img width="100%" src="https://preview.ibb.co/kkCy9R/project_logo.png" alt="project_logo" border="0"></a>

[![Build Status](https://travis-ci.org/CharlyJazz/Rails-Graphql-React-Apollo.svg?branch=master)](https://travis-ci.org/CharlyJazz/Rails-Graphql-React-Apollo)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A project to learn a lot of tecnologies and build something awesome and great inspired on Medium the blog website.

**You can use this API to create your own front end to study new frameworks of stacks.**

You can inspect the API in Graphiql in the url: http://localhost:3000/graphiql

<p align="center">
  <img width="650px" src="https://user-images.githubusercontent.com/12489333/253039348-17477d43-0903-49b3-81c5-4d6b91a05eb9.png">
</p>

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

### Docker Compose

Resource: https://www.digitalocean.com/community/tutorials/containerizing-a-ruby-on-rails-application-for-development-with-docker-compose

```bash
$ docker-compose up -d
$ docker-compose exec app bundle exec rake db:setup db:migrate db:seed
```


### How to build the Dockerfile without Docker Compose

```bash
$ docker run --name database_for_ruby -e POSTGRES_DB=medium_graphql -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:9.4
$ docker build . -t ruby && docker run --env-file ./.env -p 3000:3000 --link database_for_ruby ruby -t ruby_graphql_backend
```

Check http://localhost:3000/graphiql

### Built With

- Ruby on Rails
- Graphql - Query language for APIs
- JWT

### You can build your own front end, some ideas:

- React - JavaScript library for building user interfaces
- Apollo - Get everything you need from Graphql.
- React Native - Cross platform mobile framework
- Angular
- Svelte
- Electron


### GraphQL Mutations and Queries:


| GraphQL Mutation                                      | Description                                                                                                                                                                                                                                                  |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| addOrRemovePostsToCollection                           | Add or remove posts from a collection based on the provided post IDs.                                                                                                                                                                                        |
| addOrRemoveTagsToPost                                 | Add or remove tags from a post based on the provided tag IDs.                                                                                                                                                                                                |
| createBookmark                                        | Create a bookmark to save a post for later reading.                                                                                                                                                                                                          |
| createClap                                            | Add claps to a post with the specified number of claps.                                                                                                                                                                                                     |
| createCollection                                      | Create a collection and add posts to it.                                                                                                                                                                                                                    |
| createComment                                         | Create a comment on a post.                                                                                                                                                                                                                                 |
| createPost                                            | Create a new post with the specified title, body, picture, topic, and tags.                                                                                                                                                                                 |
| createUser                                            | Create a new user with the provided username, first name, last name, bio, picture, and credentials.                                                                                                                                                       |
| deleteBookmark                                        | Permanently delete a bookmark with the provided ID.                                                                                                                                                                                                         |
| deleteCollection                                      | Permanently delete a collection with the provided ID.                                                                                                                                                                                                       |
| deleteComment                                         | Permanently delete a comment with the provided ID.                                                                                                                                                                                                          |
| deletePost                                            | Permanently delete a post with the provided ID.                                                                                                                                                                                                             |
| editCollection                                        | Edit the title, description, and/or picture of a collection.                                                                                                                                                                                                |
| editComment                                           | Edit the body of a comment.                                                                                                                                                                                                                                 |
| editPost                                              | Edit the title, body, picture, and/or topic of a post.                                                                                                                                                                                                      |
| refreshPassword                                       | Update the password using an email, password, and token for password recovery.                                                                                                                                                                              |
| signInUser                                            | Authenticate a user using email and password and retrieve a token.                                                                                                                                                                                          |
| updateToken                                           | Update the token for password recovery using the email.                                                                                                                                                                                                     |

| GraphQL Query                                         | Description                                                                                                                                                                                                                                                  |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| allCollections                                        | Get all collections based on the provided filter.                                                                                                                                                                                                           |
| allPosts                                              | Get all posts based on the provided filter.                                                                                                                                                                                                                 |
| allTags                                               | Get all tags based on the provided filter.                                                                                                                                                                                                                  |
| allTopics                                             | Get all topics.                                                                                                                                                                                                                                             |
| allUsers                                              | Get all users based on the provided filter.                                                                                                                                                                                                                 |
| searchBookmark                                        | Search for a bookmark with the provided ID.                                                                                                                                                                                                                 |
| searchCollection                                      | Search for a collection with the provided ID.                                                                                                                                                                                                               |
| searchComment                                         | Search for a comment with the provided ID.                                                                                                                                                                                                                  |
| searchPost                                            | Search for a post with the provided ID.                                                                                                                                                                                                                     |
| searchTopic                                           | Search for a topic with the provided ID.                                                                                                                                                                                                                    |
| searchUser                                            | Search for a user with the provided ID or username.                                                                                                                                                                                                         |

### Project Status

Backend ready to use, tested. But you can improve this, some ideas:

- Cache Strategies
- Send emails for events like register, recover password.

<a href="https://ibb.co/cuWEim"><img width="100%" src="https://preview.ibb.co/kkCy9R/project_logo.png" alt="project_logo" border="0"></a>
----------------------
[![Build Status](https://travis-ci.org/CharlyJazz/Rails-Graphql-React-Apollo.svg?branch=master)](https://travis-ci.org/CharlyJazz/Rails-Graphql-React-Apollo)


## Getting Started

The easy way to start is to clone this repo, read the prerequisites and then get a Ruby package manager to install everything. We recommend rbenv or RVM to handler this task.

### Prerequisites

* Ruby v2.4.2
* Gem v2.6.14
* Bundler v1.16.1

### Installing

Get only one package manager and follow the instructions depending on your choice

* rbenv - [Install Guide](https://github.com/rbenv/rbenv)
* RVM - [Install Guide](https://rvm.io/rvm/install)


#### If you installed rbenv


#### If you installed RVM

1. Install Ruby:
```
  rvm install 2.4.2
```
  
2. Integrate bundler : 
```
  gem install bundler
```

3. Go to the Project's directory and install all the dependencies with:
```
bundle install
```

4. Configurate the Data base with:
```
rails db:schema:load && rails db:seed
```

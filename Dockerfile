FROM ruby:2.4.2
ENV BUNDLER_VERSION=1.16.6
RUN gem install bundler -v 1.16.6
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install
COPY . ./
ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]

#!/bin/bash
set -e

bundle exec rails db:migrate
bundle exec rails db:seed

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
bundle exec rails server -b 0.0.0.0

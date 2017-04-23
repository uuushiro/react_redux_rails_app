#!/bin/sh -x
RAILS_ROOT=`(cd \`dirname $0\`/../; pwd)`
RAILS_ENV=$1 # development or test

# 引数無しで実行された場合は、development と test の双方で実行
if [ -z "$RAILS_ENV" ]; then
  $0 development && $0 test
  exit
fi

cd $RAILS_ROOT

TABLE_OPTIONS='ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPRESSED'

if [ "$RAILS_ENV" != "production" ]; then
  bundle exec rake db:drop    RAILS_ENV=$RAILS_ENV
  bundle exec rake db:create  RAILS_ENV=$RAILS_ENV
  bundle exec ridgepole -c config/database.yml -f db/ridgepole.rb --apply --table-options="$TABLE_OPTIONS" --env=$RAILS_ENV
fi

if [ "$RAILS_ENV" == "development" ]; then
  bundle exec annotate
  bundle exec rake db:schema:dump
fi

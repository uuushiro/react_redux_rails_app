#!/bin/sh -x

RAILS_ROOT=`(cd \`dirname $0\`/../; pwd)`
RAILS_ENV=$1 # development or test

TABLE_OPTIONS='ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPRESSED'

cd $RAILS_ROOT || exit
bundle exec ridgepole -c config/database.yml -f db/ridgepole.rb --apply --table-options="$TABLE_OPTIONS" --env=development $@
bundle exec ridgepole -c config/database.yml -f db/ridgepole.rb --apply --table-options="$TABLE_OPTIONS" --env=test $@

bundle exec rake db:schema:dump
bundle exec annotate

if [ "$RAILS_ENV" == "test" ]; then
    bundle exec rake parallel:create
    bundle exec rake parallel:prepare
fi


#!/bin/sh -x
RAILS_ROOT=`(cd \`dirname $0\`/../; pwd)`
RAILS_ENV=$1 # development or test

# 引数無しで実行された場合は、development と test の双方で実行
if [ -z "$RAILS_ENV" ]; then
  $0 development && $0 test
  exit
fi

if [ "$RAILS_ENV" == "dev" ]; then
  RAILS_ENV="development"
fi

cd $RAILS_ROOT
$RAILS_ROOT/bin/schema_clear.sh $RAILS_ENV || exit

if [ "$RAILS_ENV" == "development" ]; then
  # bundle exec rake development:menu:tags:init RAILS_ENV=$RAILS_ENV
  bundle exec rake backyard_user:init
  bundle exec rake db:seed:development
  $RAILS_ROOT/bin/schema_update.sh # import したメニューのカラム補正
fi

# overwrite db:migrate or db:dump
task 'db:migrate' => :environment do
  ENV['RAILS_ENV'] ||= "development"
  table_options = 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPRESSED'
  sh "ridgepole -E#{ENV['RAILS_ENV']} -c config/database.yml -f db/ridgepole.rb --table-options='#{table_options}' --apply --dump-without-table-options"
end

task 'db:dump' => :environment do
  ENV['RAILS_ENV'] ||= "development"
  table_options = 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPRESSED'
  sh "ridgepole -E#{ENV['RAILS_ENV']} -c config/database.yml -o db/ridgepole.rb --table-options='#{table_options}' --export"
end

# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  message    :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Todo < ApplicationRecord
end

# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  text       :text(65535)
#  completed  :boolean          default("0"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Todo < ApplicationRecord
end

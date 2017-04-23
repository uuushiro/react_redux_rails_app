%w(hello goodmorning goodevening).each do |message|
  Todo.create!(message: message)
end

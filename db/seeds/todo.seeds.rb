%w(hello goodmorning goodevening).each do |text|
  Todo.create!(text: text)
end

class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Todo.all
  end

  def create
    todo = Todo.create!(todo_params)
    render json: {id: todo.id, text: todo.text}
  end

  private
  def todo_params
    params.require(:todo).permit(:text, :completed)
  end
end

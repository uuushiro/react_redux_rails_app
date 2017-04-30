class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_todo, only: :toggle

  def index
    render json: Todo.all
  end

  def create
    todo = Todo.create!(todo_params)
    render json: {id: todo.id, text: todo.text}
  end

  def toggle
    if @todo.completed?
      @todo.update!(completed: false)
    else
      @todo.update!(completed: true)
    end
    render json: {id: @todo.id}
  end

  private

  def set_todo(name = 'todo_id')
    @todo = Todo.find(params[name])
  end

  def todo_params
    params.require(:todo).permit(:text, :completed)
  end
end

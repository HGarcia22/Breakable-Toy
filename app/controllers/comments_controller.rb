class CommentsController < ApplicationController
  before_action :authorize_user, except: [:index, :show]
  def create

  end
end

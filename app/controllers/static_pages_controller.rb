class StaticPagesController < ApplicationController
	def home
		render html: "hi!"
	end
end

require 'net/https'
# require 'uri'
# require 'json'
class TopController < ApplicationController
	def index

		# リクエストを送信
		uri = URI.parse("https://youtubetitleapitest.herokuapp.com/random")
		http = Net::HTTP.new(uri.host, uri.port)
		http.use_ssl = true
		http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		req = Net::HTTP::Get.new(uri.path)
		res = http.request(req)

		# 結果取得
		if res.code == '200'
			result = ActiveSupport::JSON.decode res.body
		else
			puts "OMG!! #{res.code} #{res.message}"
		end

		# render
		render html: result
	end
end

require.config({
	baseUrl: "/",
	paths: {
		"nav": "module/nav",
		"jquery": "libs/jquery/jquery-1.11.3",
		"bootstrap": "libs/bootstrap/js/bootstrap",
		"tools": "libs/tools",
		"move":"libs/move"
	},
	//垫片
	shim:{
		"bootstrap": {
			deps: ["jquery"]
		}
	}
})

require.config({
	baseUrl: "/",
	paths: {
		"footer": "module/footer",
		"jquery": "libs/jquery/jquery-1.11.3",
		"bootstrap": "libs/bootstrap/js/bootstrap",
		"tools": "libs/tools",
		"template": "libs/template-web",
		"gVerify":"libs/gVerify",
		"migrate": "libs/jquery-migrate-1.2.1.min",
		"jquerycookie": "libs/jquery.cookie",
		"header":"module/header",
		"addcar":"module/addcar"
		
	},
	//垫片
	shim:{
		"bootstrap": {
			deps: ["jquery"]
		}
	}
})

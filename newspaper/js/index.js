requirejs.config({
	paths: {
		text: 'require_plugins/text',
		json: 'require_plugins/json',
	},
	shim: {
		'krpano': {
			init: function() {
				var bgId = localStorage.getItem('bgId'),
					start_page = 0, //0-首页；1-静态；2-动态; 3-专辑列表
					preset_data = [{
							xml: "xml/scenes/IndexScene.xml",
							content_data: "../data/index_data.json"
						}, {
							xml: "xml/scenes/GalleryScene.xml",
							content_data: "../data/chaoxiyou.json",
							episodes:1
						}, {
							xml: "xml/scenes/MotionComicScene.xml",
							content_data: "../data/child.json",
							episodes:1
						}, {
							xml: "xml/scenes/PosterScene.xml",
							episodes:3
						}],
					initvars = {
						hasBg: !!bgId,
						bgId: bgId > 0 ? bgId : 0,
						page: 0,
						indexData: preset_data[0].content_data,
						data_: preset_data[start_page].content_data,
						episodes_: preset_data[start_page].episodes,
						poster_: "%SWFPATH%/img/static_comic/chaoxiyou/poster.jpg"
					};

				embedpano({
					xml: preset_data[start_page].xml,
					target: "pano",
					html5: "only+webgl",
					mobilescale: 1.0,
					consolelog: true,
					initvars: initvars,
					onready:krOnReady
				});
				
				function krOnReady(kr){
					krpano = kr;//不加var声明是为了变成全局变量方便控制台命令调试
					window.KRPANO ={
						call: function(){
							var action = arguments[0];
							
							for(var i=1; i<arguments.length; i++){
								if(typeof arguments[i] == 'object'){
									arguments[i] = escape(JSON.stringify(arguments[i]));
								}
							}
							var args = Array.prototype.slice.call(arguments,1).join(",");
							kr.call(action+"("+args+")+");
						}
					}
				}
				
			}
		}
	}
});

require(["krpano", "text", "json"]);
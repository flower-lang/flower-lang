package retro.vm;

import retro.vm.Application;
using retro.vm.Application;

//Flowerで作成されたアプリケーションから、別言語のソースコードを生成するクラス
class Compiler{
	private var app : Application;
	public function new(app:Application) {
		this.app = app;
	}
	public function compile(lang:String) {
		if(lang == "js") {
		}else if(lang == "Java") {
		}else if(lang == "obj-c") {
		}else if(lang == "c++") {
		}else if(lang == "go") {
		}else if(lang == "scala") {
		}else if(lang == "python") {
		}
		trace(this.app.getName());
	}
}
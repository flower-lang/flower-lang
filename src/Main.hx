package;

import haxe.macro.Expr;
import retro.pub.Editor;

@:expose
class Main{
	public static function main(){
		var load = function(){
			Editor.create();
		};
	}
	public static function init(dom:Dynamic){
			Editor.create(dom);
	}

	public static function codeiq(){
		Editor.createCodeIQ();
	}
}


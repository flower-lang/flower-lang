

class Build{
	public static function main(){
		var args = Sys.args();
		if( args[0] == null ){
			trace("building all");
			Sys.command("neko", ["buildtools/MakeDialog.n", "modules.json", "exports/js/dialog.js"]);
			Sys.command("haxe", ["hxmls/build.hxml"]);
		}
		trace("building end");
	}
}
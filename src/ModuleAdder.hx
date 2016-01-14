import haxe.macro.Expr;
import haxe.macro.Context;

class ModuleAdder{
	macro public static function add(filename : String){
		var jsonString = haxe.Resource.getString(filename);
		var json : List<Dynamic> = haxe.Json.parse(jsonString);
		var result : Array<Expr> = [];
		for( pkg in json  ){
			var pkgName = pkg.name;
			var classNames : { none : List<String>, 
							 virtualDevice : List<String> } = pkg;
			for( className in classNames.none ){
				var newExpr = { 
						expr : ENew({ name : className, params : [],  pack : ["retro","library",pkgName]}, []),
						pos : Context.currentPos(),
					};
				var addExpr = macro this.modules.push($newExpr);
				result.push( addExpr );
			}
			for( className in classNames.virtualDevice ){
				var newExpr = { 
						expr : ENew({ name : className, params : [],  pack : ["retro","library",pkgName]}, 
							[{ expr : EConst(CIdent("virtualDevice")), 
							   pos : Context.currentPos() }]),
						pos : Context.currentPos(),
					};
				var addExpr = macro this.modules.push($newExpr);
				result.push( addExpr );
			}
		}
		return {
			expr : EBlock(result),
			pos : Context.currentPos(),
		};
	}
}
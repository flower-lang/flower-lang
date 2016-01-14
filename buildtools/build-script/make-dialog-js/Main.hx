import haxe.io.Output;
import haxe.Json;
import sys.FileSystem;
import sys.io.File;
using Lambda;


class Main{
	public static function main(){
		var args = Sys.args();
		var inputFilename = args[0];
		var outputFilename = args[1];

		var inputJson:Array<Dynamic> = Json.parse(File.getContent(inputFilename));
		
		var outputJson : Array<{key : String, value : Array<String>}>  = [];
		for(pkg in inputJson) {
			outputJson.push({key : pkg.name, value : pkg.none.concat(pkg.virtualDevice)});
		}
		
		 var str = haxe.Resource.getString("template");
		 var template = new haxe.Template(str);

		 var output = File.write(outputFilename);
		 output.writeString(template.execute({json : outputJson}));
		 output.close();
	}	
}
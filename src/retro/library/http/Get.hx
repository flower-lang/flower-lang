package retro.library.http;

import haxe.Http;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Get implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Get";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
    	this.inputs.add("url", RetroType.RNumber);
		this.inputs.add("params", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var url = params.get("url");
		var params = params.get("params");
		if(url.isEmpty() && params.isEmpty()) {
			cb(null);
			return;
		}
		
		var http = new Http(url);
		http.onData = function(data) {
			var result = new Result();
			result.set("value", Json.parse(data));
			cb(result);
		}
		//http.setParameter("pin", pin_no);
		http.request(true);
	}

	public function getModuleName() {
		return "http.Get";
	}
}

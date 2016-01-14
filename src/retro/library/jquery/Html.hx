package retro.library.jquery;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Html implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Html";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("jquery", RetroType.RNumber);
		this.inputs.add("html", RetroType.RNumber);
		this.outputs.add("jquery", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var jquery = params.get("jquery");
		var html = params.get("html");
		if(html.isEmpty() || jquery.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("jquery", jquery.getValue().html(html.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "jquery.Html";
	}
}

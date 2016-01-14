package retro.library.jquery;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Find implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Find";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("selector", RetroType.RNumber);
		this.outputs.add("jquery", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var selector = params.get("selector");
		if(selector.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("jquery", new js.JQuery('body').find(selector.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "jquery.Find";
	}
}



package retro.library.string;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class ChatAt implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "ChatAt";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("string", RetroType.RNumber);
    	this.inputs.add("index", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var string = params.get("string");
		var index = params.get("index");
		if(string.isEmpty() && index.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", (string.getValue().charAt(index.getValue())));
		cb(result);
	}

	public function getModuleName() {
		return "string.ChatAt";
	}
}

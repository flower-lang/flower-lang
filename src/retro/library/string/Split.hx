

package retro.library.string;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Split implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Split";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("string", RetroType.RString);
		this.inputs.add("delimiter", RetroType.RString);
    	this.outputs.add("output", RetroType.RString);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var string = params.get("string");
		var delimiter = params.get("delimiter");
		if(string.isEmpty() && delimiter.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", (string.getValue().split(delimiter.getValue())));
		cb(result);
	}

	public function getModuleName() {
		return "string.Split";
	}
}

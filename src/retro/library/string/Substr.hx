

package retro.library.string;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Substr implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Substr";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("string", RetroType.RNumber);
    		this.inputs.add("start", RetroType.RNumber);
		this.inputs.add("end", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", (input.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "string.Substr";
	}
}

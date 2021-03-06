

package retro.library.math;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Abs implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Abs";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("input", RetroType.RNumber);
    		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", Math.abs(input.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "math.Abs";
	}
}

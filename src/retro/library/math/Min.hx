

package retro.library.math;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Min implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Min";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("a", RetroType.RNumber);
		this.inputs.add("b", RetroType.RNumber);
    	this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var a = params.get("a");
		var b = params.get("b");
		if(a.isEmpty() || b.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", Math.min(a.getValue(), b.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "math.Min";
	}
}

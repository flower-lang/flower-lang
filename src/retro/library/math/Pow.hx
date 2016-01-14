

package retro.library.math;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Pow implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Pow";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("v", RetroType.RNumber);
    	this.inputs.add("exp", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var v = params.get("v");
		var exp = params.get("exp");
		if(v.isEmpty() || exp.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", Math.pow(v.getValue(), exp.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "math.Pow";
	}
}

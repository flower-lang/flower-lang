

package retro.library.math;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Atan2 implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Atan2";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("x", RetroType.RNumber);
		this.inputs.add("y", RetroType.RNumber);
    		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var x = params.get("x");
		var y = params.get("y");
		if(x.isEmpty() || y.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", Math.atan2(x.getValue(), y.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "math.Atan2";
	}
}

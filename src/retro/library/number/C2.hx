

package retro.library.number;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class C2 implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "C2";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("trigger", RetroType.RNumber);
		this.outputs.add("2", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("2", 2);
		cb(result);
	}

	public function getModuleName() {
		return "number.C2";
	}
}

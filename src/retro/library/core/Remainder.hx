package retro.library.core;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Remainder implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Remainder";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("input1", RetroType.RNumber);
		this.inputs.add("input2", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input1 = params.get("input1");
		var input2 = params.get("input2");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", (input1.getValue() % input2.getValue()));
		cb(result);
	}
	
	public function getModuleName() {
		return "core.Remainder";
	}
	

}
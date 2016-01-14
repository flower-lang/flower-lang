package retro.library.array;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Push implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Push";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("array", RetroType.RNumber);
		this.inputs.add("value", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var array = params.get("array");
		var value = params.get("value");
		if(array.isEmpty() || value.isEmpty()) {
			cb(null);
			return;
		}
		array.getValue().push(value.getValue());
		var result = new Result();
		result.set("output", array.getValue());
		cb(result);
	}
	
	public function getModuleName() {
		return "array.Push";
	}
	

}
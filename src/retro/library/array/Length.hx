package retro.library.array;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Length implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Length";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("array", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var array = params.get("array");
		if(array.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("output", (array.getValue().length));
		cb(result);
	}
	
	public function getModuleName() {
		return "array.Length";
	}
	

}
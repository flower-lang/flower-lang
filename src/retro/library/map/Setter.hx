package retro.library.map;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Setter implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Setter";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("key", RetroType.RNumber);
		this.inputs.add("value", RetroType.RNumber);
		this.outputs.add("result", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input1 = params.get("key");
		var input2 = params.get("value");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
                Pod.getInstance().set(input1.getValue(), input2.getValue());
		var result = new Result();
                result.set("result", true);
		cb(result);
	}
	
	public function getModuleName() {
		return "map.Setter";
	}
	

}
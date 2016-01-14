package retro.library.core;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Transistor implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Transistor";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("emitter", RetroType.RNumber);
		this.inputs.add("base", RetroType.RNumber);
		this.outputs.add("collector", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var emitter = params.get("emitter");
		var base = params.get("base");
		if(emitter.isEmpty() || base.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("collector", emitter.getValue());
		cb(result);
	}
	
	public function getModuleName() {
		return "core.Transistor";
	}
	

}
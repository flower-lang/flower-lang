package retro.library.system;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.core.VirtualDevice;
import retro.pub.RetroType;

class Speed implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Speed";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("speed", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("speed");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		#if js
		js.Browser.window.sessionStorage.setItem("speed", ""+input.getValue());
		#else 
    	#end
		var result = new Result();
		result.set("output", (input.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "system.Speed";
	}
}

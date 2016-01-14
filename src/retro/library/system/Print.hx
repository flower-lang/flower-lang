package retro.library.system;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.core.VirtualDevice;
import retro.pub.RetroType;

class Print implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	private var virtualDevice:VirtualDevice;
	
	public function new(virtualDevice) {
		this.name = "Print";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("input", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
		this.virtualDevice = virtualDevice;
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		#if js
		this.virtualDevice.getConsoleDevice().print(input.getValue()+"");
		trace(input.getValue());
		#else 
    	Sys.print(input.getValue());
    	#end
		var result = new Result();
		result.set("output", (input.getValue()));
		cb(result);
	}

	public function getModuleName() {
		return "system.Print";
	}
}

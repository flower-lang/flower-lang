package retro.library.system;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.core.VirtualDevice;
import retro.pub.RetroType;

class Scan implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	private var virtualDevice:VirtualDevice;
	
	public function new(virtualDevice) {
		this.name = "Scan";
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
		#if virtual
		this.virtualDevice.getConsoleDevice().scan(function(str:String) {
			var result = new Result();
			result.set("output", str);
			cb(result);
		});
		#else
		var str = js.Browser.window.prompt("Standard Input","");
		var result = new Result();
		result.set("output", str);
		cb(result);
		#end
		#else 
		var std_input = Sys.stdin();
		var result = new Result();
		var str =  std_input.readLine();
		result.set("output", str);
		cb(result);
    	#end
	}

	public function getModuleName() {
		return "system.Scan";
	}
}

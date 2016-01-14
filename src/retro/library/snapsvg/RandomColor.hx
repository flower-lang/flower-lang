package retro.library.snapsvg;

import retro.core.VirtualDevice;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class RandomColor implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	private var virtualDevice:VirtualDevice;
	
	public function new(virtualDevice) {
		this.name = "RandomColor";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
    	this.inputs.add("trigger", RetroType.RNumber);
		this.outputs.add("color", RetroType.RNumber);
		
		this.virtualDevice = virtualDevice;
	}
	
	public function onInputRecieved(params:Params, cb) {
		var trigger = params.get("trigger");
		if(trigger.isEmpty()) {
			cb(null);
			return;
		}
		var col = Math.floor(0xffffff * Math.random());
		var result = new Result();
		result.set("color", "#" + StringTools.hex(col, 16).substr(10,6));
		cb(result);
	}

	public function getModuleName() {
		return "snapsvg.RandomColor";
	}
}

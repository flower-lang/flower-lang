

package retro.library.snapsvg;

import retro.core.VirtualDevice;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Rect implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	private var virtualDevice:VirtualDevice;
	
	public function new(virtualDevice) {
		this.name = "Rect";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
    	this.inputs.add("x", RetroType.RNumber);
		this.inputs.add("y", RetroType.RNumber);
		this.inputs.add("w", RetroType.RNumber);
		this.inputs.add("h", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
		
		this.virtualDevice = virtualDevice;
	}
	
	public function onInputRecieved(params:Params, cb) {
		var x = params.get("x");
		var y = params.get("y");
		var w = params.get("w");
		var h = params.get("h");
		if(x.isEmpty() || y.isEmpty() || w.isEmpty() || h.isEmpty()) {
			cb(null);
			return;
		}
		
		var snapElement = this.virtualDevice.getSnap().rect(
		x.getValue(),
		y.getValue(),
		w.getValue(),
		h.getValue()
		);
		
		var result = new Result();
		result.set("output", snapElement);
		cb(result);
	}

	public function getModuleName() {
		return "snapsvg.Rect";
	}
}

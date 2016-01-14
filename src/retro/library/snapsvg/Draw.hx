package retro.library.snapsvg;

import retro.core.VirtualDevice;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;
import retro.pub.CreateSvgDialog;
import snap.Snap;

class Draw implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Draw";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
    	this.inputs.add("draw", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var draw = params.get("draw");
		if(draw.isEmpty()) {
			cb(null);
			return;
		}
		(new CreateSvgDialog()).open();
		cb(null);
	}

	public function getModuleName() {
		return "snapsvg.Draw";
	}
}
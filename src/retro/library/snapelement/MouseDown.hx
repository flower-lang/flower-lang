

package retro.library.snapelement;

import snap.Snap;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class MouseDown implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "MouseDown";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("snapelement", RetroType.RNumber);
		this.outputs.add("e", RetroType.RNumber);
		this.outputs.add("x", RetroType.RNumber);
		this.outputs.add("y", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var snapelementParam = params.get("snapelement");
		if(snapelementParam.isEmpty()) {
			cb(null);
			return;
		}
		var snapelement:SnapElement = snapelementParam.getValue();
		snapelement.mousedown(function(e, x, y) {
		var result = new Result();
		result.set("e", (e));
		result.set("x", (x));
		result.set("y", (y));
		cb(result);
		});
	}

	public function getModuleName() {
		return "snapelement.MouseDown";
	}
}

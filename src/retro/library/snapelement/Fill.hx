

package retro.library.snapelement;

import snap.Snap;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Fill implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Fill";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("snapelement", RetroType.RNumber);
    	this.inputs.add("color", RetroType.RNumber);
		this.outputs.add("snapelement", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var snapelementParam = params.get("snapelement");
		var colorParam = params.get("color");
		if(snapelementParam.isEmpty() || colorParam.isEmpty()) {
			cb(null);
			return;
		}
		var snapelement:SnapElement = snapelementParam.getValue();
		snapelement.attr({
			fill : colorParam.getValue()
		});
		var result = new Result();
		result.set("snapelement", snapelement);
		cb(result);
	}

	public function getModuleName() {
		return "snapelement.Fill";
	}
}

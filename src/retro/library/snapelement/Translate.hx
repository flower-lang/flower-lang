

package retro.library.snapelement;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Translate implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Translate";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("snapelement", RetroType.RNumber);
    	this.inputs.add("x", RetroType.RNumber);
		this.inputs.add("y", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var snapelement = params.get("snapelement");
		var x = params.get("x");
		var y = params.get("y");
		if(snapelement.isEmpty() || x.isEmpty() || y.isEmpty()) {
			cb(null);
			return;
		}
		
		snapelement.getValue().transform("translate("+x.getValue()+","+y.getValue()+")");
		
		var result = new Result();
		result.set("output", snapelement.getValue());
		cb(result);
	}

	public function getModuleName() {
		return "snapelement.Translate";
	}
}

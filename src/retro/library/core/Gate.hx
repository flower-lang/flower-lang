package retro.library.core;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Gate implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Gate";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("input", RetroType.RNumber);
		this.inputs.add("gate", RetroType.RNumber);
		this.outputs.add("true", RetroType.RNumber);
		this.outputs.add("false", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("input");
		var gate = params.get("gate");
		if(input.isEmpty() || gate.isEmpty()){
			cb(null);
			return;
		}
		var result = new Result();
		if( gate.getValue() ){
			result.set("true", input.getValue());
		}else{
			result.set("false", input.getValue());
		};
		cb(result);
	}
	
	public function getModuleName() {
		return "core.Gate";
	}
	

}
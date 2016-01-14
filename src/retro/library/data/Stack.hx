package retro.library.data;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Stack implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	//original
	private var datas:Array<Dynamic>;
	
	public function new() {
		this.name = "Stack";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("push", RetroType.RNumber);
		this.inputs.add("pop", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
		
		this.datas = new Array<Dynamic>();
	}
	
	public function onInputRecieved(params:Params, cb) {
		var push = params.get("push");
		var pop = params.get("pop");
		if(!push.isEmpty()) {
			this.datas.push(push.getValue());
			cb(null);
			return;
		}else if(!pop.isEmpty()) {
			var result = new Result();
			result.set("output", this.datas.pop());
			cb(result);
		}
	}
	
	public function getModuleName() {
		return "data.Stack";
	}
	

}
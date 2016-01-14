package retro.library.core;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Filter implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Filter";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("value", RetroType.RNumber);
		this.inputs.add("comparison", RetroType.RNumber);
		this.inputs.add("operator", RetroType.RString);
		this.outputs.add("pass", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var value = params.get("value");
		var comparison = params.get("comparison");
		var operator = params.get("operator");
		if(value.isEmpty() || comparison.isEmpty() || operator.isEmpty()) {
			cb(null);
			return;
		}
		var pass = false;
		switch(operator.getValue()) {
			case "eq","==":
				pass = (value.getValue() == comparison.getValue());
			case "ne","!=":
				pass = (value.getValue() != comparison.getValue());
			case "gt",">":
				pass = (value.getValue() > comparison.getValue());
			case "lt","<":
				pass = (value.getValue() < comparison.getValue());
			case "ge",">=":
				pass = (value.getValue() >= comparison.getValue());
			case "le","<=":
				pass = (value.getValue() <= comparison.getValue());
			default:
				cb(null);
				return;
		}
		if(pass == false) {
			cb(null);
			return;
		}
		var result = new Result();
		result.set("pass", value.getValue());
		cb(result);
	}

	public function getModuleName() {
		return "core.Filter";
	}
}
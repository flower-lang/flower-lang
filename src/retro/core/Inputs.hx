package retro.core;

import retro.pub.RetroType;

class Inputs {

	private var inputs:Array<Input>;
	
	public function new() {
		this.inputs = new Array<Input>();
	}
	
	public function add(name:String, type:RetroType) {
		inputs.push(new Input(name, type));
	}

	public function get(name) {
		for(input in inputs) {
		if(input.name == name) {
			return input;
		}
		}
		return null;
	}
	
	public function getArray() {
		return this.inputs;
	}
}

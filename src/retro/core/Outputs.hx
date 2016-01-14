package retro.core;

import retro.pub.RetroType;

class Outputs {

	private var outputs:Array<Output>;
	
	public function new() {
		this.outputs = new Array<Output>();
	}
	
	public function add(name:String, type:RetroType) {
		outputs.push(new Output(name, type));
	}

	public function get(name) {
		for(output in outputs) {
		if(output.name == name) {
			return output;
		}
		}
		return null;
	}
	
	public function getArray() {
		return this.outputs;
	}
}

class Output {
	public var name:String;
	public var type:RetroType;
	
	public function new(name, type) {
		this.name = name;
		this.type = type;
	}
	
	public function getType() {
		return this.type;
	}
	
	public function getName() {
		return this.name;
	}
}

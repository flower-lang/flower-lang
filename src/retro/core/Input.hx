package retro.core;

import retro.pub.RetroType;

class Input {
	public var name:String;
	public var type:RetroType;
	
	public function new(name, type) {
		this.name = name;
		this.type = type;
	}
	
	public function getName() {
		return this.name;
	}
	public function getType() {
		return this.type;
	}
}
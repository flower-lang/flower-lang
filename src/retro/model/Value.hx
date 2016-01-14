package retro.model;

import retro.pub.RetroType;

class Value{
	public var type : RetroType;
	public var value : Dynamic;

	public function new(_type, _value:Dynamic){
		this.type = _type;
		this.value = _value;
	}
}
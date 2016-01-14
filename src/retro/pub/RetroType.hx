package retro.pub;

import retro.core.FlowerClass;

enum RetroType{
	REmpty;
	RString;
	RNumber;
	RBool;
	RList(type:RetroType);
	RTuple(types : Array<RetroType>);
	RUnknown(id : Int);
	RClass(type:FlowerClass);
}

class RetroTypeChecker{
	public static function check(type1 : RetroType, type2 : RetroType) : Bool{
		return true;
	}
}
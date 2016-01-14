package pigpio;

@:native("Pigpio")
extern class Pigpio {
	static public function open(pin:Int, dir:String, ?cb:Dynamic -> Void):Void;
	static public function close(pin:Int, ?cb:Dynamic -> Void):Void;
	static public function write(pin:Int, value:Int):Void;
	static public function read(pin:Int, cb:Dynamic->Int->Void):Void;
}
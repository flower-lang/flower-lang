package retro.pub;

import js.html.*;

@:native("CreateSlideDialog")
extern class CreateSlideDialog {
	public function new();
	public function on(cb:String->String->Int->Int->Void):Void;
	public function open(id:String):Void;
	public function close(cb:Void->Void, cb2:Void->Void):Void;
}

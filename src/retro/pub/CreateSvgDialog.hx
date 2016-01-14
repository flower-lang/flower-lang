package retro.pub;

import js.html.*;

@:native("CreateSvgDialog")
extern class CreateSvgDialog {
	public function new();
	public function on(cb:String->String->Int->Int->Void):Void;
	public function open():Void;
}

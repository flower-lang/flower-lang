package retro.core;

import retro.core.Inputs;
import retro.core.Outputs;
import retro.core.Result;
import snap.Snap;

interface JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;

	public function onInputRecieved(params:Params, cb:Result->Void):Void;
	public function getModuleName():String;
}
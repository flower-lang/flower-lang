package retro.library.slide;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;
import retro.pub.CreateSlideDialog;

class Slide implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	public var dialog : CreateSlideDialog;
	
	public function new() {
		this.name = "Slide";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
    	this.inputs.add("id", RetroType.RNumber);
    	this.outputs.add("result", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var id = params.get("id");
		if(id.isEmpty()) {
			cb(null);
			return;
		}
		if( this.dialog == null ) this.dialog = new CreateSlideDialog();
		var result = new Result();
		result.set("result", id.getValue());
		dialog.close(function() cb(result), function() cb(null) );
		dialog.open(id.getValue());
	}

	public function getModuleName() {
		return "slide.Slide";
	}
}
package retro.library.core;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.view.JobView;
import retro.pub.RetroType;
import snap.Snap;
import js.html.Element;
import js.JQuery;

class TextBox implements JobComponent {
	private static var id = 0;
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Through";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("tigger", RetroType.RNumber);
		this.outputs.add("text", RetroType.RNumber);
		TextBox.id++;
	}

	public function customDraw(jobView: JobView){
		/*var document = js.Browser.document;
		var div = document.createDivElement();
		document.body.appendChild(div);
		var textarea : js.html.TextAreaElement = cast document.createElement("textarea");
		div.appendChild(textarea);*/
	}
	
	public function onInputRecieved(params:Params, cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new Result();
        
		cb(result);
	}

	public function getModuleName() {
		return "core.TextBox";
	}
}
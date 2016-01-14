package retro.library.pigpio;

import haxe.Http;
import pigpio.Pigpio;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.core.VirtualDevice;
import retro.pub.RetroType;

class Tweet implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Tweet";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("message", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var message = params.get("message");
		if(message.isEmpty()) {
			cb(null);
			return;
		}
		#if nodejs
		#else 
		//http connect
		var http = new Http('/pigpio/tweet');
		http.onData = function(data) {
			var result = new Result();
			result.set("output", 0);
			cb(result);
		}
		http.setParameter("message", message.getValue());
		http.request(true);
    	#end
	}

	public function getModuleName() {
		return "pigpio.Tweet";
	}
}

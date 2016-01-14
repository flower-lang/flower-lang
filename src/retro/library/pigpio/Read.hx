package retro.library.pigpio;

import haxe.Http;
import haxe.Json;
import pigpio.Pigpio;
import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.core.VirtualDevice;
import retro.pub.RetroType;

class Read implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Read";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("pin", RetroType.RNumber);
		this.outputs.add("value", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var pin = params.get("pin");
		if(pin.isEmpty()) {
			cb(null);
			return;
		}
		var pin_no = pin.getValue();
		#if nodejs
		Pigpio.open(pin_no, "input", function(err) {
			Pigpio.read(pin_no, function(err, value) {
				Pigpio.close(pin_no);
				var result = new Result();
				result.set("value", value);
				cb(result);
			});
		});
		#else 
		//http connect
		var http = new Http('/pigpio/read');
		http.onData = function(data) {
			var result = new Result();
			result.set("value", Json.parse(data));
			cb(result);
		}
		http.setParameter("pin", pin_no);
		http.request(true);
    	#end
	}

	public function getModuleName() {
		return "pigpio.Read";
	}
}

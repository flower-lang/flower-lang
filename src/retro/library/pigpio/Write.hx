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

class Write implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	
	public function new() {
		this.name = "Write";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("pin", RetroType.RNumber);
		this.inputs.add("value", RetroType.RNumber);
		this.outputs.add("output", RetroType.RNumber);
	}
	
	public function onInputRecieved(params:Params, cb) {
		var pin = params.get("pin");
		var valueParam = params.get("value");
		if(pin.isEmpty() || valueParam.isEmpty()) {
			cb(null);
			return;
		}
		var pin_no = pin.getValue();
		var value = valueParam.getValue();
		#if nodejs
		Pigpio.open(pin_no, "output", function(err) {
			Pigpio.write(pin_no, value);
			Pigpio.close(pin_no);
			var result = new Result();
			result.set("output", 0);
			cb(result);
		});
		#else 
		//http connect
		var http = new Http('/pigpio/write');
		http.onData = function(data) {
			var result = new Result();
			result.set("output", 0);
			cb(result);
		}
		http.setParameter("pin", pin_no);
		http.setParameter("value", value);
		http.request(true);
    	#end
	}

	public function getModuleName() {
		return "pigpio.Write";
	}
}

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

class ReadWaitTrigger implements JobComponent {
	public var name:String;
	public var inputs:Inputs;
	public var outputs:Outputs;
	private var virtualDevice:VirtualDevice;
	
	public function new(virtualDevice) {
		this.name = "ReadWaitTrigger";
		this.inputs = new Inputs();
		this.outputs = new Outputs();
		this.inputs.add("trigger", RetroType.RNumber);
		this.inputs.add("pin", RetroType.RNumber);
		this.outputs.add("value", RetroType.RNumber);
		this.virtualDevice = virtualDevice;
	}
	
	public function onInputRecieved(params:Params, cb) {
		var trigger = params.get("trigger");
		var pin = params.get("pin");
		if(pin.isEmpty() || trigger.isEmpty()) {
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
		this.virtualDevice.getRetroClient().readwait(pin_no, function(data:Int) {
			var result = new Result();
			result.set("value", data);
			cb(result);
		});
    	#end
	}

	public function getModuleName() {
		return "pigpio.ReadWaitTrigger";
	}
}

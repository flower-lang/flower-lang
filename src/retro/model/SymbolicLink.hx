package retro.model;

import retro.core.JobComponent;
import retro.pub.RetroType;
import retro.vm.Worker;

class SymbolicLink extends Job{

	private var prototype : JobComponent;
	
	public function new(id, jobComponent) {
		super(id);
		this.prototype = jobComponent;
		this.customDraw = Reflect.getProperty(jobComponent,"customDraw");
		for(ip in this.prototype.inputs.getArray()) {
			this.addInputPort(new InputPort(this, ip.getType(), ip.getName()));
		}
		for(op in this.prototype.outputs.getArray()) {
			this.addOutputPort(new OutputPort(this, op.getType(), op.getName()));
		}
	}
	
	public function getPrototype() {
		return this.prototype;
	}
	
	override function getName() {
		return this.prototype.getModuleName();
	}
	
	override function getWorker() {
		return new Worker(this, this.prototype.onInputRecieved);
	}
	
	override function getJSON() {
		var json:Dynamic = {};
		json.id = this.getId();
		json.ref = this.getName();
		return json;
	}
	
}
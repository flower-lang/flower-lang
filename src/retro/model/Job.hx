package retro.model;

import retro.pub.IdGenerator;
import retro.pub.RetroType;
import retro.pub.Point2D;
import retro.vm.Worker;
import retro.core.JobComponent;
import retro.core.Params;
import retro.core.Result;
import retro.view.JobView;
import snap.Snap;

class Job{

	//モデル
	private var id : ID;
	private var inputPorts : Array<InputPort>;
	private var outputPorts : Array<OutputPort>;
	private var pos : Point2D;
	
	//モデルの変更を伝えるためのリスナー
	private var onInputPortAddedListeners:Array<InputPort->Void>;
	private var onOutputPortAddedListeners:Array<OutputPort->Void>;
	private var onInputPortRemovedListeners:Array<InputPort->Void>;
	private var onOutputPortRemovedListeners:Array<OutputPort->Void>;
	private var onPosChangedListeners:Array<Float->Float->Void>;
	
	// 実行を移譲
	public var worker : Worker;
	public var customDraw : JobView -> Void;
	
	public function new(id){
		this.id = id;
		this.inputPorts = new Array<InputPort>();
		this.outputPorts = new Array<OutputPort>();
		this.pos = new Point2D(0, 0);
		this.onInputPortAddedListeners = new Array<InputPort->Void>();
		this.onOutputPortAddedListeners = new Array<OutputPort->Void>();
		this.onInputPortRemovedListeners = new Array<InputPort->Void>();
		this.onOutputPortRemovedListeners = new Array<OutputPort->Void>();
		this.onPosChangedListeners = new Array<Float->Float->Void>();
	}
	
	public function getId() {
		return this.id;
	}
	
	public function getName() {
		return "";
	}
	
	public function setPos(x:Float, y:Float) {
		this.fireOnPosChangedListeners(x, y);
		this.pos.setX(x);
		this.pos.setY(y);
	}
	
	public function getPos() {
		return this.pos;
	}
	
	public function getInputPorts() {
		return this.inputPorts;
	}
	
	public function getOutputPorts() {
		return this.outputPorts;
	}
	
	public function addInputPort(port : InputPort) {
		this.fireOnInputPortAddedListeners(port);
		this.inputPorts.push(port);
	}
	public function addOutputPort(port : OutputPort) {
		this.fireOnOutputPortAddedListeners(port);
		this.outputPorts.push(port);
	}
	public function removeInputPort(port : InputPort) {
		this.fireOnInputPortRemovedListeners(port);
		this.inputPorts.remove(port);
	}
	public function removeOutputPort(port : OutputPort) {
		this.fireOnOutputPortRemovedListeners(port);
		this.outputPorts.remove(port);
	}
	
	public function getParams() {
		var params = new Params();
		for(p in this.inputPorts) {
			var value = null;
			if(p.getValue()!=null) {
				value = p.getValue();
			}
			params.add(p.getName(), value);
		}
		return params;
	}
	
	public function getWorker(){
		return new Worker(this, function(params:Params, cb) {
			cb(new Result());
		});
	}
	
	public function getInputPort(name:String) {
		for(p in inputPorts) {
			if(name == p.name) {
				return p;
			}
		}
		return null;
	}
	public function getOutputPort(name:String) {
		for(p in outputPorts) {
			if(name == p.name) {
				return p;
			}
		}
		return null;
	}
	
	public function onInputPortAdded(listener) {
		this.onInputPortAddedListeners.push(listener);
	}
	
	private function fireOnInputPortAddedListeners(j) {
		for(l in this.onInputPortAddedListeners) {
			l(j);
		}
	}
	
	public function onOutputPortAdded(listener) {
		this.onOutputPortAddedListeners.push(listener);
	}
	
	private function fireOnOutputPortAddedListeners(j) {
		for(l in this.onOutputPortAddedListeners) {
			l(j);
		}
	}
	
	public function onInputPortRemoved(listener) {
		this.onInputPortRemovedListeners.push(listener);
	}
	
	private function fireOnInputPortRemovedListeners(j) {
		for(l in this.onInputPortRemovedListeners) {
			l(j);
		}
	}
	
	public function onOutputPortRemoved(listener) {
		this.onOutputPortRemovedListeners.push(listener);
	}
	
	private function fireOnOutputPortRemovedListeners(j) {
		for(l in this.onOutputPortRemovedListeners) {
			l(j);
		}
	}
	
	public function onPosChanged(listener) {
		this.onPosChangedListeners.push(listener);
	}
	
	private function fireOnPosChangedListeners(x, y) {
		for(l in this.onPosChangedListeners) {
			l(x, y);
		}
	}
	
	public function getJSON() {
		var json:Dynamic = {};
		json.id = this.getId();
		return json;
	}
}
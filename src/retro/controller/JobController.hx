package retro.controller;

import retro.pub.Editor;
import retro.pub.RetroType;
import retro.model.Job;
import retro.model.OutputPort;
import retro.model.InputPort;

class JobController implements Controller{
	private var editor:Editor;
	private var job:Job;
	public function new(editor, job){
		this.editor = editor;
		this.job = job;
	}
	
	public function getEditor() {
		return this.editor;
	}
	
	public function getJob() {
		return this.job;
	}
	
	public function changePos(x:Float, y:Float) {
		this.job.setPos(x, y);
	}
	
	public function addInputPort(name:String) {
		var port = new InputPort(this.job, RetroType.RString, name);
		this.job.addInputPort(port);
	}
	
	public function addOutputPort(name:String) {
		var port = new OutputPort(this.job, RetroType.RString, name);
		this.job.addOutputPort(port);
	}
	public function removeInputPort(port:InputPort) {
	
	}
	public function removeOutputPort(port:OutputPort) {
	
	}
	public function connect(oport:OutputPort, iport:InputPort) {
		oport.connectToInputPort(iport);
	}
	public function disconnect(oport:OutputPort, iport:InputPort) {
		oport.disconnectToInputPort(iport);
	}
}

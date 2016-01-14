package retro.controller;

import retro.pub.Editor;
import retro.pub.RetroType;
import retro.model.Diagram;
import retro.model.Job;
import retro.model.EntryJob;
import retro.model.Logic;
import retro.model.SymbolicLink;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.core.JobComponent;

/*
	DiagramController
*/
class DiagramController implements Controller{

	private var editor:Editor;
	private var diagram:Diagram;
	
	//ラバーバンド
	public var start : OutputPort;
	public var end : InputPort;
	
	private var modules:Array<JobComponent>;
	
	public function new(editor, diagram, virtualDevice){
		this.editor = editor;
		this.diagram = diagram;
		this.modules = new Array<JobComponent>();

		ModuleAdder.add("flower-modules");
	}
	
	public function getEditor() {
		return this.editor;
	}
	
	public function getDiagram() {
		return diagram;
	}
	
	//Jobを追加
	public function addJob() {
		var id = this.editor.IdGenerator.genID();
		var job = new Job(id);
		diagram.addJob(job);
	}
	public function addSymbolicLink(jobComponent) {
		var id = this.editor.IdGenerator.genID();
		var job = new SymbolicLink(id, jobComponent);
		diagram.addJob(job);
		return job;
	}
	
	public function addEntryJob() {
		var id = this.editor.IdGenerator.genID();
		var job = new EntryJob(id);
		job.addOutputPort(new OutputPort(job, RetroType.RString, "output"));
		diagram.setEntryPoint(job);
		return job;
	}
	public function addLogic(id) {
		var job = new Logic(id);
		diagram.addJob(job);
	}
	public function removeJob(job:Job) {
		diagram.removeJob(job);
	}
	
	public function setRubberbandStart(port:OutputPort) {
		if( this.start != null ) this.start.onNormal();
		this.start = port;
		this.start.onSelected();
	}

	public function setRubberbandEnd(port:InputPort) {
		if(this.start == null) {
			return false;
		}else{
			if( port.parent == this.start.parent ){
				return false;
			}else{ 
				this.end = port;
				this.start.onNormal();
				this.start.connectToInputPort(this.end);
				return true;
			}
		}
	}
	public function clearRubberband() {
		if( this.start != null ) this.start.onNormal();
		this.start = null;
		this.end = null;
	}
	//ポートの接続解除
	static public function disconnect(oport:OutputPort, iport:InputPort) {
		oport.disconnectToInputPort(iport);
	}
	
	public function getModule(name) {
		for(m in this.modules) {
			if(m.getModuleName() == name) {
				return m;
			}
		}
		return null;
	}
}

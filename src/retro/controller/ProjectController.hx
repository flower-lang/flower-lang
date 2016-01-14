package retro.controller;

import retro.pub.Editor;
import retro.model.Project;
import retro.model.Diagram;
import retro.view.DiagramView;
import retro.vm.Runtime;

class ProjectController implements Controller{
	private var editor:Editor;
	private var project:Project;
	private var runtime:Runtime;
	public function new(editor, project){
		this.editor = editor;
		this.project = project;
	}
	
	public function getEditor() {
		return this.editor;
	}
	public function getProject() {
		return this.project;
	}
	
	//Project Controller
	public function addDiagram() {
		var diagram = new Diagram();
		var diagramController = new DiagramController(this.editor, diagram, this.editor.virtualDevice);
		var diagramView = new DiagramView(diagramController);
		this.project.setRootDiagram(diagram);
	}
	
	public function run() {
		if(this.runtime == null) {
			this.runtime = new Runtime(this.project.getRootDiagram());
		}
		var entry = this.getProject().getRootDiagram().getEntryPoint();
	  	this.runtime.run(entry, 0);
	}
	
	public function stop() {
		if(this.runtime == null) {
			this.runtime = new Runtime(this.project.getRootDiagram());
		}
	  	this.runtime.stop();
	  	var diagram = this.getProject().getRootDiagram();
	  	diagram.clearValueCarriers();
	}
	//Diagram Controller
	
	//Job Controller
	
}
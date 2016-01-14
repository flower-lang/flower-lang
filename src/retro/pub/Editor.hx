package retro.pub;

import snap.Snap;
import retro.core.VirtualDevice;
import retro.pub.IdGenerator;
import retro.model.Project;
import retro.model.Diagram;
import retro.view.Thema;
import retro.view.InputPortView;
import retro.view.OutputPortView;
import retro.view.ProjectView;
import retro.view.ConsoleView;
import retro.controller.ProjectController;
import retro.controller.DiagramController;
import retro.controller.ImportController;
import retro.controller.ExportController;
import retro.vm.Runtime;

class Editor{
	public var projectController : ProjectController;
	public var projectView : ProjectView;
	public var IdGenerator : retro.pub.IDGenerator;
	public var snap:Snap;
	public var virtualDevice:VirtualDevice;
	
	private var runtime:Runtime;
	
	public function new(?dom : Dynamic){
		if(dom == null) {
			this.snap = new Snap("#svg");
		}else{
			this.snap = new Snap(dom);
		}
		this.IdGenerator = retro.pub.IDGenerator.getInstance("test");
	}
		
	public function setProjectController(projectController) {
		this.projectController = projectController;
	}
	
	public function setProjectView(projectView) {
		this.projectView = projectView;
	}
	
	public function save_all(data) {
	}
	
	public function getRuntime() {
	  	this.runtime = new retro.vm.Runtime(this.projectController.getProject().getRootDiagram());
	  	return this.runtime;
	}
	public static function create(?dom:Dynamic){
		var editor = new Editor(dom);
		var project = new Project();
		//コントローラを作成
		var projectController = new ProjectController(editor, project);
		editor.setProjectController(projectController);
		//ビューを作成
		var projectView = new ProjectView(projectController, new ExportController(editor, project));
		editor.setProjectView(projectView);
		var virtualDevice = new VirtualDevice();
		editor.virtualDevice = virtualDevice;
		var consoleDevice = new ConsoleView(editor.snap);
		virtualDevice.setConsoleDevice(consoleDevice);
		/*
		var snap = new Snap();
		snap.attr({
			"id" : "sub_svg",
			"class" : "modal"
		});
		virtualDevice.setSVGDevice(snap);
		*/

		var diagram = new Diagram();
		project.setRootDiagram(diagram);
		var diagramController = new DiagramController(editor, diagram, virtualDevice);
		diagramController.addEntryJob();
	}

	public static function createCodeIQ(){
		var editor = new Editor();
		editor.IdGenerator = retro.pub.IDGenerator.getInstance("codeIQ");
		var project = new Project();
		var projectController = new ProjectController(editor, project);
		editor.setProjectController(projectController);
		var projectView = new ProjectView(projectController, new ExportController(editor, project));
		editor.setProjectView(projectView);
		var virtualDevice = new VirtualDevice();
		editor.virtualDevice = virtualDevice;
		var consoleDevice = new ConsoleView(editor.snap);
		virtualDevice.setConsoleDevice(consoleDevice);
		var snap = new Snap();
		snap.attr({
			"id" : "sub_svg",
			"class" : "modal"
			});
		virtualDevice.setSVGDevice(snap);
		var diagram = new Diagram();
		project.setRootDiagram(diagram);
		var diagramController = new DiagramController(editor, diagram, virtualDevice);
		var entryJob = diagramController.addEntryJob();
		entryJob.setPos(80,300);
		var printJob = diagramController.getModule("system.Print");
		diagramController.addSymbolicLink(printJob).setPos(380, 300);
	}


}

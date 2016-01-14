package retro.view;

import snap.Snap;
import retro.pub.Editor;
import retro.model.Diagram;
import retro.controller.ProjectController;
import retro.controller.DiagramController;
import retro.controller.ExportController;

enum RunMode{
	Stop;
	Run;
}

class ProjectView{
	public var group:SnapElement;
	private var projectController:ProjectController;
	private var onButtonListeners:Array<Int->Void>;
	private var diagramView : DiagramView;
	private var control_group : SnapElement;
	private var exportController : ExportController;
	private var mode:RunMode;
	
	public function new(projectController, exportController) {
		this.projectController = projectController;
		this.exportController = exportController;
		this.mode = RunMode.Stop;
		var snap = this.projectController.getEditor().snap;
		var project = this.projectController.getProject();
		project.onDiagramAdded(this.OnDiagramAdded);
		
		this.control_group = snap.group();

    	Snap.load(#if codeiq "images/play.svg" #else "/images/play.svg" #end, function (f) {
    		var g:SnapElement = f.select("svg");
    		this.control_group.append(g);
    		this.control_group.transform("translate("+Thema.playSvgX+","+Thema.playSvgY+")");
    		Snap.load(#if codeiq "images/play-over.svg" #else "/images/play-over.svg" #end, function (f) {
    			var g2:SnapElement = f.select("svg");
    			this.control_group.transform("translate("+Thema.playSvgX+","+Thema.playSvgY+")");
    			g.click(function(e){
    				trace("click");
    				if(this.mode == RunMode.Stop) {
    					this.projectController.run();
    					this.mode = RunMode.Run;
    					this.control_group.append(g2);
    				};
	        	});
	        	g2.click(function(e){
	        		if(this.mode == RunMode.Run) {
	    	    		this.projectController.stop();
	    	    		this.mode = RunMode.Stop;
	    	    		g2.remove();
	        		}
	        	});
        	});
        #if raspi
        Snap.load("/images/save.svg", function (f) {
    		var g:SnapElement = f.select("g");
    		g.transform("translate("+Thema.saveSvgX+","+Thema.saveSvgY+")");
    		Snap.load("/images/save-over.svg", function (f) {
    			var g2:SnapElement = f.select("g");
    			g2.transform("translate("+Thema.saveSvgX+","+Thema.saveSvgY+")");
    			this.control_group.append(g);
    			g.click(function(e){
	        		var exported = this.exportController.do_export();
	        		this.projectController.getEditor().save_all(exported);
	        		this.control_group.append(g2);
	        		var timer = new haxe.Timer(500);
	        		timer.run = function(){
	        			g2.remove();
	        		};
    			});
    		});
    	});
    	#end
    	});
	}
	
	public function OnDiagramAdded(diagram:Diagram) {
		this.diagramView = new DiagramView(new DiagramController(this.projectController.getEditor(), diagram, this.projectController.getEditor().virtualDevice));
	}
	
}
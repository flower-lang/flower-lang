package ;

import snap.Snap;
import retro.core.VirtualDevice;
import retro.model.Project;
import retro.controller.ImportController;
import retro.pub.Editor;
import retro.pub.RetroClient;
import retro.vm.Application;
import retro.vm.Runtime;
import retro.vm.Compiler;

@:expose
class VMMain {
	public static function main(){
		var load = function(editorkey, id_header){
			Editor.create(editorkey, id_header);
		};
	}
	public static function init(editorkey, id_header){
		var retroClient = new RetroClient(editorkey);
		retroClient.init(function(data) {
			var project = new Project();
			
			var virtualDevice = new VirtualDevice();
			virtualDevice.setSVGDevice(new Snap("#svg"));
			
			var importController = new ImportController(project, virtualDevice);
			importController.do_import(data);
	  		var runtime = new retro.vm.Runtime(project.getRootDiagram());
	  		var job = project.getRootDiagram().getEntryPoint();
  			runtime.run(job, []);
		});
	}
}

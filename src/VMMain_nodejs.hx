package ;

import retro.pub.RetroType;
import retro.model.Project;
import retro.model.Value;
import retro.controller.ImportController;
import retro.vm.Application;
import retro.vm.Runtime;
import retro.vm.Compiler;

@:expose
class VMMain_nodejs {
	public static function main(){
	}
	public static function run(data){
			var project = new Project();
			var importController = new ImportController(project, null);
			importController.do_import(data);
	  		var runtime = new retro.vm.Runtime(project.getRootDiagram());
	  		var job = project.getRootDiagram().getEntryPoint();
  			runtime.run(job, []);
	}
}

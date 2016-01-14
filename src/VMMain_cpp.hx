package ;

import retro.pub.RetroType;
import retro.model.Project;
import retro.model.Value;
import retro.controller.ImportController;
import retro.vm.Application;
import retro.vm.Runtime;
import retro.vm.Compiler;

class VMMain_cpp {
  public static function main() {
    var filename = Sys.args()[0];
    trace(filename);
    var fi = sys.io.File.read(filename);
    var content:String = "";
    while(!fi.eof()) {
    	content += fi.readLine();
    }
	var project = new Project();
	var importController = new ImportController(project, null);
	importController.do_import(haxe.Json.parse(content));
  	var runtime = new retro.vm.Runtime(project.getRootDiagram());
  	var job = project.getRootDiagram().getEntryPoint();
  	runtime.run(job, Sys.args());
  }
}

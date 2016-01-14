package retro.controller;

import retro.pub.Editor;
import retro.model.Project;
import retro.model.Diagram;
import retro.model.Job;
import retro.model.Logic;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.controller.Controller;

/*
	ImportController
*/
class ExportController implements Controller {
	
	private var editor:Editor;
	private var project:Project;
	
	public function new(editor, project){
		this.editor = editor;
		this.project = project;
	}
	
	public function getProject() {
		return this.project;
	}
	
	public function do_export() {
		var model:Dynamic = {};
		var diagram = this.project.getRootDiagram();
		model.diagram = this.export_diagram(diagram);
		return model;
	}
	
	public function export_diagram(diagram:Diagram) {
		var diagram_model:Dynamic = {};
		diagram_model.jobs = [];
		for(job in diagram.getJobs()) {
			diagram_model.jobs.push(this.export_job(job));
		}
		return diagram_model;
	}
	
	public function export_job(job:Job) {
		var job_model:Dynamic = job.getJSON();
		job_model.meta = Type.getClassName(Type.getClass(job));
		job_model.pos = {};
		job_model.pos.x = job.getPos().getX();
		job_model.pos.y = job.getPos().getY();
		job_model.inputports = [];
		job_model.outputports = [];
		for(port in job.getInputPorts()) {
			job_model.inputports.push(this.import_outputport(port));
		}
		for(port in job.getOutputPorts()) {
			job_model.outputports.push(this.export_outputport(port));
		}
		/*
		for(job in diagram.getJobs()) {
			diagram_model.jobs.push({
				id : job.getId()
			});
		}*/
		return job_model;
	}
	
	public function import_outputport(inputport:InputPort) {
		var inputport_model:Dynamic = {};
		inputport_model.name = inputport.getName();
		if(inputport.getConstantValue() != null) {
			inputport_model.constant = {};
			inputport_model.constant.type = inputport.getConstantValue().type;
			inputport_model.constant.value = inputport.getConstantValue().value;
		}
		return inputport_model;
	}
	
	public function export_outputport(outputport:OutputPort) {
		var outputport_model:Dynamic = {};
		outputport_model.name = outputport.getName();
		outputport_model.connections = [];
		for(inputPort in outputport.getConnections()) {
			outputport_model.connections.push(inputPort.getURI());
		}
		return outputport_model;
	}
}

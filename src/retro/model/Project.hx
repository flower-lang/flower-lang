package retro.model;

class Project{

	private var diagram : Diagram;
	private var onDiagramAddedListeners:Array<Diagram->Void>;
	
	public function new(){
		this.onDiagramAddedListeners = new Array<Diagram->Void>();
	}
	
	public function setRootDiagram(diagram) {
		this.diagram = diagram;
		this.fireOnConnection(this.diagram);
	}
	
	public function getRootDiagram() {
		return this.diagram;
	}
	
	public function onDiagramAdded(listener) {
		this.onDiagramAddedListeners.push(listener);
	}
	
	private function fireOnConnection(d) {
		for(l in this.onDiagramAddedListeners) {
			l(d);
		}
	}
}
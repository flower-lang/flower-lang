package retro.view;

import snap.Snap;
import retro.pub.Editor;
import retro.pub.Point2D;
import retro.model.Port;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.controller.DiagramController;

/*
	Class Name:PortView
	
	Method
	-getPos:グローバル座標を取得
	-getLocalPos:ローカル座標を取得
*/
class PortView{
	//力学
	public var th:Float;
	public var pos : Point2D;
	public var velocity : Float;
	
	public var group:SnapElement;
	public var upperGroup:SnapElement;
	public var graphic:SnapElement;
	public var coll:SnapElement;
	public var jobView:JobView;
	public var views : Array<PathView>;
	
	public var diagramController:DiagramController;
	private var editor:Editor;
	private var snap:Snap;
	
	public function new(diagramController, jobview, snap) {
		this.diagramController = diagramController;
		this.views = new Array<PathView>();
		this.jobView = jobview;
		this.snap = snap;
		
		this.group = snap.group();
		this.upperGroup = snap.group();
		this.graphic = snap.circle(0, 0, Thema.portRadius);
		this.coll = snap.circle(0, 0, Thema.portRadius);
		this.th = 0;
		this.pos = new Point2D(0, 0);
		this.velocity = 0;
		this.setPos(100, 100);
		this.coll.attr({
    		   fill: "#ffffff",
    		   "fill-opacity" : 0,
    	});
    	
		this.group.append(this.graphic);
		this.upperGroup.append(coll);
	}

	public function refresh() {
		for(pathView in this.views) {
			pathView.refresh();
		}
	}
	
	public function addPos(x, y) {
		pos.setX(pos.getX() + x);
		pos.setY(pos.getY() + y);
		this.group.transform("translate(" + pos.getX() + "," + pos.getY() + ")");
		this.upperGroup.transform("translate(" + pos.getX() + "," + pos.getY() + ")");
	}
	public function setR(th:Float) {
		this.th = th;
		this.setPos(60*Math.cos(this.th), 60*Math.sin(this.th));
	}
	public function setPos(x, y) {
		pos.setX(x);
		pos.setY(y);
		this.group.transform("translate(" + pos.getX() + "," + pos.getY() + ")");
		this.upperGroup.transform("translate(" + pos.getX() + "," + pos.getY() + ")");
	}
	public function getPos() {
		return Point2D.add(pos, this.jobView.getPos());
	}
	public function getLocalPos() {
		return pos;
	}
	
	public function step_by_force(force:Point2D) {
		var n = new Point2D(-Math.sin(this.th), Math.cos(this.th));
		this.velocity += (force.getX() * n.getX() + force.getY() * n.getY()) / 200;
		this.velocity *= 0.7;
		if(this.velocity > Math.PI / 30) this.velocity = Math.PI / 30;
		if(this.velocity < -Math.PI / 30) this.velocity = -Math.PI / 30;
		this.th += this.velocity;
		this.setR(this.th);
	}
}

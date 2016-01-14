package retro.view;

import snap.Snap;
import retro.pub.Editor;
import retro.pub.Point2D;
import retro.model.Port;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.controller.DiagramController;

/*
	Class Name:OutputPortView
	
	Method
	-getPos:グローバル座標を取得
	-getLocalPos:ローカル座標を取得
*/
class OutputPortView extends PortView{
	public var port:OutputPort;
	
	public function new(diagramController, jobview, port, snap) {
		super(diagramController, jobview, snap);
		this.port = port;
		//モデルの変更を監視
		this.port.onConnected(this.OnConnected);
		this.graphic.attr({
			fill: Thema.outputPortFill,
			stroke : Thema.outputPortStroke,
			strokeWidth: Thema.outputPortStrokeWidth
		});
		var text = snap.text(Thema.outputPortTextX, Thema.outputPortTextY, port.getName());
		text.attr({
			"font-size" : Thema.outputPortFontSize,
			fill : Thema.outputPortFontFill,
			"font-family" : Thema.outputPortFontFamily,
		});
		this.upperGroup.append(text);
		this.coll.mousedown(function(e, x, y) {
			this.diagramController.setRubberbandStart(this.port);
		});
		//this.setPos(160, 0);

		this.port.onSelected = function(){
			this.graphic.attr({ 
				fill : Thema.selectedOutputPortFill,
				stroke : Thema.selectedOutputPortStroke,
				strokeWidth: Thema.selectedOutputPortStrokeWidth
			});
		};
		this.port.onNormal = function(){
			this.graphic.attr({ 
				fill : Thema.outputPortFill, 
				stroke : Thema.outputPortStroke,
				strokeWidth: Thema.outputPortStrokeWidth
			});
		};
	}	
	/*
		OutputPortからInputPortまで接続されたときに呼ばれる
	*/
	public function OnConnected(o:OutputPort, i:InputPort) {
		var inputView = this.jobView.diagramView.getInputPortView(i);
		var pathView = new PathView(this.diagramController, this.jobView.diagramView, this, inputView, this.snap);
		this.views.push(pathView);
		inputView.views.push(pathView);
	}
	
	public function step():Float {
		if(this.views.length == 0) {
			//return 0;
		}
		var force:Point2D = new Point2D(0, 0);
		for(ipv in this.jobView.getPortViews()) {
			var coulomb = Point2D.sub(this.getPos(), ipv.getPos());
			var r = coulomb.distanceSq();
			if(r == 0) r = 0.01;
			Point2D.timesToSelf(coulomb, 1/r*100);
			Point2D.addToSelf(force, coulomb);
		}
		for(pathView in this.views) {
			var attraction = Point2D.sub(pathView.target.getPos(), this.getPos());
			var r = attraction.distance();
			if(r > 1000) r = 1000;
			Point2D.timesToSelf(attraction, r/120);
			Point2D.addToSelf(force, attraction);
		}
		Point2D.timesToSelf(force, 1);
		this.step_by_force(force);
		this.refresh();
		return this.velocity * this.velocity * 100;
	}

}

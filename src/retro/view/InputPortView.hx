package retro.view;

import haxe.Json.*;
import js.Browser.*;
import snap.Snap;
import retro.pub.Editor;
import retro.pub.Point2D;
import retro.pub.RetroType;
import retro.pub.UserAgent;
import retro.model.Port;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.model.Value;
import retro.model.ValueCarrier;
import retro.controller.DiagramController;

class InputPortView extends PortView{

	public var port:InputPort;
	public var isConnected = false;
	private var constantValueGraphic:SnapElement;
	
	public function new(diagramController, jobview, port, snap) {
		super(diagramController, jobview, snap);
		this.port = port;
		this.port.onSetConstantValue(OnSetConstant);
		this.port.onRemoveConstantValue(OnRemoveConstant);
		
		this.graphic.attr({
			fill: Thema.inputPortFill,
			stroke : Thema.inputPortStroke,
			strokeWidth: Thema.inputPortStrokeWidth, 
			"fill-opacity": Thema.inputPortFillOpacity
		});
		
		var text = snap.text(Thema.inputPortTextX, Thema.inputPortTextY, port.getName());
		text.attr({
			"font-size" : Thema.inputPortFontSize,
			fill : Thema.inputPortFontFill,
			"font-family" : Thema.inputPortFontFamily
		});
		this.upperGroup.append(text);
		
		var touchListener = function(e, x, y) {
			if(this.diagramController.setRubberbandEnd(this.port)) {
				this.diagramController.clearRubberband();
				this.isConnected = true;
			}else{
				//set constant
				if( this.isConnected == false ){ 
					var v = window.prompt("","");
					if(v != null) {
						this.port.setConstant(new Value(RetroType.RNumber, haxe.Json.parse(v)));
					}
				}
			}
		}
		if(UserAgent.checkTablet()) {
			this.coll.touchstart(touchListener);
		}else{
			this.coll.mouseup(touchListener);
		}
		this.setPos(0, 0);
	}
	
	public function step():Float {
		if(this.views.length == 0) {
			//return 0;
		}
		var force:Point2D = new Point2D(0, 0);
		for(opv in this.jobView.getPortViews()) {
			var coulomb = Point2D.sub(this.getPos(), opv.getPos());
			var r = coulomb.distanceSq();
			if(r == 0) r = 0.01;
			Point2D.timesToSelf(coulomb, 1/r*100);
			Point2D.addToSelf(force, coulomb);
		}
		for(pathView in this.views) {
			var attraction = Point2D.sub(pathView.source.getPos(), this.getPos());
			var r = attraction.distance();
			if(r > 1000) r = 1000;
			Point2D.timesToSelf(attraction, r/120);
			Point2D.addToSelf(force, attraction);
		}
		Point2D.timesToSelf(force, 1);
		this.step_by_force(force);
		return this.velocity * this.velocity * 100;
	}
	
	public function OnSetConstant(v) {
		this.constantValueGraphic = this.snap.group();
		var t = Std.string(v.value);
		var text : SnapElement = snap.text(-2, 4, t);
		text.attr({
			"font-size" : Thema.constantValueFontSize,
			fill : Thema.constantValueFontFill,
			"font-family" : Thema.constantValueFontFamily
		});
		var graphic = snap.rect(-Thema.valueCarrierRadius, -Thema.valueCarrierRadius, 
			Thema.valueCarrierRadius * 2 + (t.length - 1) * 6, Thema.valueCarrierRadius * 2, 
			Thema.valueCarrierRadius, Thema.valueCarrierRadius);
		graphic.attr({
				fill: Thema.constantValueFill,
				strokeWidth: Thema.constantValueStrokeWidth,
				stroke : Thema.constantValueStroke
				});
		this.constantValueGraphic.append(graphic);
		this.constantValueGraphic.append(text);
		this.upperGroup.append(this.constantValueGraphic);
		graphic.click(function(e) {
			this.port.removeConstant();
		});
	}
	
	public function OnRemoveConstant() {
		this.constantValueGraphic.remove();
	}
	
}

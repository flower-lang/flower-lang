package retro.view;

import haxe.Timer;
import snap.Snap;
import retro.model.ValueCarrier;
import retro.pub.Point2D;

class ValueCarrierView {
	public var valueCarrier : ValueCarrier;
	
	public var group:SnapElement;
	public var graphic:SnapElement;
	public var coll:SnapElement;
	public var diagramView:DiagramView;
	
	public var pos : Point2D;
	public var vec : Point2D;
	var timer:Timer;
	var count:Int;
	
	public function new(editor, valueCarrier, diagramView) {
		this.valueCarrier = valueCarrier;
		this.diagramView = diagramView;
		this.valueCarrier.onStep(OnStep);
		this.count = 0;
		
		var snap = editor.snap;
		this.pos = new Point2D(0, 0);
		this.group = snap.group();
		//var text = snap.text(0, 0, haxe.Json.stringify(valueCarrier.getValue().value));
		var t = this.value2String(valueCarrier.getValue().value);
		var text : SnapElement = snap.text(-2, 4, t);
		text.attr({
			"font-size" : Thema.valueCarrierFontSize,
			fill : Thema.valueCarrierFontFill,
			"font-family" : Thema.valueCarrierFontFamily,
		});
		this.graphic = snap.rect(-Thema.valueCarrierRadius, -Thema.valueCarrierRadius, 
			Thema.valueCarrierRadius * 2 + (t.length - 1) * 6, Thema.valueCarrierRadius * 2, 
			Thema.valueCarrierRadius, Thema.valueCarrierRadius);
		this.graphic.attr({
				fill: Thema.valueCarrierFill,
				strokeWidth: Thema.valueCarrierStrokeWidth,
				stroke: Thema.valueCarrierStroke,
				});
		this.group.append(this.graphic);
		this.group.append(text);
		this.startPosition();
	}
	private function value2String(v:Dynamic) {
		if(Type.typeof(v) == Type.ValueType.TObject) {
			return "Object";
		}else if(Type.typeof(v) == Type.ValueType.TNull) {
			return "Null";
		}else if(Type.typeof(v) == Type.ValueType.TFloat) {
			return Std.string(v);
		}else if(Type.typeof(v) == Type.ValueType.TInt) {
			return haxe.Json.stringify(v);
		}else if(Type.typeof(v) == Type.ValueType.TFloat) {
			return v;
		}else if(Type.typeof(v) == Type.ValueType.TBool) {
			if(v == true) return "True";
			else return "False";
		}else{
			var class_name = Type.getClassName(Type.getClass(v));
			if(class_name == "String") {
				return v;
			}else{
				return class_name;
			}
		}
	}
	public function OnUsed() {
		this.remove();
	}
	public function OnStep() {
		this.addPos(this.vec.getX(), this.vec.getY());
	}
	
	public function remove() {
		this.group.remove();
	}
	
	public function startPosition() {
		var outputPortView = this.diagramView.getOutputPortView(this.valueCarrier.srcPort);
		var inputPortView = this.diagramView.getInputPortView(this.valueCarrier.destPort);
		this.vec = Point2D.sub(inputPortView.getPos(), outputPortView.getPos());
		Point2D.timesToSelf(this.vec, 1/40);
		this.setPos(outputPortView.getPos().getX(), outputPortView.getPos().getY());
	}
	public function addPos(x, y) {
		this.pos.setX(this.pos.getX() + x);
		this.pos.setY(this.pos.getY() + y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	public function setPos(x, y) {
		this.pos.setX(x);
		this.pos.setY(y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	public function endPosition() {
	
	}
}
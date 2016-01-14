package retro.view;

import haxe.Timer;
import snap.Snap;
import retro.pub.Point2D;
import retro.pub.RetroType;
import retro.model.Port;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.model.Job;
import retro.model.Value;

/*
	Class Name:JobView
	
	Event
	Method
	-addInputPortView:入力ポートを追加する
	-addOutputPortView:出力ポートを追加する
	-getPos:グローバル座標を取得
*/
class ConsoleView {

	public var pos : Point2D;
	public var prev_pos : Point2D;
	
	public var group:SnapElement;
	public var graphic:SnapElement;
	public var coll:SnapElement;
	private var texts:Array<SnapElement>;
	private var current_line:Int = 0;
	private var lines:Array<String>;
	private var scan_buffer:Array<String->Void>;
	
	public function new(snap:Snap) {
		this.lines = new Array<String>();
		this.scan_buffer = new Array<String->Void>();
		this.group = snap.group();
		this.graphic = snap.rect(0, 0, 230, 200);
		var coll = snap.rect(0, 0, 230, 200);
		
		this.current_line = 0;
		this.texts = new Array<SnapElement>();
		for(i in 0...8) {
			this.lines.push("");
			this.texts.push(snap.text(10, 20*i+20, ""));
		}
		for(t in this.texts) {
			t.attr({
			"font-size" : Thema.consoleFontSize,
			fill : Thema.consoleFontFill,
			"font-family" : Thema.consoleFontFamily,
			width : 220,
			});
		}
		this.graphic.attr({
				fill: Thema.consoleFill,
				stroke: Thema.consoleStroke,
				strokeWidth: Thema.consoleStrokeWidth,
				});
		this.pos = new Point2D(0, 0);
		this.prev_pos = new Point2D(0, 0);
		this.setPos(200, 80);
		coll.attr({
    	    fill: "#ffffff",
    	    "fill-opacity" : 0,
    	});
		coll.drag(function(dx, dy, x, y){
        	this.addPos(dx - this.prev_pos.getX(), dy - this.prev_pos.getY());
        	this.prev_pos.setX(dx);
        	this.prev_pos.setY(dy);
    	}, function(x, y) {
    		this.prev_pos.setX(0);
    		this.prev_pos.setY(0);
    		var cb = this.scan_buffer.shift();
    		if(cb!=null) {
	    		cb("dammy");
    		}
    	}, function(x, y) {
    		
    	});
		
		this.group.append(this.graphic);
		for(t in this.texts) {
			this.group.append(t);
		}
		this.group.append(coll);
	}
	
	public function print(str:String) {
		for(i in 0...str.length) {
			this.putChar(str.charAt(i));
		}
	}
	public function println(str:String) {
		this.print(str + "\n");
	}
	public function putChar(c) {
		if(c == "\n") {
			this.next_line();
		}else{
			if(this.lines[this.current_line].length > 35) {
				this.next_line();
			}
			this.lines[this.current_line] += c;
			this.texts[this.current_line].attr({
				text : this.lines[this.current_line]
			});
		}
	}
	public function next_line() {
		if(this.current_line >= 35) {
			for(i in 0...this.lines.length) {
				this.lines[i] = "";
			}
			this.current_line = 0;
		}else{
			this.current_line++;
		}
	}
	public function scan(cb) {
		var str = js.Browser.window.prompt("Standard Input","");
		cb(str);
	}
	public function getChar() {
	}
	public function addPos(x, y) {
		pos.setX(pos.getX() + x);
		pos.setY(pos.getY() + y);
		this.group.transform("translate(" + pos.getX() + "," + pos.getY() + ")");
	}
	public function setPos(x, y) {
		pos.setX(x);
		pos.setY(y);
		this.group.transform("translate(" + pos.getX() + "," + pos.getY() + ")");
	}
	
	public function getPos() {
		return pos;
	}
	
	public function OnPosChanged(x:Float, y:Float) {
		this.setPos(x, y);
	}
	
}

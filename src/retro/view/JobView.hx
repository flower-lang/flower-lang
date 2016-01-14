package retro.view;

import haxe.Timer;
import snap.Snap;
import retro.pub.Editor;
import retro.pub.Point2D;
import retro.pub.RetroType;
import retro.model.Port;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.model.Job;
import retro.model.Value;
import retro.controller.DiagramController;
import retro.controller.JobController;
using Lambda;

/*
	Class Name:JobView
	
	Event
	Method
	-addInputPortView:入力ポートを追加する
	-addOutputPortView:出力ポートを追加する
	-getPos:グローバル座標を取得
*/
class JobView{

	public var pos : Point2D;
	public var prev_pos : Point2D;
	
	public var group:SnapElement;
	public var titleRect:SnapElement;
	public var titleText:SnapElement;
	public var portRect:SnapElement;
	public var coll:SnapElement;
	private var job : Job;
	private var snap : Snap;
	private var configGraphic:SnapElement;
	private var config_timer:Timer;
	
	public var diagramController:DiagramController;
	public var jobController:JobController;
	
	public var diagramView:DiagramView;
	private var inputportviews:Array<InputPortView>;
	private var outputportviews:Array<OutputPortView>;
	
	private var setted_value:String;
	
	public function new(diagramController, jobController, diagramView) {
		this.inputportviews = new Array<InputPortView>();
		this.outputportviews = new Array<OutputPortView>();
		this.diagramController = diagramController;
		this.jobController = jobController;
		this.diagramView = diagramView;
		
		//modelの変更を監視
		this.job = this.jobController.getJob();
		job.onInputPortAdded(OnAddInputPortView);
		job.onOutputPortAdded(OnAddOutputPortView);
		job.onPosChanged(OnPosChanged);

		this.snap = this.jobController.getEditor().snap;
		this.group = snap.group();

		this.titleRect = this.snap.rect(0, 0, Thema.jobWidth, Thema.jobTitleHeight);
		this.titleRect.attr({
				strokeWidth : Thema.jobTitleStrokeWidth,
				stroke : Thema.jobTitleStroke,
				fill : Thema.jobTitleFill
				});
		this.portRect = this.snap.rect(0, Thema.jobTitleHeight, Thema.jobWidth, 0);
		this.portRect.attr({
			strokeWidth : Thema.jobPortStrokeWidth,
				stroke : Thema.jobPortStroke,
				fill : Thema.jobPortFill
			});
		this.coll = this.snap.rect(0, 0, Thema.jobWidth, Thema.jobTitleHeight);
		
		this.titleText = this.snap.text(Thema.jobTitleTextX, Thema.jobTitleTextY, this.job.getName());
		titleText.attr({
			"font-size" : Thema.jobTitleFontSize,
			fill : Thema.jobTitleFontFill,
			"font-family" : Thema.jobTitleFontFamily
		});
		this.pos = new Point2D(0, 0);
		this.prev_pos = new Point2D(0, 0);
		this.setPos(100, 100);
		this.coll.attr({
    	    fill: "#ffffff",
    	    "fill-opacity" : 0,
    	});
		this.coll.mousedown(function(e, x, y){
			//this.visible_config_btn();
		});
		var inDustBox = false;
		var isInDustBox = function(x,y){
			var right = js.Browser.document.body.clientWidth;
			return inDustBox = (right - Thema.dustboxWidth) < x && (x < right) &&
					y < Thema.dustboxHeight;
		};
		this.coll.drag(function(dx, dy, x, y){
        	this.addPos(dx - this.prev_pos.getX(), dy - this.prev_pos.getY());
        	this.prev_pos.setX(dx);
        	this.prev_pos.setY(dy);
        	if(isInDustBox(Std.int(x), Std.int(y))) 
        		this.diagramView.showDustBoxOver() 
        		else this.diagramView.showDustBox();
        	this.refresh();
    	}, function(x, y) {
    		this.prev_pos.setX(0);
    		this.prev_pos.setY(0);
    	}, function(x, y) {
    		this.refresh();
			//this.diagramView.start_step();
    		this.jobController.changePos(this.pos.getX(), this.pos.getY());
    		if(inDustBox){
    			this.diagramController.removeJob(this.jobController.getJob());
    			this.diagramView.showDustBox();
    		}
    	});
	}

	public function drawView(){
		for( portView in this.inputportviews ) this.group.append(portView.group);
		for( portView in this.outputportviews ) this.group.append(portView.group);
		this.group.append(this.titleRect);
		this.group.append(this.portRect);
		this.group.append(this.titleText);
		this.group.append(this.coll);
		for( portView in this.inputportviews ) this.group.append(portView.upperGroup);
		for( portView in this.outputportviews ) this.group.append(portView.upperGroup);
		this.cal2();
		if( this.job.customDraw != null ) this.job.customDraw(this);
	}


	public function removeSelf() {
		this.group.remove();
		//this.config_timer.stop();
	}
	
	private function visible_config_btn() {
		this.config_timer = new Timer(3000);
		this.config_timer.run = function() {
    		this.config_timer.stop();
	    	this.configGraphic.attr({
    			"visibility" : "hidden"
    		});
		}
    	this.configGraphic.attr({
    		"visibility" : "visible"
    	});
	}
	
	//Model変更時に呼ばれるリスナー
	public function OnAddInputPortView(port : InputPort) {
		var snap = this.jobController.getEditor().snap;
		var portView = new InputPortView(this.diagramController, this, port, snap);
		this.inputportviews.push(portView);
		return portView;
	}
	
	//Model変更時に呼ばれるリスナー
	public function OnAddOutputPortView(port : OutputPort) {
		var snap = this.jobController.getEditor().snap;
		var portView = new OutputPortView(this.diagramController, this, port, snap);
		this.outputportviews.push(portView);
		return portView;
	}
	
	public function cal() {
		var th = 2*Math.PI / (this.inputportviews.length + this.outputportviews.length);
		var thh:Float = 0;
		for(pv in this.inputportviews) {
			pv.setR(thh);
			thh += th;
		}
		for(pv in this.outputportviews) {
			pv.setR(thh);
			thh += th;
		}
	}
	public function cal2() {
		this.inputportviews.mapi(function(i, view)
			return view.setPos(0, i * Thema.jobOnePortHeight + Thema.jobTitleHeight +
				Thema.jobOnePortHeight / 2));

		this.outputportviews.mapi(function(i, view)
			return view.setPos(Thema.jobWidth, i * Thema.jobOnePortHeight + Thema.jobTitleHeight + 
				Thema.jobOnePortHeight / 2));
		
		this.portRect.attr({
			height : if( this.inputportviews.length > this.outputportviews.length )
			this.inputportviews.length*Thema.jobOnePortHeight else this.outputportviews.length*Thema.jobOnePortHeight 
		});

		this.coll.attr({
			height : if(this.inputportviews.length > this.outputportviews.length)
			this.inputportviews.length * Thema.jobOnePortHeight + Thema.jobTitleHeight 
			else this.outputportviews.length * Thema.jobOnePortHeight + Thema.jobTitleHeight
		});
	}
	
	public function step() {
		var energy:Float = 0;
		for(portView in this.inputportviews) {
			energy += portView.step();
		}
		for(portView in this.outputportviews) {
			energy += portView.step();
		}
		return energy;
	}
	
	public function refresh() {
		for(portView in this.inputportviews) {
			portView.refresh();
		}
		for(portView in this.outputportviews) {
			portView.refresh();
		}
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
	
	public function getOutputPortView(port:OutputPort) {
		for(opv in this.outputportviews) {
			if(opv.port.getName() == port.getName()) {
				return opv;
			}
		}
		return null;
	}
	
	public function getInputPortView(port:InputPort) {
		for(ipv in this.inputportviews) {
			if(ipv.port.getName() == port.getName()) {
				return ipv;
			}
		}
		return null;
	}
	
	public function getInputPortViews() {
		return this.inputportviews;
	}
	public function getOutputPortViews() {
		return this.outputportviews;
	}
	public function getPortViews() {
		var portViews = new Array<PortView>();
		for(ipv in this.inputportviews) {
			portViews.push(ipv);
		}
		for(opv in this.outputportviews) {
			portViews.push(opv);
		}
		return portViews;
	}
	
	public function OnPosChanged(x:Float, y:Float) {
		this.setPos(x, y);
	}
	
}

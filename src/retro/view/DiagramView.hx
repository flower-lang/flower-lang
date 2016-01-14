package retro.view;

import haxe.Timer;
import snap.Snap;
import retro.pub.Editor;
import retro.pub.Point2D;
import retro.pub.CreateJobDialog;
import retro.model.Job;
import retro.model.Port;
import retro.model.InputPort;
import retro.model.OutputPort;
import retro.model.ValueCarrier;
import retro.controller.DiagramController;
import retro.controller.JobController;

class DiagramView{
	public var group:SnapElement;
	private var diagramController:DiagramController;
	private var onButtonListeners:Array<Int->Void>;
	private var jobViews:Array<JobView>;
	private var valueCarrierViews:Array<ValueCarrierView>;
	public var control_group:SnapElement;
	public var path_group:SnapElement;
	public var showDustBoxOver : Void -> Void;
	public var showDustBox : Void -> Void;
	//力学
	private var timer:Timer = null;
	private var count:Int = 0;
	
	public function new(diagramController) {
		this.jobViews = new Array<JobView>();
		this.valueCarrierViews = new Array<ValueCarrierView>();
		this.diagramController = diagramController;
		var diagram = this.diagramController.getDiagram();
		//モデルの変更を監視
		diagram.onJobAdded(this.OnJobAdded);
		diagram.onJobRemoved(this.OnJobRemoved);
		diagram.onValueCarrierAdded(this.OnValueCarrierAdded);
		diagram.onValueCarrierRemoved(this.OnValueCarrierRemoved);
		diagram.onValueCarrierCleared(this.OnValueCarrierCleared);
		
		var snap = this.diagramController.getEditor().snap;
		this.path_group = snap.group();
		
		this.count = 0;
		
		this.control_group = snap.group();

		Snap.load(#if codeiq "images/create.svg" #else "/images/create.svg" #end, function (f) {
    		var g:SnapElement = f.select("svg");
    		this.control_group.append(g);
    		this.control_group.transform("translate("+Thema.createSvgX+","+Thema.createSvgY+")");
    		Snap.load(#if codeiq "images/create-over.svg" #else "/images/create-over.svg" #end, function (f) {
    			var g2:SnapElement = f.select("svg");
	    		g.click(function(e){
	    			this.control_group.append(g2);
	    			var createJobDialog = new CreateJobDialog();
					createJobDialog.on(function(pkg, cmp, x, y) {
						var jobComponent = this.diagramController.getModule(pkg + "." + cmp);
						var job = this.diagramController.addSymbolicLink(jobComponent);
						job.setPos(x, y);
					});
					createJobDialog.open();
					var timer = new Timer(1000);
					timer.run = function() g2.remove();
	    		});
        	});
        });



		Snap.load(#if codeiq "images/dustbox.svg" #else "/images/dustbox.svg" #end, function (f) {
    		var g:SnapElement = f.select("g");
    		var right = js.Browser.document.body.clientWidth;
    		var dustbox_group = snap.group();
    		dustbox_group.transform("translate("+(right - Thema.dustboxRightX)+","+Thema.dustboxY+")");
        	dustbox_group.append(g);
        	Snap.load(#if codeiq "images/dustbox-over.svg" #else "/images/dustbox-over.svg"#end, function(f){
        		var g2:SnapElement = f.select("g");

        		this.showDustBox = function(){
        			g2.remove();
        			dustbox_group.append(g);
        		}

        		this.showDustBoxOver = function(){
        			g.remove();
        			dustbox_group.append(g2);
        		}
        	});
    	});
	}
	
	public function start_step() {
		if(this.timer == null) {
			this.timer = new Timer(80);
			this.timer.run = function() {
				var energy = this.step();
				this.count++;
				if(energy < 1 || this.count > 100) {
					this.timer.stop();
					this.timer = null;
					this.count = 0;
				}
			};
		}
	}
	
	public function step() {
		var energy:Float = 0;
		for(jv in this.jobViews) {
			energy += jv.step();
		}
		return energy;
	}
	
	//モデルが変更されたときに呼ばれるリスナー
	public function OnJobAdded(job:Job) {
		var jobView = new JobView(this.diagramController,
							new JobController(
								this.diagramController.getEditor(),
								job),
							this);
		for(ip in job.getInputPorts()) {
			jobView.OnAddInputPortView(ip);
		}
		for(op in job.getOutputPorts()) {
			jobView.OnAddOutputPortView(op);
		}
		jobView.drawView();
		this.jobViews.push(jobView);
	}
	
	public function OnJobRemoved(job:Job) {
		for(jobView in this.jobViews) {
			if(jobView.jobController.getJob() == job) {
				jobView.removeSelf();
				this.jobViews.remove(jobView);
				return;
			}
		}
	}
	
	public function OnValueCarrierAdded(valueCarrier:ValueCarrier) {
		valueCarrierViews.push(new ValueCarrierView(this.diagramController.getEditor(), valueCarrier, this));
	}
	
	public function OnValueCarrierRemoved(valueCarrier:ValueCarrier) {
		for(vcv in valueCarrierViews) {
			if(vcv.valueCarrier == valueCarrier) {
				vcv.remove();
				valueCarrierViews.remove(vcv);
				return;
			}
		}
	}
	//全消し
	public function OnValueCarrierCleared() {
		for(vcv in this.valueCarrierViews) {
			vcv.remove();
		}
		this.valueCarrierViews = new Array<ValueCarrierView>();
	}
	
	public function getOutputPortView(port:OutputPort) {
		for(jv in this.jobViews) {
			if(jv.jobController.getJob().getId() != port.getParentJob().getId()) {
				continue;
			}
			var opv = jv.getOutputPortView(port);
			if(opv != null) {
				return opv;
			}
		}
		return null;
	}
	
	public function getInputPortView(port:InputPort) {
		for(jv in this.jobViews) {
			if(jv.jobController.getJob().getId() != port.getParentJob().getId()) {
				continue;
			}
			var opv = jv.getInputPortView(port);
			if(opv != null) {
				return opv;
			}
		}
		return null;
	}
	
}

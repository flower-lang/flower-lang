package retro.vm;

import retro.vm.Application;
using retro.vm.Application;
import retro.model.Diagram;
import retro.model.Job;
import retro.model.EntryJob;
import retro.vm.Worker;
import retro.model.ValueCarrier;
import retro.model.Value;
import retro.core.Result;
import retro.pub.RetroType;
import haxe.Timer;

//Flowerで作成されたアプリケーションの実行を管理するクラス
class Runtime{
	//private var app : Application;
	private var diagram : Diagram;
	private var timer:Timer;
	
	public function new(diagram:Diagram) {
		this.diagram = diagram;
	}
	
	public function isRunning():Bool {
		if(this.timer != null) {
			return true;
		}
		return false;
	}
	
	//実行
	public function run(entry:EntryJob, ?v) {
		this.invoke_entry(entry, new Value(RetroType.RNumber, v));
		#if cpp
		while(true) {
			run_step();
			Sys.sleep(0.05);
		}
		#else
		var speed = js.Browser.window.sessionStorage.getItem("speed");
		if(speed == null) {
			speed = "32";
		}
		this.timer = new Timer(Std.parseInt(speed));
		this.timer.run = function() {
			this.run_step();
		};
		#end
	}
	
	public function stop() {
		#if cpp
		#else
		this.timer.stop();
		this.timer = null;
		#end
	}
	
	//エントリを起こす
	public function invoke_entry(entry:Job, v) {
		var worker = entry.getWorker();
		worker.act(null, function(script_result:Result) {
			for(p in entry.getOutputPorts()) {
				for(c in p.connection) {
					var newValueCarrier = new ValueCarrier(v, p, c);
					this.diagram.addValueCarrier(newValueCarrier);
				}
			}
		});
		return true;
	}
	
	//ステップ実行
	public function run_step() {
		for(valueCarrier in this.diagram.getValueCarriers()) {
			var port = valueCarrier.step();
			if(port == null) {
				continue;
			}
			port.setValueCarrier(valueCarrier);
			var params = port.parent.getParams();
			var worker = port.parent.getWorker();
			//インプットがすべて埋まっているときに消費
			var flg:Bool = true;
			for(p in port.parent.getInputPorts()) {
				if(p.getValue() == null) {
					flg = false;
				}
			}
			if(flg) {
				for(p in port.parent.getInputPorts()) {
					this.diagram.removeValueCarrier(p.useValueCarrier());
				}
			}
			worker.act(params, function(script_result) {
				if(script_result == null) {
					return;
				}
				for(p in port.parent.getInputPorts()) {
					this.diagram.removeValueCarrier(p.useValueCarrier());
				}
				this.diagram.removeValueCarrier(valueCarrier);
				//出力ポート分ループ
				for(p in port.parent.getOutputPorts()) {
					var sr = script_result.get(p.name);
					//コネクションの先の分ループ
					if(sr == null) continue;
					for(c in p.connection) {
						var newValueCarrier = new ValueCarrier(new Value(p.type, sr.value), p, c);
						this.diagram.addValueCarrier(newValueCarrier);
					}
				}
			});
		}
	}
}





package retro.vm;

import retro.pub.RetroType;
import retro.model.Job;
import retro.model.Port;
import retro.model.Value;
import retro.core.Params;
import retro.core.Result;

class Worker{
	private var job:Job;
	private var func:Params->(Result->Void)->Void;
	
	public function new(job, func){
		this.job = job;
		this.func = func;
	}
	
	//実行する
	public function act(params:Params, cb) {
		//スレッドを起動して実行する
		this.func(params, cb);
	}
}


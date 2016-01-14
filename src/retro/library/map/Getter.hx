package retro.library.map;

import retro.core.JobComponent;
import retro.core.Inputs;
import retro.core.Params;
import retro.core.Outputs;
import retro.core.Result;
import retro.pub.RetroType;

class Getter implements JobComponent {
    public var name:String;
    public var inputs:Inputs;
    public var outputs:Outputs;
    
    public function new() {
        this.name = "Getter";
        this.inputs = new Inputs();
        this.outputs = new Outputs();
        this.inputs.add("key", RetroType.RNumber);
        this.outputs.add("value", RetroType.RNumber);
        this.outputs.add("exists", RetroType.RNumber);
    }
    
    public function onInputRecieved(params:Params, cb) {
        var key = params.get("key");
        if(key.isEmpty()) {
            cb(null);
            return;
        }
        var exists = Pod.getInstance().exists(key.getValue());
        var value = Pod.getInstance().get(key.getValue());
        var result = new Result();
        result.set("exists",exists);
        result.set("value", value);
        cb(result);
    }
    
    public function getModuleName() {
        return "map.Getter";
    }
    
}

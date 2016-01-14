package retro.core;

import retro.pub.RetroType;

class Result{
        private var script_result : Array<ScriptReturnValue>;
        
        public function new() {
                this.script_result = new Array<ScriptReturnValue>();
        }
        public function set(portname, value:Dynamic) {
                for(sr in this.script_result) {
                        if(sr.portname == portname) {
                                sr.value = value;
                                return;
                        }
                }
                this.script_result.push(new ScriptReturnValue(portname, value));
        }
        public function get(portname) {
                for(sr in this.script_result) {
                        if(sr.portname == portname) {
                                return sr;
                        }
                }
                return null;
        }
}

class ScriptReturnValue{
        public var portname : String;
        public var value : Dynamic;
        public function new(portname, value) {
                this.portname = portname;
                this.value = value;
        }
}

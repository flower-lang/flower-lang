(function ($hx_exports) { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
var Main = $hx_exports.Main = function() { };
Main.__name__ = ["Main"];
Main.main = function() {
	var load = function() {
		retro.pub.Editor.create();
	};
};
Main.init = function(dom) {
	retro.pub.Editor.create(dom);
};
Main.codeiq = function() {
	retro.pub.Editor.createCodeIQ();
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var ModuleAdder = function() { };
ModuleAdder.__name__ = ["ModuleAdder"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var retro = {};
retro.controller = {};
retro.controller.Controller = function() { };
retro.controller.Controller.__name__ = ["retro","controller","Controller"];
retro.controller.Controller.prototype = {
	__class__: retro.controller.Controller
};
retro.controller.DiagramController = function(editor,diagram,virtualDevice) {
	this.editor = editor;
	this.diagram = diagram;
	this.modules = new Array();
	this.modules.push(new retro.library.core.Through());
	this.modules.push(new retro.library.core.Add());
	this.modules.push(new retro.library.core.Times());
	this.modules.push(new retro.library.core.Remainder());
	this.modules.push(new retro.library.core.Filter());
	this.modules.push(new retro.library.core.Compare());
	this.modules.push(new retro.library.core.And());
	this.modules.push(new retro.library.core.Or());
	this.modules.push(new retro.library.core.Not());
	this.modules.push(new retro.library.core.Transistor());
	this.modules.push(new retro.library.core.Gate());
	this.modules.push(new retro.library.core.TextBox());
	this.modules.push(new retro.library.number.C0());
	this.modules.push(new retro.library.number.C1());
	this.modules.push(new retro.library.number.C2());
	this.modules.push(new retro.library.number.C3());
	this.modules.push(new retro.library.number.C4());
	this.modules.push(new retro.library.number.C5());
	this.modules.push(new retro.library.number.C6());
	this.modules.push(new retro.library.number.C7());
	this.modules.push(new retro.library.number.C8());
	this.modules.push(new retro.library.number.C9());
	this.modules.push(new retro.library.math.Abs());
	this.modules.push(new retro.library.math.Acos());
	this.modules.push(new retro.library.math.Asin());
	this.modules.push(new retro.library.math.Atan());
	this.modules.push(new retro.library.math.Atan2());
	this.modules.push(new retro.library.math.Cos());
	this.modules.push(new retro.library.math.Sin());
	this.modules.push(new retro.library.math.Floor());
	this.modules.push(new retro.library.math.Log());
	this.modules.push(new retro.library.math.Max());
	this.modules.push(new retro.library.math.Min());
	this.modules.push(new retro.library.math.Pow());
	this.modules.push(new retro.library.math.Random());
	this.modules.push(new retro.library.math.Sqrt());
	this.modules.push(new retro.library.system.Speed());
	this.modules.push(new retro.library.system.Print(virtualDevice));
	this.modules.push(new retro.library.system.Scan(virtualDevice));
	this.modules.push(new retro.library.snapsvg.Draw());
	this.modules.push(new retro.library.snapsvg.Rect(virtualDevice));
	this.modules.push(new retro.library.snapsvg.Circle(virtualDevice));
	this.modules.push(new retro.library.snapelement.Translate());
	this.modules.push(new retro.library.snapelement.Fill());
	this.modules.push(new retro.library.snapelement.MouseDown());
	this.modules.push(new retro.library.map.Setter());
	this.modules.push(new retro.library.map.Getter());
	this.modules.push(new retro.library.string.Split());
	this.modules.push(new retro.library.string.IndexOf());
	this.modules.push(new retro.library.string.ChatAt());
	this.modules.push(new retro.library.string.Substr());
	this.modules.push(new retro.library.string.Length());
	this.modules.push(new retro.library.string.LastIndexOf());
	this.modules.push(new retro.library.array.Create());
	this.modules.push(new retro.library.array.Length());
	this.modules.push(new retro.library.array.Push());
	this.modules.push(new retro.library.array.Pop());
	this.modules.push(new retro.library.array.Shift());
	this.modules.push(new retro.library.array.Get());
};
retro.controller.DiagramController.__name__ = ["retro","controller","DiagramController"];
retro.controller.DiagramController.__interfaces__ = [retro.controller.Controller];
retro.controller.DiagramController.disconnect = function(oport,iport) {
	oport.disconnectToInputPort(iport);
};
retro.controller.DiagramController.prototype = {
	getEditor: function() {
		return this.editor;
	}
	,getDiagram: function() {
		return this.diagram;
	}
	,addJob: function() {
		var id = this.editor.IdGenerator.genID();
		var job = new retro.model.Job(id);
		this.diagram.addJob(job);
	}
	,addSymbolicLink: function(jobComponent) {
		var id = this.editor.IdGenerator.genID();
		var job = new retro.model.SymbolicLink(id,jobComponent);
		this.diagram.addJob(job);
		return job;
	}
	,addEntryJob: function() {
		var id = this.editor.IdGenerator.genID();
		var job = new retro.model.EntryJob(id);
		job.addOutputPort(new retro.model.OutputPort(job,retro.pub.RetroType.RString,"output"));
		this.diagram.setEntryPoint(job);
		return job;
	}
	,addLogic: function(id) {
		var job = new retro.model.Logic(id);
		this.diagram.addJob(job);
	}
	,removeJob: function(job) {
		this.diagram.removeJob(job);
	}
	,setRubberbandStart: function(port) {
		if(this.start != null) this.start.onNormal();
		this.start = port;
		this.start.onSelected();
	}
	,setRubberbandEnd: function(port) {
		if(this.start == null) return false; else if(port.parent == this.start.parent) return false; else {
			this.end = port;
			this.start.onNormal();
			this.start.connectToInputPort(this.end);
			return true;
		}
	}
	,clearRubberband: function() {
		if(this.start != null) this.start.onNormal();
		this.start = null;
		this.end = null;
	}
	,getModule: function(name) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m.getModuleName() == name) return m;
		}
		return null;
	}
	,__class__: retro.controller.DiagramController
};
retro.controller.ExportController = function(editor,project) {
	this.editor = editor;
	this.project = project;
};
retro.controller.ExportController.__name__ = ["retro","controller","ExportController"];
retro.controller.ExportController.__interfaces__ = [retro.controller.Controller];
retro.controller.ExportController.prototype = {
	getProject: function() {
		return this.project;
	}
	,do_export: function() {
		var model = { };
		var diagram = this.project.getRootDiagram();
		model.diagram = this.export_diagram(diagram);
		return model;
	}
	,export_diagram: function(diagram) {
		var diagram_model = { };
		diagram_model.jobs = [];
		var _g = 0;
		var _g1 = diagram.getJobs();
		while(_g < _g1.length) {
			var job = _g1[_g];
			++_g;
			diagram_model.jobs.push(this.export_job(job));
		}
		return diagram_model;
	}
	,export_job: function(job) {
		var job_model = job.getJSON();
		job_model.meta = Type.getClassName(Type.getClass(job));
		job_model.pos = { };
		job_model.pos.x = job.getPos().getX();
		job_model.pos.y = job.getPos().getY();
		job_model.inputports = [];
		job_model.outputports = [];
		var _g = 0;
		var _g1 = job.getInputPorts();
		while(_g < _g1.length) {
			var port = _g1[_g];
			++_g;
			job_model.inputports.push(this.import_outputport(port));
		}
		var _g2 = 0;
		var _g11 = job.getOutputPorts();
		while(_g2 < _g11.length) {
			var port1 = _g11[_g2];
			++_g2;
			job_model.outputports.push(this.export_outputport(port1));
		}
		return job_model;
	}
	,import_outputport: function(inputport) {
		var inputport_model = { };
		inputport_model.name = inputport.getName();
		if(inputport.getConstantValue() != null) {
			inputport_model.constant = { };
			inputport_model.constant.type = inputport.getConstantValue().type;
			inputport_model.constant.value = inputport.getConstantValue().value;
		}
		return inputport_model;
	}
	,export_outputport: function(outputport) {
		var outputport_model = { };
		outputport_model.name = outputport.getName();
		outputport_model.connections = [];
		var _g = 0;
		var _g1 = outputport.getConnections();
		while(_g < _g1.length) {
			var inputPort = _g1[_g];
			++_g;
			outputport_model.connections.push(inputPort.getURI());
		}
		return outputport_model;
	}
	,__class__: retro.controller.ExportController
};
retro.controller.ImportController = function(project,virtualDevice) {
	this.project = project;
	this.modules = new Array();
	this.modules.push(new retro.library.core.Through());
	this.modules.push(new retro.library.core.Add());
	this.modules.push(new retro.library.core.Times());
	this.modules.push(new retro.library.core.Remainder());
	this.modules.push(new retro.library.core.Filter());
	this.modules.push(new retro.library.core.Compare());
	this.modules.push(new retro.library.core.And());
	this.modules.push(new retro.library.core.Or());
	this.modules.push(new retro.library.core.Not());
	this.modules.push(new retro.library.core.Transistor());
	this.modules.push(new retro.library.core.Gate());
	this.modules.push(new retro.library.core.TextBox());
	this.modules.push(new retro.library.number.C0());
	this.modules.push(new retro.library.number.C1());
	this.modules.push(new retro.library.number.C2());
	this.modules.push(new retro.library.number.C3());
	this.modules.push(new retro.library.number.C4());
	this.modules.push(new retro.library.number.C5());
	this.modules.push(new retro.library.number.C6());
	this.modules.push(new retro.library.number.C7());
	this.modules.push(new retro.library.number.C8());
	this.modules.push(new retro.library.number.C9());
	this.modules.push(new retro.library.math.Abs());
	this.modules.push(new retro.library.math.Acos());
	this.modules.push(new retro.library.math.Asin());
	this.modules.push(new retro.library.math.Atan());
	this.modules.push(new retro.library.math.Atan2());
	this.modules.push(new retro.library.math.Cos());
	this.modules.push(new retro.library.math.Sin());
	this.modules.push(new retro.library.math.Floor());
	this.modules.push(new retro.library.math.Log());
	this.modules.push(new retro.library.math.Max());
	this.modules.push(new retro.library.math.Min());
	this.modules.push(new retro.library.math.Pow());
	this.modules.push(new retro.library.math.Random());
	this.modules.push(new retro.library.math.Sqrt());
	this.modules.push(new retro.library.system.Speed());
	this.modules.push(new retro.library.system.Print(virtualDevice));
	this.modules.push(new retro.library.system.Scan(virtualDevice));
	this.modules.push(new retro.library.snapsvg.Draw());
	this.modules.push(new retro.library.snapsvg.Rect(virtualDevice));
	this.modules.push(new retro.library.snapsvg.Circle(virtualDevice));
	this.modules.push(new retro.library.snapelement.Translate());
	this.modules.push(new retro.library.snapelement.Fill());
	this.modules.push(new retro.library.snapelement.MouseDown());
	this.modules.push(new retro.library.map.Setter());
	this.modules.push(new retro.library.map.Getter());
	this.modules.push(new retro.library.string.Split());
	this.modules.push(new retro.library.string.IndexOf());
	this.modules.push(new retro.library.string.ChatAt());
	this.modules.push(new retro.library.string.Substr());
	this.modules.push(new retro.library.string.Length());
	this.modules.push(new retro.library.string.LastIndexOf());
	this.modules.push(new retro.library.array.Create());
	this.modules.push(new retro.library.array.Length());
	this.modules.push(new retro.library.array.Push());
	this.modules.push(new retro.library.array.Pop());
	this.modules.push(new retro.library.array.Shift());
	this.modules.push(new retro.library.array.Get());
};
retro.controller.ImportController.__name__ = ["retro","controller","ImportController"];
retro.controller.ImportController.prototype = {
	getProject: function() {
		return this.project;
	}
	,getModule: function(name) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m.getModuleName() == name) return m;
		}
		return null;
	}
	,do_import: function(model) {
		var diagram = new retro.model.Diagram();
		this.project.setRootDiagram(diagram);
		this.import_diagram(diagram,model.model.diagram);
	}
	,import_diagram: function(diagram,diagram_model) {
		var jobs = diagram_model.jobs;
		var _g = 0;
		while(_g < jobs.length) {
			var j = jobs[_g];
			++_g;
			if(j.meta == "retro.model.EntryJob") {
				var entry = new retro.model.EntryJob(j.id);
				entry.addOutputPort(new retro.model.OutputPort(entry,retro.pub.RetroType.RString,"output"));
				diagram.setEntryPoint(entry);
				entry.setPos(j.pos.x,j.pos.y);
			} else if(j.meta == "retro.model.SymbolicLink") {
				var jobComponent = this.getModule(j.ref);
				var job = new retro.model.SymbolicLink(j.id,jobComponent);
				diagram.addJob(job);
				job.setPos(j.pos.x,j.pos.y);
			}
		}
		var _g1 = 0;
		while(_g1 < jobs.length) {
			var j1 = jobs[_g1];
			++_g1;
			this.import_job(j1,diagram);
		}
	}
	,import_job: function(model,diagram) {
		var ops = model.outputports;
		var ips = model.inputports;
		var _g = 0;
		while(_g < ops.length) {
			var op = ops[_g];
			++_g;
			var start = diagram.getOutputPort(Std.string(model.id) + "." + Std.string(op.name));
			var cons = op.connections;
			var _g1 = 0;
			while(_g1 < cons.length) {
				var con = cons[_g1];
				++_g1;
				var end = diagram.getInputPort(con);
				start.connectToInputPort(end);
			}
		}
		var _g2 = 0;
		while(_g2 < ips.length) {
			var ip = ips[_g2];
			++_g2;
			var inputPort = diagram.getInputPort(Std.string(model.id) + "." + Std.string(ip.name));
			if(ip.constant != null) inputPort.setConstant(new retro.model.Value(ip.constant.type,ip.constant.value));
		}
	}
	,__class__: retro.controller.ImportController
};
retro.controller.JobController = function(editor,job) {
	this.editor = editor;
	this.job = job;
};
retro.controller.JobController.__name__ = ["retro","controller","JobController"];
retro.controller.JobController.__interfaces__ = [retro.controller.Controller];
retro.controller.JobController.prototype = {
	getEditor: function() {
		return this.editor;
	}
	,getJob: function() {
		return this.job;
	}
	,changePos: function(x,y) {
		this.job.setPos(x,y);
	}
	,addInputPort: function(name) {
		var port = new retro.model.InputPort(this.job,retro.pub.RetroType.RString,name);
		this.job.addInputPort(port);
	}
	,addOutputPort: function(name) {
		var port = new retro.model.OutputPort(this.job,retro.pub.RetroType.RString,name);
		this.job.addOutputPort(port);
	}
	,removeInputPort: function(port) {
	}
	,removeOutputPort: function(port) {
	}
	,connect: function(oport,iport) {
		oport.connectToInputPort(iport);
	}
	,disconnect: function(oport,iport) {
		oport.disconnectToInputPort(iport);
	}
	,__class__: retro.controller.JobController
};
retro.controller.ProjectController = function(editor,project) {
	this.editor = editor;
	this.project = project;
};
retro.controller.ProjectController.__name__ = ["retro","controller","ProjectController"];
retro.controller.ProjectController.__interfaces__ = [retro.controller.Controller];
retro.controller.ProjectController.prototype = {
	getEditor: function() {
		return this.editor;
	}
	,getProject: function() {
		return this.project;
	}
	,addDiagram: function() {
		var diagram = new retro.model.Diagram();
		var diagramController = new retro.controller.DiagramController(this.editor,diagram,this.editor.virtualDevice);
		var diagramView = new retro.view.DiagramView(diagramController);
		this.project.setRootDiagram(diagram);
	}
	,run: function() {
		if(this.runtime == null) this.runtime = new retro.vm.Runtime(this.project.getRootDiagram());
		var entry = this.getProject().getRootDiagram().getEntryPoint();
		this.runtime.run(entry,0);
	}
	,stop: function() {
		if(this.runtime == null) this.runtime = new retro.vm.Runtime(this.project.getRootDiagram());
		this.runtime.stop();
		var diagram = this.getProject().getRootDiagram();
		diagram.clearValueCarriers();
	}
	,__class__: retro.controller.ProjectController
};
retro.core = {};
retro.core.FlowerClass = function() { };
retro.core.FlowerClass.__name__ = ["retro","core","FlowerClass"];
retro.core.FlowerClass.prototype = {
	__class__: retro.core.FlowerClass
};
retro.core.Input = function(name,type) {
	this.name = name;
	this.type = type;
};
retro.core.Input.__name__ = ["retro","core","Input"];
retro.core.Input.prototype = {
	getName: function() {
		return this.name;
	}
	,getType: function() {
		return this.type;
	}
	,__class__: retro.core.Input
};
retro.core.Inputs = function() {
	this.inputs = new Array();
};
retro.core.Inputs.__name__ = ["retro","core","Inputs"];
retro.core.Inputs.prototype = {
	add: function(name,type) {
		this.inputs.push(new retro.core.Input(name,type));
	}
	,get: function(name) {
		var _g = 0;
		var _g1 = this.inputs;
		while(_g < _g1.length) {
			var input = _g1[_g];
			++_g;
			if(input.name == name) return input;
		}
		return null;
	}
	,getArray: function() {
		return this.inputs;
	}
	,__class__: retro.core.Inputs
};
retro.core.JobComponent = function() { };
retro.core.JobComponent.__name__ = ["retro","core","JobComponent"];
retro.core.JobComponent.prototype = {
	__class__: retro.core.JobComponent
};
retro.core.Outputs = function() {
	this.outputs = new Array();
};
retro.core.Outputs.__name__ = ["retro","core","Outputs"];
retro.core.Outputs.prototype = {
	add: function(name,type) {
		this.outputs.push(new retro.core.Output(name,type));
	}
	,get: function(name) {
		var _g = 0;
		var _g1 = this.outputs;
		while(_g < _g1.length) {
			var output = _g1[_g];
			++_g;
			if(output.name == name) return output;
		}
		return null;
	}
	,getArray: function() {
		return this.outputs;
	}
	,__class__: retro.core.Outputs
};
retro.core.Output = function(name,type) {
	this.name = name;
	this.type = type;
};
retro.core.Output.__name__ = ["retro","core","Output"];
retro.core.Output.prototype = {
	getType: function() {
		return this.type;
	}
	,getName: function() {
		return this.name;
	}
	,__class__: retro.core.Output
};
retro.core.Params = function() {
	this.params = new Array();
};
retro.core.Params.__name__ = ["retro","core","Params"];
retro.core.Params.prototype = {
	get: function(name) {
		var _g = 0;
		var _g1 = this.params;
		while(_g < _g1.length) {
			var param = _g1[_g];
			++_g;
			if(param.name == name) return param;
		}
		return null;
	}
	,add: function(name,value) {
		this.params.push(new retro.core.Param(name,value));
	}
	,toString: function() {
		var str = "[";
		var _g = 0;
		var _g1 = this.params;
		while(_g < _g1.length) {
			var param = _g1[_g];
			++_g;
			str += "{" + param.name + "," + Std.string(param.value.value) + "}";
		}
		str += "]";
		return str;
	}
	,__class__: retro.core.Params
};
retro.core.Param = function(name,value) {
	this.name = name;
	this.value = value;
};
retro.core.Param.__name__ = ["retro","core","Param"];
retro.core.Param.prototype = {
	isEmpty: function() {
		return this.value == null;
	}
	,getValue: function() {
		return this.value.value;
	}
	,__class__: retro.core.Param
};
retro.core.Result = function() {
	this.script_result = new Array();
};
retro.core.Result.__name__ = ["retro","core","Result"];
retro.core.Result.prototype = {
	set: function(portname,value) {
		var _g = 0;
		var _g1 = this.script_result;
		while(_g < _g1.length) {
			var sr = _g1[_g];
			++_g;
			if(sr.portname == portname) {
				sr.value = value;
				return;
			}
		}
		this.script_result.push(new retro.core.ScriptReturnValue(portname,value));
	}
	,get: function(portname) {
		var _g = 0;
		var _g1 = this.script_result;
		while(_g < _g1.length) {
			var sr = _g1[_g];
			++_g;
			if(sr.portname == portname) return sr;
		}
		return null;
	}
	,__class__: retro.core.Result
};
retro.core.ScriptReturnValue = function(portname,value) {
	this.portname = portname;
	this.value = value;
};
retro.core.ScriptReturnValue.__name__ = ["retro","core","ScriptReturnValue"];
retro.core.ScriptReturnValue.prototype = {
	__class__: retro.core.ScriptReturnValue
};
retro.core.VirtualDevice = function() {
};
retro.core.VirtualDevice.__name__ = ["retro","core","VirtualDevice"];
retro.core.VirtualDevice.prototype = {
	setConsoleDevice: function(consoleDevice) {
		this.consoleDevice = consoleDevice;
	}
	,getConsoleDevice: function() {
		return this.consoleDevice;
	}
	,setSVGDevice: function(snap) {
		this.snap = snap;
	}
	,getSnap: function() {
		return this.snap;
	}
	,__class__: retro.core.VirtualDevice
};
retro.library = {};
retro.library.array = {};
retro.library.array.Create = function() {
	this.name = "Create";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.array.Create.__name__ = ["retro","library","array","Create"];
retro.library.array.Create.__interfaces__ = [retro.core.JobComponent];
retro.library.array.Create.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",[]);
		cb(result);
	}
	,getModuleName: function() {
		return "array.Create";
	}
	,__class__: retro.library.array.Create
};
retro.library.array.Get = function() {
	this.name = "Get";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("array",retro.pub.RetroType.RNumber);
	this.inputs.add("index",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.array.Get.__name__ = ["retro","library","array","Get"];
retro.library.array.Get.__interfaces__ = [retro.core.JobComponent];
retro.library.array.Get.prototype = {
	onInputRecieved: function(params,cb) {
		var array = params.get("array");
		var index = params.get("index");
		if(array.isEmpty() || index.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",array.getValue()[index.getValue()]);
		cb(result);
	}
	,getModuleName: function() {
		return "array.Get";
	}
	,__class__: retro.library.array.Get
};
retro.library.array.Length = function() {
	this.name = "Length";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("array",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.array.Length.__name__ = ["retro","library","array","Length"];
retro.library.array.Length.__interfaces__ = [retro.core.JobComponent];
retro.library.array.Length.prototype = {
	onInputRecieved: function(params,cb) {
		var array = params.get("array");
		if(array.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",array.getValue().length);
		cb(result);
	}
	,getModuleName: function() {
		return "array.Length";
	}
	,__class__: retro.library.array.Length
};
retro.library.array.Pop = function() {
	this.name = "Pop";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("array",retro.pub.RetroType.RNumber);
	this.outputs.add("value",retro.pub.RetroType.RNumber);
};
retro.library.array.Pop.__name__ = ["retro","library","array","Pop"];
retro.library.array.Pop.__interfaces__ = [retro.core.JobComponent];
retro.library.array.Pop.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		var array = input.getValue();
		var value = array.pop();
		result.set("array",array);
		result.set("value",value);
		cb(result);
	}
	,getModuleName: function() {
		return "array.Pop";
	}
	,__class__: retro.library.array.Pop
};
retro.library.array.Push = function() {
	this.name = "Push";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("array",retro.pub.RetroType.RNumber);
	this.inputs.add("value",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.array.Push.__name__ = ["retro","library","array","Push"];
retro.library.array.Push.__interfaces__ = [retro.core.JobComponent];
retro.library.array.Push.prototype = {
	onInputRecieved: function(params,cb) {
		var array = params.get("array");
		var value = params.get("value");
		if(array.isEmpty() || value.isEmpty()) {
			cb(null);
			return;
		}
		array.getValue().push(value.getValue());
		var result = new retro.core.Result();
		result.set("output",array.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "array.Push";
	}
	,__class__: retro.library.array.Push
};
retro.library.array.Shift = function() {
	this.name = "Shift";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("array",retro.pub.RetroType.RNumber);
	this.outputs.add("value",retro.pub.RetroType.RNumber);
};
retro.library.array.Shift.__name__ = ["retro","library","array","Shift"];
retro.library.array.Shift.__interfaces__ = [retro.core.JobComponent];
retro.library.array.Shift.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		var array = input.getValue();
		var value = array.shift();
		result.set("array",array);
		result.set("value",value);
		cb(result);
	}
	,getModuleName: function() {
		return "array.Shift";
	}
	,__class__: retro.library.array.Shift
};
retro.library.core = {};
retro.library.core.Add = function() {
	this.name = "Add";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input1",retro.pub.RetroType.RNumber);
	this.inputs.add("input2",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.Add.__name__ = ["retro","library","core","Add"];
retro.library.core.Add.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Add.prototype = {
	onInputRecieved: function(params,cb) {
		var input1 = params.get("input1");
		var input2 = params.get("input2");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input1.getValue() + input2.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Add";
	}
	,__class__: retro.library.core.Add
};
retro.library.core.And = function() {
	this.name = "And";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input1",retro.pub.RetroType.RNumber);
	this.inputs.add("input2",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.And.__name__ = ["retro","library","core","And"];
retro.library.core.And.__interfaces__ = [retro.core.JobComponent];
retro.library.core.And.prototype = {
	onInputRecieved: function(params,cb) {
		var input1 = params.get("input1");
		var input2 = params.get("input2");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input1.getValue() && input2.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.And";
	}
	,__class__: retro.library.core.And
};
retro.library.core.Compare = function() {
	this.name = "Compare";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("value",retro.pub.RetroType.RNumber);
	this.inputs.add("comparison",retro.pub.RetroType.RNumber);
	this.inputs.add("operator",retro.pub.RetroType.RString);
	this.outputs.add("pass",retro.pub.RetroType.RNumber);
};
retro.library.core.Compare.__name__ = ["retro","library","core","Compare"];
retro.library.core.Compare.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Compare.prototype = {
	onInputRecieved: function(params,cb) {
		var value = params.get("value");
		var comparison = params.get("comparison");
		var operator = params.get("operator");
		if(value.isEmpty() || comparison.isEmpty() || operator.isEmpty()) {
			cb(null);
			return;
		}
		var pass = false;
		var _g = operator.getValue();
		switch(_g) {
		case "eq":case "==":
			pass = value.getValue() == comparison.getValue();
			break;
		case "ne":case "!=":
			pass = value.getValue() != comparison.getValue();
			break;
		case "gt":case ">":
			pass = value.getValue() > comparison.getValue();
			break;
		case "lt":case "<":
			pass = value.getValue() < comparison.getValue();
			break;
		case "ge":case ">=":
			pass = value.getValue() >= comparison.getValue();
			break;
		case "le":case "<=":
			pass = value.getValue() <= comparison.getValue();
			break;
		default:
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("pass",pass);
		cb(result);
	}
	,getModuleName: function() {
		return "core.Compare";
	}
	,__class__: retro.library.core.Compare
};
retro.library.core.Filter = function() {
	this.name = "Filter";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("value",retro.pub.RetroType.RNumber);
	this.inputs.add("comparison",retro.pub.RetroType.RNumber);
	this.inputs.add("operator",retro.pub.RetroType.RString);
	this.outputs.add("pass",retro.pub.RetroType.RNumber);
};
retro.library.core.Filter.__name__ = ["retro","library","core","Filter"];
retro.library.core.Filter.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Filter.prototype = {
	onInputRecieved: function(params,cb) {
		var value = params.get("value");
		var comparison = params.get("comparison");
		var operator = params.get("operator");
		if(value.isEmpty() || comparison.isEmpty() || operator.isEmpty()) {
			cb(null);
			return;
		}
		var pass = false;
		var _g = operator.getValue();
		switch(_g) {
		case "eq":case "==":
			pass = value.getValue() == comparison.getValue();
			break;
		case "ne":case "!=":
			pass = value.getValue() != comparison.getValue();
			break;
		case "gt":case ">":
			pass = value.getValue() > comparison.getValue();
			break;
		case "lt":case "<":
			pass = value.getValue() < comparison.getValue();
			break;
		case "ge":case ">=":
			pass = value.getValue() >= comparison.getValue();
			break;
		case "le":case "<=":
			pass = value.getValue() <= comparison.getValue();
			break;
		default:
			cb(null);
			return;
		}
		if(pass == false) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("pass",value.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Filter";
	}
	,__class__: retro.library.core.Filter
};
retro.library.core.Gate = function() {
	this.name = "Gate";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.inputs.add("gate",retro.pub.RetroType.RNumber);
	this.outputs.add("true",retro.pub.RetroType.RNumber);
	this.outputs.add("false",retro.pub.RetroType.RNumber);
};
retro.library.core.Gate.__name__ = ["retro","library","core","Gate"];
retro.library.core.Gate.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Gate.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		var gate = params.get("gate");
		if(input.isEmpty() || gate.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		if(gate.getValue()) result.set("true",input.getValue()); else result.set("false",input.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Gate";
	}
	,__class__: retro.library.core.Gate
};
retro.library.core.Not = function() {
	this.name = "Not";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.Not.__name__ = ["retro","library","core","Not"];
retro.library.core.Not.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Not.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",!input.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Not";
	}
	,__class__: retro.library.core.Not
};
retro.library.core.Or = function() {
	this.name = "Or";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input1",retro.pub.RetroType.RNumber);
	this.inputs.add("input2",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.Or.__name__ = ["retro","library","core","Or"];
retro.library.core.Or.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Or.prototype = {
	onInputRecieved: function(params,cb) {
		var input1 = params.get("input1");
		var input2 = params.get("input2");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input1.getValue() || input2.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Or";
	}
	,__class__: retro.library.core.Or
};
retro.library.core.Remainder = function() {
	this.name = "Remainder";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input1",retro.pub.RetroType.RNumber);
	this.inputs.add("input2",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.Remainder.__name__ = ["retro","library","core","Remainder"];
retro.library.core.Remainder.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Remainder.prototype = {
	onInputRecieved: function(params,cb) {
		var input1 = params.get("input1");
		var input2 = params.get("input2");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input1.getValue() % input2.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Remainder";
	}
	,__class__: retro.library.core.Remainder
};
retro.library.core.TextBox = function() {
	this.name = "Through";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("tigger",retro.pub.RetroType.RNumber);
	this.outputs.add("text",retro.pub.RetroType.RNumber);
	retro.library.core.TextBox.id++;
};
retro.library.core.TextBox.__name__ = ["retro","library","core","TextBox"];
retro.library.core.TextBox.__interfaces__ = [retro.core.JobComponent];
retro.library.core.TextBox.prototype = {
	customDraw: function(jobView) {
	}
	,onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		cb(result);
	}
	,getModuleName: function() {
		return "core.TextBox";
	}
	,__class__: retro.library.core.TextBox
};
retro.library.core.Through = function() {
	this.name = "Through";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.Through.__name__ = ["retro","library","core","Through"];
retro.library.core.Through.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Through.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Through";
	}
	,__class__: retro.library.core.Through
};
retro.library.core.Times = function() {
	this.name = "Times";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input1",retro.pub.RetroType.RNumber);
	this.inputs.add("input2",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.core.Times.__name__ = ["retro","library","core","Times"];
retro.library.core.Times.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Times.prototype = {
	onInputRecieved: function(params,cb) {
		var input1 = params.get("input1");
		var input2 = params.get("input2");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input1.getValue() * input2.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Times";
	}
	,__class__: retro.library.core.Times
};
retro.library.core.Transistor = function() {
	this.name = "Transistor";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("emitter",retro.pub.RetroType.RNumber);
	this.inputs.add("base",retro.pub.RetroType.RNumber);
	this.outputs.add("collector",retro.pub.RetroType.RNumber);
};
retro.library.core.Transistor.__name__ = ["retro","library","core","Transistor"];
retro.library.core.Transistor.__interfaces__ = [retro.core.JobComponent];
retro.library.core.Transistor.prototype = {
	onInputRecieved: function(params,cb) {
		var emitter = params.get("emitter");
		var base = params.get("base");
		if(emitter.isEmpty() || base.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("collector",emitter.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "core.Transistor";
	}
	,__class__: retro.library.core.Transistor
};
retro.library.map = {};
retro.library.map.Getter = function() {
	this.name = "Getter";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("key",retro.pub.RetroType.RNumber);
	this.outputs.add("value",retro.pub.RetroType.RNumber);
	this.outputs.add("exists",retro.pub.RetroType.RNumber);
};
retro.library.map.Getter.__name__ = ["retro","library","map","Getter"];
retro.library.map.Getter.__interfaces__ = [retro.core.JobComponent];
retro.library.map.Getter.prototype = {
	onInputRecieved: function(params,cb) {
		var key = params.get("key");
		if(key.isEmpty()) {
			cb(null);
			return;
		}
		var exists = retro.library.map.Pod.getInstance().exists(key.getValue());
		var value = retro.library.map.Pod.getInstance().get(key.getValue());
		var result = new retro.core.Result();
		result.set("exists",exists);
		result.set("value",value);
		cb(result);
	}
	,getModuleName: function() {
		return "map.Getter";
	}
	,__class__: retro.library.map.Getter
};
retro.library.map.Pod = function() {
	this.map = new haxe.ds.StringMap();
};
retro.library.map.Pod.__name__ = ["retro","library","map","Pod"];
retro.library.map.Pod.getInstance = function() {
	if(retro.library.map.Pod.instance == null) return retro.library.map.Pod.instance = new retro.library.map.Pod(); else return retro.library.map.Pod.instance;
};
retro.library.map.Pod.prototype = {
	exists: function(key) {
		return this.map.exists(key);
	}
	,get: function(key) {
		return this.map.get(key);
	}
	,set: function(key,value) {
		return this.map.set(key,value);
	}
	,__class__: retro.library.map.Pod
};
retro.library.map.Setter = function() {
	this.name = "Setter";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("key",retro.pub.RetroType.RNumber);
	this.inputs.add("value",retro.pub.RetroType.RNumber);
	this.outputs.add("result",retro.pub.RetroType.RNumber);
};
retro.library.map.Setter.__name__ = ["retro","library","map","Setter"];
retro.library.map.Setter.__interfaces__ = [retro.core.JobComponent];
retro.library.map.Setter.prototype = {
	onInputRecieved: function(params,cb) {
		var input1 = params.get("key");
		var input2 = params.get("value");
		if(input1.isEmpty() || input2.isEmpty()) {
			cb(null);
			return;
		}
		retro.library.map.Pod.getInstance().set(input1.getValue(),input2.getValue());
		var result = new retro.core.Result();
		result.set("result",true);
		cb(result);
	}
	,getModuleName: function() {
		return "map.Setter";
	}
	,__class__: retro.library.map.Setter
};
retro.library.math = {};
retro.library.math.Abs = function() {
	this.name = "Abs";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Abs.__name__ = ["retro","library","math","Abs"];
retro.library.math.Abs.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Abs.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.abs(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Abs";
	}
	,__class__: retro.library.math.Abs
};
retro.library.math.Acos = function() {
	this.name = "Acos";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Acos.__name__ = ["retro","library","math","Acos"];
retro.library.math.Acos.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Acos.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.acos(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Acos";
	}
	,__class__: retro.library.math.Acos
};
retro.library.math.Asin = function() {
	this.name = "Asin";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Asin.__name__ = ["retro","library","math","Asin"];
retro.library.math.Asin.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Asin.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.asin(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Asin";
	}
	,__class__: retro.library.math.Asin
};
retro.library.math.Atan = function() {
	this.name = "Atan";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Atan.__name__ = ["retro","library","math","Atan"];
retro.library.math.Atan.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Atan.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.atan(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Atan";
	}
	,__class__: retro.library.math.Atan
};
retro.library.math.Atan2 = function() {
	this.name = "Atan2";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("x",retro.pub.RetroType.RNumber);
	this.inputs.add("y",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Atan2.__name__ = ["retro","library","math","Atan2"];
retro.library.math.Atan2.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Atan2.prototype = {
	onInputRecieved: function(params,cb) {
		var x = params.get("x");
		var y = params.get("y");
		if(x.isEmpty() || y.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.atan2(x.getValue(),y.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Atan2";
	}
	,__class__: retro.library.math.Atan2
};
retro.library.math.Cos = function() {
	this.name = "Cos";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Cos.__name__ = ["retro","library","math","Cos"];
retro.library.math.Cos.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Cos.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.cos(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Cos";
	}
	,__class__: retro.library.math.Cos
};
retro.library.math.Floor = function() {
	this.name = "Floor";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Floor.__name__ = ["retro","library","math","Floor"];
retro.library.math.Floor.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Floor.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.floor(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Floor";
	}
	,__class__: retro.library.math.Floor
};
retro.library.math.Log = function() {
	this.name = "Log";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("math",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Log.__name__ = ["retro","library","math","Log"];
retro.library.math.Log.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Log.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.log(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Log";
	}
	,__class__: retro.library.math.Log
};
retro.library.math.Max = function() {
	this.name = "Max";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("a",retro.pub.RetroType.RNumber);
	this.inputs.add("b",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Max.__name__ = ["retro","library","math","Max"];
retro.library.math.Max.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Max.prototype = {
	onInputRecieved: function(params,cb) {
		var a = params.get("a");
		var b = params.get("b");
		if(a.isEmpty() || b.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.max(a.getValue(),b.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Max";
	}
	,__class__: retro.library.math.Max
};
retro.library.math.Min = function() {
	this.name = "Min";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("a",retro.pub.RetroType.RNumber);
	this.inputs.add("b",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Min.__name__ = ["retro","library","math","Min"];
retro.library.math.Min.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Min.prototype = {
	onInputRecieved: function(params,cb) {
		var a = params.get("a");
		var b = params.get("b");
		if(a.isEmpty() || b.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.min(a.getValue(),b.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Min";
	}
	,__class__: retro.library.math.Min
};
retro.library.math.Pow = function() {
	this.name = "Pow";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("v",retro.pub.RetroType.RNumber);
	this.inputs.add("exp",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Pow.__name__ = ["retro","library","math","Pow"];
retro.library.math.Pow.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Pow.prototype = {
	onInputRecieved: function(params,cb) {
		var v = params.get("v");
		var exp = params.get("exp");
		if(v.isEmpty() || exp.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.pow(v.getValue(),exp.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Pow";
	}
	,__class__: retro.library.math.Pow
};
retro.library.math.Random = function() {
	this.name = "Random";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("v",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Random.__name__ = ["retro","library","math","Random"];
retro.library.math.Random.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Random.prototype = {
	onInputRecieved: function(params,cb) {
		var v = params.get("v");
		if(v.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",v.getValue() * Math.random());
		cb(result);
	}
	,getModuleName: function() {
		return "math.Random";
	}
	,__class__: retro.library.math.Random
};
retro.library.math.Sin = function() {
	this.name = "Sin";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Sin.__name__ = ["retro","library","math","Sin"];
retro.library.math.Sin.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Sin.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.sin(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Sin";
	}
	,__class__: retro.library.math.Sin
};
retro.library.math.Sqrt = function() {
	this.name = "Sqrt";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.math.Sqrt.__name__ = ["retro","library","math","Sqrt"];
retro.library.math.Sqrt.__interfaces__ = [retro.core.JobComponent];
retro.library.math.Sqrt.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",Math.sqrt(input.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "math.Sqrt";
	}
	,__class__: retro.library.math.Sqrt
};
retro.library.number = {};
retro.library.number.C0 = function() {
	this.name = "C0";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("0",retro.pub.RetroType.RNumber);
};
retro.library.number.C0.__name__ = ["retro","library","number","C0"];
retro.library.number.C0.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C0.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("0",0);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C0";
	}
	,__class__: retro.library.number.C0
};
retro.library.number.C1 = function() {
	this.name = "C1";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("1",retro.pub.RetroType.RNumber);
};
retro.library.number.C1.__name__ = ["retro","library","number","C1"];
retro.library.number.C1.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C1.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("1",1);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C1";
	}
	,__class__: retro.library.number.C1
};
retro.library.number.C2 = function() {
	this.name = "C2";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("2",retro.pub.RetroType.RNumber);
};
retro.library.number.C2.__name__ = ["retro","library","number","C2"];
retro.library.number.C2.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C2.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("2",2);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C2";
	}
	,__class__: retro.library.number.C2
};
retro.library.number.C3 = function() {
	this.name = "C3";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("3",retro.pub.RetroType.RNumber);
};
retro.library.number.C3.__name__ = ["retro","library","number","C3"];
retro.library.number.C3.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C3.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("3",3);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C3";
	}
	,__class__: retro.library.number.C3
};
retro.library.number.C4 = function() {
	this.name = "C4";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("4",retro.pub.RetroType.RNumber);
};
retro.library.number.C4.__name__ = ["retro","library","number","C4"];
retro.library.number.C4.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C4.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("4",4);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C4";
	}
	,__class__: retro.library.number.C4
};
retro.library.number.C5 = function() {
	this.name = "C5";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("5",retro.pub.RetroType.RNumber);
};
retro.library.number.C5.__name__ = ["retro","library","number","C5"];
retro.library.number.C5.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C5.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("5",5);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C5";
	}
	,__class__: retro.library.number.C5
};
retro.library.number.C6 = function() {
	this.name = "C6";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("6",retro.pub.RetroType.RNumber);
};
retro.library.number.C6.__name__ = ["retro","library","number","C6"];
retro.library.number.C6.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C6.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("6",6);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C6";
	}
	,__class__: retro.library.number.C6
};
retro.library.number.C7 = function() {
	this.name = "C7";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("7",retro.pub.RetroType.RNumber);
};
retro.library.number.C7.__name__ = ["retro","library","number","C7"];
retro.library.number.C7.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C7.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("7",7);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C7";
	}
	,__class__: retro.library.number.C7
};
retro.library.number.C8 = function() {
	this.name = "C8";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("8",retro.pub.RetroType.RNumber);
};
retro.library.number.C8.__name__ = ["retro","library","number","C8"];
retro.library.number.C8.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C8.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("8",8);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C8";
	}
	,__class__: retro.library.number.C8
};
retro.library.number.C9 = function() {
	this.name = "C9";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("trigger",retro.pub.RetroType.RNumber);
	this.outputs.add("9",retro.pub.RetroType.RNumber);
};
retro.library.number.C9.__name__ = ["retro","library","number","C9"];
retro.library.number.C9.__interfaces__ = [retro.core.JobComponent];
retro.library.number.C9.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("trigger");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("9",9);
		cb(result);
	}
	,getModuleName: function() {
		return "number.C9";
	}
	,__class__: retro.library.number.C9
};
retro.library.snapelement = {};
retro.library.snapelement.Fill = function() {
	this.name = "Fill";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("snapelement",retro.pub.RetroType.RNumber);
	this.inputs.add("color",retro.pub.RetroType.RNumber);
	this.outputs.add("snapelement",retro.pub.RetroType.RNumber);
};
retro.library.snapelement.Fill.__name__ = ["retro","library","snapelement","Fill"];
retro.library.snapelement.Fill.__interfaces__ = [retro.core.JobComponent];
retro.library.snapelement.Fill.prototype = {
	onInputRecieved: function(params,cb) {
		var snapelementParam = params.get("snapelement");
		var colorParam = params.get("color");
		if(snapelementParam.isEmpty() || colorParam.isEmpty()) {
			cb(null);
			return;
		}
		var snapelement = snapelementParam.getValue();
		snapelement.attr({ fill : colorParam.getValue()});
		var result = new retro.core.Result();
		result.set("snapelement",snapelement);
		cb(result);
	}
	,getModuleName: function() {
		return "snapelement.Fill";
	}
	,__class__: retro.library.snapelement.Fill
};
retro.library.snapelement.MouseDown = function() {
	this.name = "MouseDown";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("snapelement",retro.pub.RetroType.RNumber);
	this.outputs.add("e",retro.pub.RetroType.RNumber);
	this.outputs.add("x",retro.pub.RetroType.RNumber);
	this.outputs.add("y",retro.pub.RetroType.RNumber);
};
retro.library.snapelement.MouseDown.__name__ = ["retro","library","snapelement","MouseDown"];
retro.library.snapelement.MouseDown.__interfaces__ = [retro.core.JobComponent];
retro.library.snapelement.MouseDown.prototype = {
	onInputRecieved: function(params,cb) {
		var snapelementParam = params.get("snapelement");
		if(snapelementParam.isEmpty()) {
			cb(null);
			return;
		}
		var snapelement = snapelementParam.getValue();
		snapelement.mousedown(function(e,x,y) {
			var result = new retro.core.Result();
			result.set("e",e);
			result.set("x",x);
			result.set("y",y);
			cb(result);
		});
	}
	,getModuleName: function() {
		return "snapelement.MouseDown";
	}
	,__class__: retro.library.snapelement.MouseDown
};
retro.library.snapelement.Translate = function() {
	this.name = "Translate";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("snapelement",retro.pub.RetroType.RNumber);
	this.inputs.add("x",retro.pub.RetroType.RNumber);
	this.inputs.add("y",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.snapelement.Translate.__name__ = ["retro","library","snapelement","Translate"];
retro.library.snapelement.Translate.__interfaces__ = [retro.core.JobComponent];
retro.library.snapelement.Translate.prototype = {
	onInputRecieved: function(params,cb) {
		var snapelement = params.get("snapelement");
		var x = params.get("x");
		var y = params.get("y");
		if(snapelement.isEmpty() || x.isEmpty() || y.isEmpty()) {
			cb(null);
			return;
		}
		snapelement.getValue().transform("translate(" + Std.string(x.getValue()) + "," + Std.string(y.getValue()) + ")");
		var result = new retro.core.Result();
		result.set("output",snapelement.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "snapelement.Translate";
	}
	,__class__: retro.library.snapelement.Translate
};
retro.library.snapsvg = {};
retro.library.snapsvg.Circle = function(virtualDevice) {
	this.name = "Circle";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("x",retro.pub.RetroType.RNumber);
	this.inputs.add("y",retro.pub.RetroType.RNumber);
	this.inputs.add("r",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
	this.virtualDevice = virtualDevice;
};
retro.library.snapsvg.Circle.__name__ = ["retro","library","snapsvg","Circle"];
retro.library.snapsvg.Circle.__interfaces__ = [retro.core.JobComponent];
retro.library.snapsvg.Circle.prototype = {
	onInputRecieved: function(params,cb) {
		var x = params.get("x");
		var y = params.get("y");
		var r = params.get("r");
		if(x.isEmpty() || y.isEmpty() || r.isEmpty()) {
			cb(null);
			return;
		}
		var snapElement = this.virtualDevice.getSnap().circle(x.getValue(),y.getValue(),r.getValue());
		var result = new retro.core.Result();
		result.set("output",snapElement);
		cb(result);
	}
	,getModuleName: function() {
		return "snapsvg.Circle";
	}
	,__class__: retro.library.snapsvg.Circle
};
retro.library.snapsvg.Draw = function() {
	this.name = "Draw";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("draw",retro.pub.RetroType.RNumber);
};
retro.library.snapsvg.Draw.__name__ = ["retro","library","snapsvg","Draw"];
retro.library.snapsvg.Draw.__interfaces__ = [retro.core.JobComponent];
retro.library.snapsvg.Draw.prototype = {
	onInputRecieved: function(params,cb) {
		var draw = params.get("draw");
		if(draw.isEmpty()) {
			cb(null);
			return;
		}
		new CreateSvgDialog().open();
		cb(null);
	}
	,getModuleName: function() {
		return "snapsvg.Draw";
	}
	,__class__: retro.library.snapsvg.Draw
};
retro.library.snapsvg.Rect = function(virtualDevice) {
	this.name = "Rect";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("x",retro.pub.RetroType.RNumber);
	this.inputs.add("y",retro.pub.RetroType.RNumber);
	this.inputs.add("w",retro.pub.RetroType.RNumber);
	this.inputs.add("h",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
	this.virtualDevice = virtualDevice;
};
retro.library.snapsvg.Rect.__name__ = ["retro","library","snapsvg","Rect"];
retro.library.snapsvg.Rect.__interfaces__ = [retro.core.JobComponent];
retro.library.snapsvg.Rect.prototype = {
	onInputRecieved: function(params,cb) {
		var x = params.get("x");
		var y = params.get("y");
		var w = params.get("w");
		var h = params.get("h");
		if(x.isEmpty() || y.isEmpty() || w.isEmpty() || h.isEmpty()) {
			cb(null);
			return;
		}
		var snapElement = this.virtualDevice.getSnap().rect(x.getValue(),y.getValue(),w.getValue(),h.getValue());
		var result = new retro.core.Result();
		result.set("output",snapElement);
		cb(result);
	}
	,getModuleName: function() {
		return "snapsvg.Rect";
	}
	,__class__: retro.library.snapsvg.Rect
};
retro.library.string = {};
retro.library.string.ChatAt = function() {
	this.name = "ChatAt";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("string",retro.pub.RetroType.RNumber);
	this.inputs.add("index",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.string.ChatAt.__name__ = ["retro","library","string","ChatAt"];
retro.library.string.ChatAt.__interfaces__ = [retro.core.JobComponent];
retro.library.string.ChatAt.prototype = {
	onInputRecieved: function(params,cb) {
		var string = params.get("string");
		var index = params.get("index");
		if(string.isEmpty() && index.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",string.getValue().charAt(index.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "string.ChatAt";
	}
	,__class__: retro.library.string.ChatAt
};
retro.library.string.IndexOf = function() {
	this.name = "IndexOf";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("string",retro.pub.RetroType.RNumber);
	this.inputs.add("char",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.string.IndexOf.__name__ = ["retro","library","string","IndexOf"];
retro.library.string.IndexOf.__interfaces__ = [retro.core.JobComponent];
retro.library.string.IndexOf.prototype = {
	onInputRecieved: function(params,cb) {
		var string = params.get("string");
		var $char = params.get("char");
		if(string.isEmpty() && $char.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",string.getValue().indexOf($char.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "string.IndexOf";
	}
	,__class__: retro.library.string.IndexOf
};
retro.library.string.LastIndexOf = function() {
	this.name = "LastIndexOf";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("string",retro.pub.RetroType.RNumber);
	this.inputs.add("char",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.string.LastIndexOf.__name__ = ["retro","library","string","LastIndexOf"];
retro.library.string.LastIndexOf.__interfaces__ = [retro.core.JobComponent];
retro.library.string.LastIndexOf.prototype = {
	onInputRecieved: function(params,cb) {
		var string = params.get("string");
		var $char = params.get("char");
		if(string.isEmpty() && $char.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",string.getValue().lastIndexOf($char.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "string.LastIndexOf";
	}
	,__class__: retro.library.string.LastIndexOf
};
retro.library.string.Length = function() {
	this.name = "Length";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("string",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.string.Length.__name__ = ["retro","library","string","Length"];
retro.library.string.Length.__interfaces__ = [retro.core.JobComponent];
retro.library.string.Length.prototype = {
	onInputRecieved: function(params,cb) {
		var string = params.get("string");
		if(string.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",string.getValue().length);
		cb(result);
	}
	,getModuleName: function() {
		return "string.Length";
	}
	,__class__: retro.library.string.Length
};
retro.library.string.Split = function() {
	this.name = "Split";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("string",retro.pub.RetroType.RString);
	this.inputs.add("delimiter",retro.pub.RetroType.RString);
	this.outputs.add("output",retro.pub.RetroType.RString);
};
retro.library.string.Split.__name__ = ["retro","library","string","Split"];
retro.library.string.Split.__interfaces__ = [retro.core.JobComponent];
retro.library.string.Split.prototype = {
	onInputRecieved: function(params,cb) {
		var string = params.get("string");
		var delimiter = params.get("delimiter");
		if(string.isEmpty() && delimiter.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",string.getValue().split(delimiter.getValue()));
		cb(result);
	}
	,getModuleName: function() {
		return "string.Split";
	}
	,__class__: retro.library.string.Split
};
retro.library.string.Substr = function() {
	this.name = "Substr";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("string",retro.pub.RetroType.RNumber);
	this.inputs.add("start",retro.pub.RetroType.RNumber);
	this.inputs.add("end",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.string.Substr.__name__ = ["retro","library","string","Substr"];
retro.library.string.Substr.__interfaces__ = [retro.core.JobComponent];
retro.library.string.Substr.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var result = new retro.core.Result();
		result.set("output",input.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "string.Substr";
	}
	,__class__: retro.library.string.Substr
};
retro.library.system = {};
retro.library.system.Print = function(virtualDevice) {
	this.name = "Print";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
	this.virtualDevice = virtualDevice;
};
retro.library.system.Print.__name__ = ["retro","library","system","Print"];
retro.library.system.Print.__interfaces__ = [retro.core.JobComponent];
retro.library.system.Print.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		this.virtualDevice.getConsoleDevice().print(Std.string(input.getValue()) + "");
		console.log(input.getValue());
		var result = new retro.core.Result();
		result.set("output",input.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "system.Print";
	}
	,__class__: retro.library.system.Print
};
retro.library.system.Scan = function(virtualDevice) {
	this.name = "Scan";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("input",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
	this.virtualDevice = virtualDevice;
};
retro.library.system.Scan.__name__ = ["retro","library","system","Scan"];
retro.library.system.Scan.__interfaces__ = [retro.core.JobComponent];
retro.library.system.Scan.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("input");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		var str = window.prompt("Standard Input","");
		var result = new retro.core.Result();
		result.set("output",str);
		cb(result);
	}
	,getModuleName: function() {
		return "system.Scan";
	}
	,__class__: retro.library.system.Scan
};
retro.library.system.Speed = function() {
	this.name = "Speed";
	this.inputs = new retro.core.Inputs();
	this.outputs = new retro.core.Outputs();
	this.inputs.add("speed",retro.pub.RetroType.RNumber);
	this.outputs.add("output",retro.pub.RetroType.RNumber);
};
retro.library.system.Speed.__name__ = ["retro","library","system","Speed"];
retro.library.system.Speed.__interfaces__ = [retro.core.JobComponent];
retro.library.system.Speed.prototype = {
	onInputRecieved: function(params,cb) {
		var input = params.get("speed");
		if(input.isEmpty()) {
			cb(null);
			return;
		}
		window.sessionStorage.setItem("speed","" + Std.string(input.getValue()));
		var result = new retro.core.Result();
		result.set("output",input.getValue());
		cb(result);
	}
	,getModuleName: function() {
		return "system.Speed";
	}
	,__class__: retro.library.system.Speed
};
retro.model = {};
retro.model.Diagram = function() {
	this.jobs = new Array();
	this.valueCarriers = new Array();
	this.onJobAddedListeners = new Array();
	this.onJobRemovedListeners = new Array();
	this.onValueCarrierAddedListeners = new Array();
	this.onValueCarrierRemovedListeners = new Array();
	this.onValueCarrierClearedListeners = new Array();
};
retro.model.Diagram.__name__ = ["retro","model","Diagram"];
retro.model.Diagram.prototype = {
	setEntryPoint: function(entry) {
		this.entryPoint = entry;
		this.addJob(this.entryPoint);
	}
	,getEntryPoint: function() {
		return this.entryPoint;
	}
	,addJob: function(job) {
		this.fireOnJobAdded(job);
		this.jobs.push(job);
	}
	,removeJob: function(job) {
		this.fireOnJobRemoved(job);
		var _g = 0;
		var _g1 = job.getInputPorts();
		while(_g < _g1.length) {
			var inputPort = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = inputPort.connection;
			while(_g2 < _g3.length) {
				var srcPort = _g3[_g2];
				++_g2;
				srcPort.disconnectToInputPort(inputPort);
			}
		}
		var _g4 = 0;
		var _g11 = job.getOutputPorts();
		while(_g4 < _g11.length) {
			var outputPort = _g11[_g4];
			++_g4;
			var _g21 = 0;
			var _g31 = outputPort.connection;
			while(_g21 < _g31.length) {
				var destPort = _g31[_g21];
				++_g21;
				outputPort.disconnectToInputPort(destPort);
			}
		}
		HxOverrides.remove(this.jobs,job);
	}
	,getJob: function(id) {
		var _g = 0;
		var _g1 = this.jobs;
		while(_g < _g1.length) {
			var job = _g1[_g];
			++_g;
			if(job.getId() == id) return job;
		}
		return null;
	}
	,getOutputPort: function(uri) {
		var ids = uri.split(".");
		var _g = 0;
		var _g1 = this.jobs;
		while(_g < _g1.length) {
			var job = _g1[_g];
			++_g;
			if(job.getId() == ids[0]) return job.getOutputPort(ids[1]);
		}
		return null;
	}
	,getInputPort: function(uri) {
		var ids = uri.split(".");
		var _g = 0;
		var _g1 = this.jobs;
		while(_g < _g1.length) {
			var job = _g1[_g];
			++_g;
			if(job.getId() == ids[0]) return job.getInputPort(ids[1]);
		}
		return null;
	}
	,getJobs: function() {
		return this.jobs;
	}
	,addValueCarrier: function(valueCarrier) {
		this.fireOnValueCarrierAdded(valueCarrier);
		this.valueCarriers.push(valueCarrier);
	}
	,removeValueCarrier: function(valueCarrier) {
		this.fireOnValueCarrierRemoved(valueCarrier);
		HxOverrides.remove(this.valueCarriers,valueCarrier);
	}
	,getValueCarriers: function() {
		return this.valueCarriers;
	}
	,clearValueCarriers: function() {
		var _g = 0;
		var _g1 = this.jobs;
		while(_g < _g1.length) {
			var job = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = job.getInputPorts();
			while(_g2 < _g3.length) {
				var inputPort = _g3[_g2];
				++_g2;
				this.removeValueCarrier(inputPort.useValueCarrier());
			}
		}
		this.valueCarriers = new Array();
		this.fireOnValueCarrierCleared();
	}
	,onJobAdded: function(listener) {
		this.onJobAddedListeners.push(listener);
	}
	,onJobRemoved: function(listener) {
		this.onJobRemovedListeners.push(listener);
	}
	,onValueCarrierAdded: function(listener) {
		this.onValueCarrierAddedListeners.push(listener);
	}
	,onValueCarrierRemoved: function(listener) {
		this.onValueCarrierRemovedListeners.push(listener);
	}
	,onValueCarrierCleared: function(listener) {
		this.onValueCarrierClearedListeners.push(listener);
	}
	,fireOnJobAdded: function(j) {
		var _g = 0;
		var _g1 = this.onJobAddedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(j);
		}
	}
	,fireOnJobRemoved: function(j) {
		var _g = 0;
		var _g1 = this.onJobRemovedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(j);
		}
	}
	,fireOnValueCarrierAdded: function(vc) {
		var _g = 0;
		var _g1 = this.onValueCarrierAddedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(vc);
		}
	}
	,fireOnValueCarrierRemoved: function(vc) {
		var _g = 0;
		var _g1 = this.onValueCarrierRemovedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(vc);
		}
	}
	,fireOnValueCarrierCleared: function() {
		var _g = 0;
		var _g1 = this.onValueCarrierClearedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
	}
	,__class__: retro.model.Diagram
};
retro.model.Job = function(id) {
	this.id = id;
	this.inputPorts = new Array();
	this.outputPorts = new Array();
	this.pos = new retro.pub.Point2D(0,0);
	this.onInputPortAddedListeners = new Array();
	this.onOutputPortAddedListeners = new Array();
	this.onInputPortRemovedListeners = new Array();
	this.onOutputPortRemovedListeners = new Array();
	this.onPosChangedListeners = new Array();
};
retro.model.Job.__name__ = ["retro","model","Job"];
retro.model.Job.prototype = {
	getId: function() {
		return this.id;
	}
	,getName: function() {
		return "";
	}
	,setPos: function(x,y) {
		this.fireOnPosChangedListeners(x,y);
		this.pos.setX(x);
		this.pos.setY(y);
	}
	,getPos: function() {
		return this.pos;
	}
	,getInputPorts: function() {
		return this.inputPorts;
	}
	,getOutputPorts: function() {
		return this.outputPorts;
	}
	,addInputPort: function(port) {
		this.fireOnInputPortAddedListeners(port);
		this.inputPorts.push(port);
	}
	,addOutputPort: function(port) {
		this.fireOnOutputPortAddedListeners(port);
		this.outputPorts.push(port);
	}
	,removeInputPort: function(port) {
		this.fireOnInputPortRemovedListeners(port);
		HxOverrides.remove(this.inputPorts,port);
	}
	,removeOutputPort: function(port) {
		this.fireOnOutputPortRemovedListeners(port);
		HxOverrides.remove(this.outputPorts,port);
	}
	,getParams: function() {
		var params = new retro.core.Params();
		var _g = 0;
		var _g1 = this.inputPorts;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var value = null;
			if(p.getValue() != null) value = p.getValue();
			params.add(p.getName(),value);
		}
		return params;
	}
	,getWorker: function() {
		return new retro.vm.Worker(this,function(params,cb) {
			cb(new retro.core.Result());
		});
	}
	,getInputPort: function(name) {
		var _g = 0;
		var _g1 = this.inputPorts;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(name == p.name) return p;
		}
		return null;
	}
	,getOutputPort: function(name) {
		var _g = 0;
		var _g1 = this.outputPorts;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(name == p.name) return p;
		}
		return null;
	}
	,onInputPortAdded: function(listener) {
		this.onInputPortAddedListeners.push(listener);
	}
	,fireOnInputPortAddedListeners: function(j) {
		var _g = 0;
		var _g1 = this.onInputPortAddedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(j);
		}
	}
	,onOutputPortAdded: function(listener) {
		this.onOutputPortAddedListeners.push(listener);
	}
	,fireOnOutputPortAddedListeners: function(j) {
		var _g = 0;
		var _g1 = this.onOutputPortAddedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(j);
		}
	}
	,onInputPortRemoved: function(listener) {
		this.onInputPortRemovedListeners.push(listener);
	}
	,fireOnInputPortRemovedListeners: function(j) {
		var _g = 0;
		var _g1 = this.onInputPortRemovedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(j);
		}
	}
	,onOutputPortRemoved: function(listener) {
		this.onOutputPortRemovedListeners.push(listener);
	}
	,fireOnOutputPortRemovedListeners: function(j) {
		var _g = 0;
		var _g1 = this.onOutputPortRemovedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(j);
		}
	}
	,onPosChanged: function(listener) {
		this.onPosChangedListeners.push(listener);
	}
	,fireOnPosChangedListeners: function(x,y) {
		var _g = 0;
		var _g1 = this.onPosChangedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(x,y);
		}
	}
	,getJSON: function() {
		var json = { };
		json.id = this.getId();
		return json;
	}
	,__class__: retro.model.Job
};
retro.model.EntryJob = function(id) {
	retro.model.Job.call(this,id);
};
retro.model.EntryJob.__name__ = ["retro","model","EntryJob"];
retro.model.EntryJob.__super__ = retro.model.Job;
retro.model.EntryJob.prototype = $extend(retro.model.Job.prototype,{
	getName: function() {
		return "Entry";
	}
	,__class__: retro.model.EntryJob
});
retro.model.Port = function(parent,type,name) {
	this.parent = parent;
	this.type = type;
	this.name = name;
};
retro.model.Port.__name__ = ["retro","model","Port"];
retro.model.Port.prototype = {
	getURI: function() {
		return this.parent.getId() + "." + this.getName();
	}
	,getName: function() {
		return this.name;
	}
	,getParentJob: function() {
		return this.parent;
	}
	,__class__: retro.model.Port
};
retro.model.InputPort = function(parent,type,name) {
	retro.model.Port.call(this,parent,type,name);
	this.connection = new Array();
	this.onSetValueListeners = new Array();
	this.onUseValueListeners = new Array();
	this.onSetConstantValueListeners = new Array();
	this.onRemoveConstantValueListeners = new Array();
};
retro.model.InputPort.__name__ = ["retro","model","InputPort"];
retro.model.InputPort.__super__ = retro.model.Port;
retro.model.InputPort.prototype = $extend(retro.model.Port.prototype,{
	setValueCarrier: function(valueCarrier) {
		this.valueCarrier = valueCarrier;
		this.fireOnSetValueListeners(this.valueCarrier);
	}
	,getValueCarrier: function() {
		return this.valueCarrier;
	}
	,getConstantValue: function() {
		return this.constantValue;
	}
	,getValue: function() {
		if(this.constantValue != null) return this.constantValue; else {
			if(this.valueCarrier == null) return null;
			return this.valueCarrier.getValue();
		}
	}
	,useValueCarrier: function() {
		var v = this.valueCarrier;
		this.valueCarrier = null;
		this.fireOnUseValueListeners();
		return v;
	}
	,setConstant: function(value) {
		this.constantValue = value;
		this.fireOnSetConstantValueListeners(this.constantValue);
	}
	,removeConstant: function() {
		this.constantValue = null;
		this.fireOnRemoveConstantValueListeners();
	}
	,onSetValue: function(listener) {
		this.onSetValueListeners.push(listener);
	}
	,onUseValue: function(listener) {
		this.onUseValueListeners.push(listener);
	}
	,onSetConstantValue: function(listener) {
		this.onSetConstantValueListeners.push(listener);
	}
	,onRemoveConstantValue: function(listener) {
		this.onRemoveConstantValueListeners.push(listener);
	}
	,fireOnSetValueListeners: function(v) {
		var _g = 0;
		var _g1 = this.onSetValueListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(v);
		}
	}
	,fireOnUseValueListeners: function() {
		var _g = 0;
		var _g1 = this.onUseValueListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
	}
	,fireOnSetConstantValueListeners: function(v) {
		var _g = 0;
		var _g1 = this.onSetConstantValueListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(v);
		}
	}
	,fireOnRemoveConstantValueListeners: function() {
		var _g = 0;
		var _g1 = this.onRemoveConstantValueListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
	}
	,__class__: retro.model.InputPort
});
retro.model.Logic = function(id) {
	retro.model.Job.call(this,id);
};
retro.model.Logic.__name__ = ["retro","model","Logic"];
retro.model.Logic.__super__ = retro.model.Job;
retro.model.Logic.prototype = $extend(retro.model.Job.prototype,{
	__class__: retro.model.Logic
});
retro.model.OutputPort = function(parent,type,name) {
	retro.model.Port.call(this,parent,type,name);
	this.connection = new Array();
	this.onConnectedListeners = new Array();
	this.onDisconnectedListeners = new Array();
};
retro.model.OutputPort.__name__ = ["retro","model","OutputPort"];
retro.model.OutputPort.__super__ = retro.model.Port;
retro.model.OutputPort.prototype = $extend(retro.model.Port.prototype,{
	getConnections: function() {
		return this.connection;
	}
	,connectToInputPort: function(port) {
		this.fireOnConnectedListeners(this,port);
		port.connection.push(this);
		this.connection.push(port);
	}
	,disconnectToInputPort: function(port) {
		this.fireOnDisconnectedListeners(this,port);
		HxOverrides.remove(port.connection,this);
		HxOverrides.remove(this.connection,port);
	}
	,onConnected: function(listener) {
		this.onConnectedListeners.push(listener);
	}
	,onDisconnected: function(listener) {
		this.onDisconnectedListeners.push(listener);
	}
	,fireOnConnectedListeners: function(o,i) {
		var _g = 0;
		var _g1 = this.onConnectedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(o,i);
		}
	}
	,fireOnDisconnectedListeners: function(o,i) {
		var _g = 0;
		var _g1 = this.onDisconnectedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(o,i);
		}
	}
	,__class__: retro.model.OutputPort
});
retro.model.Project = function() {
	this.onDiagramAddedListeners = new Array();
};
retro.model.Project.__name__ = ["retro","model","Project"];
retro.model.Project.prototype = {
	setRootDiagram: function(diagram) {
		this.diagram = diagram;
		this.fireOnConnection(this.diagram);
	}
	,getRootDiagram: function() {
		return this.diagram;
	}
	,onDiagramAdded: function(listener) {
		this.onDiagramAddedListeners.push(listener);
	}
	,fireOnConnection: function(d) {
		var _g = 0;
		var _g1 = this.onDiagramAddedListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(d);
		}
	}
	,__class__: retro.model.Project
};
retro.model.SymbolicLink = function(id,jobComponent) {
	retro.model.Job.call(this,id);
	this.prototype = jobComponent;
	this.customDraw = Reflect.getProperty(jobComponent,"customDraw");
	var _g = 0;
	var _g1 = this.prototype.inputs.getArray();
	while(_g < _g1.length) {
		var ip = _g1[_g];
		++_g;
		this.addInputPort(new retro.model.InputPort(this,ip.getType(),ip.getName()));
	}
	var _g2 = 0;
	var _g11 = this.prototype.outputs.getArray();
	while(_g2 < _g11.length) {
		var op = _g11[_g2];
		++_g2;
		this.addOutputPort(new retro.model.OutputPort(this,op.getType(),op.getName()));
	}
};
retro.model.SymbolicLink.__name__ = ["retro","model","SymbolicLink"];
retro.model.SymbolicLink.__super__ = retro.model.Job;
retro.model.SymbolicLink.prototype = $extend(retro.model.Job.prototype,{
	getPrototype: function() {
		return this.prototype;
	}
	,getName: function() {
		return this.prototype.getModuleName();
	}
	,getWorker: function() {
		return new retro.vm.Worker(this,($_=this.prototype,$bind($_,$_.onInputRecieved)));
	}
	,getJSON: function() {
		var json = { };
		json.id = this.getId();
		json.ref = this.getName();
		return json;
	}
	,__class__: retro.model.SymbolicLink
});
retro.model.Value = function(_type,_value) {
	this.type = _type;
	this.value = _value;
};
retro.model.Value.__name__ = ["retro","model","Value"];
retro.model.Value.prototype = {
	__class__: retro.model.Value
};
retro.model.ValueCarrier = function(value,src,dest) {
	this.count = 0;
	this.value = value;
	this.srcPort = src;
	this.destPort = dest;
	this.count = 0;
	this.onStepListeners = new Array();
};
retro.model.ValueCarrier.__name__ = ["retro","model","ValueCarrier"];
retro.model.ValueCarrier.prototype = {
	step: function() {
		if(this.count > 39) return this.destPort; else {
			this.count++;
			this.fireOnStepListeners();
			return null;
		}
	}
	,getValue: function() {
		return this.value;
	}
	,onStep: function(listener) {
		this.onStepListeners.push(listener);
	}
	,fireOnStepListeners: function() {
		var _g = 0;
		var _g1 = this.onStepListeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
	}
	,__class__: retro.model.ValueCarrier
};
retro.pub = {};
retro.pub.Editor = function(dom) {
	if(dom == null) this.snap = new Snap("#svg"); else this.snap = new Snap(dom);
	this.IdGenerator = retro.pub.IDGenerator.getInstance("test");
};
retro.pub.Editor.__name__ = ["retro","pub","Editor"];
retro.pub.Editor.create = function(dom) {
	var editor = new retro.pub.Editor(dom);
	var project = new retro.model.Project();
	var projectController = new retro.controller.ProjectController(editor,project);
	editor.setProjectController(projectController);
	var projectView = new retro.view.ProjectView(projectController,new retro.controller.ExportController(editor,project));
	editor.setProjectView(projectView);
	var virtualDevice = new retro.core.VirtualDevice();
	editor.virtualDevice = virtualDevice;
	var consoleDevice = new retro.view.ConsoleView(editor.snap);
	virtualDevice.setConsoleDevice(consoleDevice);
	var diagram = new retro.model.Diagram();
	project.setRootDiagram(diagram);
	var diagramController = new retro.controller.DiagramController(editor,diagram,virtualDevice);
	diagramController.addEntryJob();
};
retro.pub.Editor.createCodeIQ = function() {
	var editor = new retro.pub.Editor();
	editor.IdGenerator = retro.pub.IDGenerator.getInstance("codeIQ");
	var project = new retro.model.Project();
	var projectController = new retro.controller.ProjectController(editor,project);
	editor.setProjectController(projectController);
	var projectView = new retro.view.ProjectView(projectController,new retro.controller.ExportController(editor,project));
	editor.setProjectView(projectView);
	var virtualDevice = new retro.core.VirtualDevice();
	editor.virtualDevice = virtualDevice;
	var consoleDevice = new retro.view.ConsoleView(editor.snap);
	virtualDevice.setConsoleDevice(consoleDevice);
	var snap1 = new Snap();
	snap1.attr({ id : "sub_svg", 'class' : "modal"});
	virtualDevice.setSVGDevice(snap1);
	var diagram = new retro.model.Diagram();
	project.setRootDiagram(diagram);
	var diagramController = new retro.controller.DiagramController(editor,diagram,virtualDevice);
	var entryJob = diagramController.addEntryJob();
	entryJob.setPos(80,300);
	var printJob = diagramController.getModule("system.Print");
	diagramController.addSymbolicLink(printJob).setPos(380,300);
};
retro.pub.Editor.prototype = {
	setProjectController: function(projectController) {
		this.projectController = projectController;
	}
	,setProjectView: function(projectView) {
		this.projectView = projectView;
	}
	,save_all: function(data) {
	}
	,getRuntime: function() {
		this.runtime = new retro.vm.Runtime(this.projectController.getProject().getRootDiagram());
		return this.runtime;
	}
	,__class__: retro.pub.Editor
};
retro.pub.IDGenerator = function(uniqueEditorKey) {
	this.uniqueEditorKey = uniqueEditorKey;
	this.counter = 0;
};
retro.pub.IDGenerator.__name__ = ["retro","pub","IDGenerator"];
retro.pub.IDGenerator.getInstance = function(uniqueEditorKey) {
	if(retro.pub.IDGenerator.idGen == null) retro.pub.IDGenerator.idGen = new retro.pub.IDGenerator(uniqueEditorKey);
	return retro.pub.IDGenerator.idGen;
};
retro.pub.IDGenerator.prototype = {
	genID: function() {
		this.counter += 1;
		return this.uniqueEditorKey + Std.string(this.counter);
	}
	,__class__: retro.pub.IDGenerator
};
retro.pub.Point2D = function(x,y) {
	this.x = x;
	this.y = y;
};
retro.pub.Point2D.__name__ = ["retro","pub","Point2D"];
retro.pub.Point2D.add = function(p1,p2) {
	return new retro.pub.Point2D(p1.x + p2.x,p1.y + p2.y);
};
retro.pub.Point2D.sub = function(p1,p2) {
	return new retro.pub.Point2D(p1.x - p2.x,p1.y - p2.y);
};
retro.pub.Point2D.addToSelf = function(p1,p2) {
	p1.x += p2.x;
	p1.y += p2.y;
};
retro.pub.Point2D.subToSelf = function(p1,p2) {
	p1.x -= p2.x;
	p1.y -= p2.y;
};
retro.pub.Point2D.timesToSelf = function(p1,t) {
	p1.x *= t;
	p1.y *= t;
};
retro.pub.Point2D.prototype = {
	getX: function() {
		return this.x;
	}
	,getY: function() {
		return this.y;
	}
	,setX: function(x) {
		this.x = x;
	}
	,setY: function(y) {
		this.y = y;
	}
	,normalized: function() {
		var len = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= len;
		this.y /= len;
	}
	,distance: function() {
		return Math.sqrt(this.distanceSq());
	}
	,distanceSq: function() {
		return this.getX() * this.getX();
	}
	,__class__: retro.pub.Point2D
};
retro.pub.RetroType = { __ename__ : true, __constructs__ : ["REmpty","RString","RNumber","RBool","RList","RTuple","RUnknown","RClass"] };
retro.pub.RetroType.REmpty = ["REmpty",0];
retro.pub.RetroType.REmpty.toString = $estr;
retro.pub.RetroType.REmpty.__enum__ = retro.pub.RetroType;
retro.pub.RetroType.RString = ["RString",1];
retro.pub.RetroType.RString.toString = $estr;
retro.pub.RetroType.RString.__enum__ = retro.pub.RetroType;
retro.pub.RetroType.RNumber = ["RNumber",2];
retro.pub.RetroType.RNumber.toString = $estr;
retro.pub.RetroType.RNumber.__enum__ = retro.pub.RetroType;
retro.pub.RetroType.RBool = ["RBool",3];
retro.pub.RetroType.RBool.toString = $estr;
retro.pub.RetroType.RBool.__enum__ = retro.pub.RetroType;
retro.pub.RetroType.RList = function(type) { var $x = ["RList",4,type]; $x.__enum__ = retro.pub.RetroType; $x.toString = $estr; return $x; };
retro.pub.RetroType.RTuple = function(types) { var $x = ["RTuple",5,types]; $x.__enum__ = retro.pub.RetroType; $x.toString = $estr; return $x; };
retro.pub.RetroType.RUnknown = function(id) { var $x = ["RUnknown",6,id]; $x.__enum__ = retro.pub.RetroType; $x.toString = $estr; return $x; };
retro.pub.RetroType.RClass = function(type) { var $x = ["RClass",7,type]; $x.__enum__ = retro.pub.RetroType; $x.toString = $estr; return $x; };
retro.pub.RetroTypeChecker = function() { };
retro.pub.RetroTypeChecker.__name__ = ["retro","pub","RetroTypeChecker"];
retro.pub.RetroTypeChecker.check = function(type1,type2) {
	return true;
};
retro.pub.UserAgent = function() { };
retro.pub.UserAgent.__name__ = ["retro","pub","UserAgent"];
retro.pub.UserAgent.checkTablet = function() {
	if(window.navigator.userAgent.indexOf("iPad") > 0) return true;
	if(window.navigator.userAgent.indexOf("iPhone") > 0) return true;
	return false;
};
retro.view = {};
retro.view.ConsoleView = function(snap) {
	this.current_line = 0;
	var _g = this;
	this.lines = new Array();
	this.scan_buffer = new Array();
	this.group = snap.group();
	this.graphic = snap.rect(0,0,230,200);
	var coll = snap.rect(0,0,230,200);
	this.current_line = 0;
	this.texts = new Array();
	var _g1 = 0;
	while(_g1 < 8) {
		var i = _g1++;
		this.lines.push("");
		this.texts.push(snap.text(10,20 * i + 20,""));
	}
	var _g2 = 0;
	var _g11 = this.texts;
	while(_g2 < _g11.length) {
		var t = _g11[_g2];
		++_g2;
		t.attr({ 'font-size' : "8pt", fill : "#E67E22", 'font-family' : "Helvetica, Arial, sans-serif", width : 220});
	}
	this.graphic.attr({ fill : "#FFFFFF", stroke : "#FFFFFF", strokeWidth : 0});
	this.pos = new retro.pub.Point2D(0,0);
	this.prev_pos = new retro.pub.Point2D(0,0);
	this.setPos(200,80);
	coll.attr({ fill : "#ffffff", 'fill-opacity' : 0});
	coll.drag(function(dx,dy,x,y) {
		_g.addPos(dx - _g.prev_pos.getX(),dy - _g.prev_pos.getY());
		_g.prev_pos.setX(dx);
		_g.prev_pos.setY(dy);
	},function(x1,y1) {
		_g.prev_pos.setX(0);
		_g.prev_pos.setY(0);
		var cb = _g.scan_buffer.shift();
		if(cb != null) cb("dammy");
	},function(x2,y2) {
	});
	this.group.append(this.graphic);
	var _g3 = 0;
	var _g12 = this.texts;
	while(_g3 < _g12.length) {
		var t1 = _g12[_g3];
		++_g3;
		this.group.append(t1);
	}
	this.group.append(coll);
};
retro.view.ConsoleView.__name__ = ["retro","view","ConsoleView"];
retro.view.ConsoleView.prototype = {
	print: function(str) {
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.putChar(str.charAt(i));
		}
	}
	,println: function(str) {
		this.print(str + "\n");
	}
	,putChar: function(c) {
		if(c == "\n") this.next_line(); else {
			if(this.lines[this.current_line].length > 35) this.next_line();
			this.lines[this.current_line] += c;
			this.texts[this.current_line].attr({ text : this.lines[this.current_line]});
		}
	}
	,next_line: function() {
		if(this.current_line >= 35) {
			var _g1 = 0;
			var _g = this.lines.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.lines[i] = "";
			}
			this.current_line = 0;
		} else this.current_line++;
	}
	,scan: function(cb) {
		var str = window.prompt("Standard Input","");
		cb(str);
	}
	,getChar: function() {
	}
	,addPos: function(x,y) {
		this.pos.setX(this.pos.getX() + x);
		this.pos.setY(this.pos.getY() + y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,setPos: function(x,y) {
		this.pos.setX(x);
		this.pos.setY(y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,getPos: function() {
		return this.pos;
	}
	,OnPosChanged: function(x,y) {
		this.setPos(x,y);
	}
	,__class__: retro.view.ConsoleView
};
retro.view.DiagramView = function(diagramController) {
	this.count = 0;
	this.timer = null;
	var _g = this;
	this.jobViews = new Array();
	this.valueCarrierViews = new Array();
	this.diagramController = diagramController;
	var diagram = this.diagramController.getDiagram();
	diagram.onJobAdded($bind(this,this.OnJobAdded));
	diagram.onJobRemoved($bind(this,this.OnJobRemoved));
	diagram.onValueCarrierAdded($bind(this,this.OnValueCarrierAdded));
	diagram.onValueCarrierRemoved($bind(this,this.OnValueCarrierRemoved));
	diagram.onValueCarrierCleared($bind(this,this.OnValueCarrierCleared));
	var snap1 = this.diagramController.getEditor().snap;
	this.path_group = snap1.group();
	this.count = 0;
	this.control_group = snap1.group();
	Snap.load("/images/create.svg",function(f) {
		var g = f.select("svg");
		_g.control_group.append(g);
		_g.control_group.transform("translate(" + 80 + "," + 15 + ")");
		Snap.load("/images/create-over.svg",function(f1) {
			var g2 = f1.select("svg");
			g.click(function(e) {
				_g.control_group.append(g2);
				var createJobDialog = new CreateJobDialog();
				createJobDialog.on(function(pkg,cmp,x,y) {
					var jobComponent = _g.diagramController.getModule(pkg + "." + cmp);
					var job = _g.diagramController.addSymbolicLink(jobComponent);
					job.setPos(x,y);
				});
				createJobDialog.open();
				var timer = new haxe.Timer(1000);
				timer.run = function() {
					g2.remove();
				};
			});
		});
	});
	Snap.load("/images/dustbox.svg",function(f2) {
		var g1 = f2.select("g");
		var right = window.document.body.clientWidth;
		var dustbox_group = snap1.group();
		dustbox_group.transform("translate(" + (right - 90) + "," + 10 + ")");
		dustbox_group.append(g1);
		Snap.load("/images/dustbox-over.svg",function(f3) {
			var g21 = f3.select("g");
			_g.showDustBox = function() {
				g21.remove();
				dustbox_group.append(g1);
			};
			_g.showDustBoxOver = function() {
				g1.remove();
				dustbox_group.append(g21);
			};
		});
	});
};
retro.view.DiagramView.__name__ = ["retro","view","DiagramView"];
retro.view.DiagramView.prototype = {
	start_step: function() {
		var _g = this;
		if(this.timer == null) {
			this.timer = new haxe.Timer(80);
			this.timer.run = function() {
				var energy = _g.step();
				_g.count++;
				if(energy < 1 || _g.count > 100) {
					_g.timer.stop();
					_g.timer = null;
					_g.count = 0;
				}
			};
		}
	}
	,step: function() {
		var energy = 0;
		var _g = 0;
		var _g1 = this.jobViews;
		while(_g < _g1.length) {
			var jv = _g1[_g];
			++_g;
			energy += jv.step();
		}
		return energy;
	}
	,OnJobAdded: function(job) {
		var jobView = new retro.view.JobView(this.diagramController,new retro.controller.JobController(this.diagramController.getEditor(),job),this);
		var _g = 0;
		var _g1 = job.getInputPorts();
		while(_g < _g1.length) {
			var ip = _g1[_g];
			++_g;
			jobView.OnAddInputPortView(ip);
		}
		var _g2 = 0;
		var _g11 = job.getOutputPorts();
		while(_g2 < _g11.length) {
			var op = _g11[_g2];
			++_g2;
			jobView.OnAddOutputPortView(op);
		}
		jobView.drawView();
		this.jobViews.push(jobView);
	}
	,OnJobRemoved: function(job) {
		var _g = 0;
		var _g1 = this.jobViews;
		while(_g < _g1.length) {
			var jobView = _g1[_g];
			++_g;
			if(jobView.jobController.getJob() == job) {
				jobView.removeSelf();
				HxOverrides.remove(this.jobViews,jobView);
				return;
			}
		}
	}
	,OnValueCarrierAdded: function(valueCarrier) {
		this.valueCarrierViews.push(new retro.view.ValueCarrierView(this.diagramController.getEditor(),valueCarrier,this));
	}
	,OnValueCarrierRemoved: function(valueCarrier) {
		var _g = 0;
		var _g1 = this.valueCarrierViews;
		while(_g < _g1.length) {
			var vcv = _g1[_g];
			++_g;
			if(vcv.valueCarrier == valueCarrier) {
				vcv.remove();
				HxOverrides.remove(this.valueCarrierViews,vcv);
				return;
			}
		}
	}
	,OnValueCarrierCleared: function() {
		var _g = 0;
		var _g1 = this.valueCarrierViews;
		while(_g < _g1.length) {
			var vcv = _g1[_g];
			++_g;
			vcv.remove();
		}
		this.valueCarrierViews = new Array();
	}
	,getOutputPortView: function(port) {
		var _g = 0;
		var _g1 = this.jobViews;
		while(_g < _g1.length) {
			var jv = _g1[_g];
			++_g;
			if(jv.jobController.getJob().getId() != port.getParentJob().getId()) continue;
			var opv = jv.getOutputPortView(port);
			if(opv != null) return opv;
		}
		return null;
	}
	,getInputPortView: function(port) {
		var _g = 0;
		var _g1 = this.jobViews;
		while(_g < _g1.length) {
			var jv = _g1[_g];
			++_g;
			if(jv.jobController.getJob().getId() != port.getParentJob().getId()) continue;
			var opv = jv.getInputPortView(port);
			if(opv != null) return opv;
		}
		return null;
	}
	,__class__: retro.view.DiagramView
};
retro.view.PortView = function(diagramController,jobview,snap) {
	this.diagramController = diagramController;
	this.views = new Array();
	this.jobView = jobview;
	this.snap = snap;
	this.group = snap.group();
	this.upperGroup = snap.group();
	this.graphic = snap.circle(0,0,20);
	this.coll = snap.circle(0,0,20);
	this.th = 0;
	this.pos = new retro.pub.Point2D(0,0);
	this.velocity = 0;
	this.setPos(100,100);
	this.coll.attr({ fill : "#ffffff", 'fill-opacity' : 0});
	this.group.append(this.graphic);
	this.upperGroup.append(this.coll);
};
retro.view.PortView.__name__ = ["retro","view","PortView"];
retro.view.PortView.prototype = {
	refresh: function() {
		var _g = 0;
		var _g1 = this.views;
		while(_g < _g1.length) {
			var pathView = _g1[_g];
			++_g;
			pathView.refresh();
		}
	}
	,addPos: function(x,y) {
		this.pos.setX(this.pos.getX() + x);
		this.pos.setY(this.pos.getY() + y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
		this.upperGroup.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,setR: function(th) {
		this.th = th;
		this.setPos(60 * Math.cos(this.th),60 * Math.sin(this.th));
	}
	,setPos: function(x,y) {
		this.pos.setX(x);
		this.pos.setY(y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
		this.upperGroup.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,getPos: function() {
		return retro.pub.Point2D.add(this.pos,this.jobView.getPos());
	}
	,getLocalPos: function() {
		return this.pos;
	}
	,step_by_force: function(force) {
		var n = new retro.pub.Point2D(-Math.sin(this.th),Math.cos(this.th));
		this.velocity += (force.getX() * n.getX() + force.getY() * n.getY()) / 200;
		this.velocity *= 0.7;
		if(this.velocity > Math.PI / 30) this.velocity = Math.PI / 30;
		if(this.velocity < -Math.PI / 30) this.velocity = -Math.PI / 30;
		this.th += this.velocity;
		this.setR(this.th);
	}
	,__class__: retro.view.PortView
};
retro.view.InputPortView = function(diagramController,jobview,port,snap) {
	this.isConnected = false;
	var _g = this;
	retro.view.PortView.call(this,diagramController,jobview,snap);
	this.port = port;
	this.port.onSetConstantValue($bind(this,this.OnSetConstant));
	this.port.onRemoveConstantValue($bind(this,this.OnRemoveConstant));
	this.graphic.attr({ fill : "#3498DB", stroke : "#FFFFFF", strokeWidth : 1, 'fill-opacity' : 0});
	var text = snap.text(20,3,port.getName());
	text.attr({ 'font-size' : "8pt", fill : "#2C3E50", 'font-family' : "Helvetica, Arial, sans-serif"});
	this.upperGroup.append(text);
	var touchListener = function(e,x,y) {
		if(_g.diagramController.setRubberbandEnd(_g.port)) {
			_g.diagramController.clearRubberband();
			_g.isConnected = true;
		} else if(_g.isConnected == false) {
			var v = window.prompt("","");
			if(v != null) _g.port.setConstant(new retro.model.Value(retro.pub.RetroType.RNumber,JSON.parse(v)));
		}
	};
	if(retro.pub.UserAgent.checkTablet()) this.coll.touchstart(touchListener); else this.coll.mouseup(touchListener);
	this.setPos(0,0);
};
retro.view.InputPortView.__name__ = ["retro","view","InputPortView"];
retro.view.InputPortView.__super__ = retro.view.PortView;
retro.view.InputPortView.prototype = $extend(retro.view.PortView.prototype,{
	step: function() {
		if(this.views.length == 0) {
		}
		var force = new retro.pub.Point2D(0,0);
		var _g = 0;
		var _g1 = this.jobView.getPortViews();
		while(_g < _g1.length) {
			var opv = _g1[_g];
			++_g;
			var coulomb = retro.pub.Point2D.sub(this.getPos(),opv.getPos());
			var r = coulomb.distanceSq();
			if(r == 0) r = 0.01;
			retro.pub.Point2D.timesToSelf(coulomb,1 / r * 100);
			retro.pub.Point2D.addToSelf(force,coulomb);
		}
		var _g2 = 0;
		var _g11 = this.views;
		while(_g2 < _g11.length) {
			var pathView = _g11[_g2];
			++_g2;
			var attraction = retro.pub.Point2D.sub(pathView.source.getPos(),this.getPos());
			var r1 = attraction.distance();
			if(r1 > 1000) r1 = 1000;
			retro.pub.Point2D.timesToSelf(attraction,r1 / 120);
			retro.pub.Point2D.addToSelf(force,attraction);
		}
		retro.pub.Point2D.timesToSelf(force,1);
		this.step_by_force(force);
		return this.velocity * this.velocity * 100;
	}
	,OnSetConstant: function(v) {
		var _g = this;
		this.constantValueGraphic = this.snap.group();
		var t = Std.string(v.value);
		var text = this.snap.text(-2,4,t);
		text.attr({ 'font-size' : "8pt", fill : "#ffffff", 'font-family' : "Helvetica, Arial, sans-serif"});
		var graphic = this.snap.rect(-20,-20,40 + (t.length - 1) * 6,40,20,20);
		graphic.attr({ fill : "#E67E22", strokeWidth : 1, stroke : "#E67E22"});
		this.constantValueGraphic.append(graphic);
		this.constantValueGraphic.append(text);
		this.upperGroup.append(this.constantValueGraphic);
		graphic.click(function(e) {
			_g.port.removeConstant();
		});
	}
	,OnRemoveConstant: function() {
		this.constantValueGraphic.remove();
	}
	,__class__: retro.view.InputPortView
});
retro.view.JobView = function(diagramController,jobController,diagramView) {
	var _g = this;
	this.inputportviews = new Array();
	this.outputportviews = new Array();
	this.diagramController = diagramController;
	this.jobController = jobController;
	this.diagramView = diagramView;
	this.job = this.jobController.getJob();
	this.job.onInputPortAdded($bind(this,this.OnAddInputPortView));
	this.job.onOutputPortAdded($bind(this,this.OnAddOutputPortView));
	this.job.onPosChanged($bind(this,this.OnPosChanged));
	this.snap = this.jobController.getEditor().snap;
	this.group = this.snap.group();
	this.titleRect = this.snap.rect(0,0,216,35);
	this.titleRect.attr({ strokeWidth : 0, stroke : "#FFFFFF", fill : "#E67E22"});
	this.portRect = this.snap.rect(0,35,216,0);
	this.portRect.attr({ strokeWidth : 0, stroke : "#FFFFFF", fill : "#FFFFFF"});
	this.coll = this.snap.rect(0,0,216,35);
	this.titleText = this.snap.text(12,21,this.job.getName());
	this.titleText.attr({ 'font-size' : "8pt", fill : "#FFFFFF", 'font-family' : "Helvetica, Arial, sans-serif"});
	this.pos = new retro.pub.Point2D(0,0);
	this.prev_pos = new retro.pub.Point2D(0,0);
	this.setPos(100,100);
	this.coll.attr({ fill : "#ffffff", 'fill-opacity' : 0});
	this.coll.mousedown(function(e,x,y) {
	});
	var inDustBox = false;
	var isInDustBox = function(x1,y1) {
		var right = window.document.body.clientWidth;
		return inDustBox = right - 100 < x1 && x1 < right && y1 < 100;
	};
	this.coll.drag(function(dx,dy,x2,y2) {
		_g.addPos(dx - _g.prev_pos.getX(),dy - _g.prev_pos.getY());
		_g.prev_pos.setX(dx);
		_g.prev_pos.setY(dy);
		if(isInDustBox(x2 | 0,y2 | 0)) _g.diagramView.showDustBoxOver(); else _g.diagramView.showDustBox();
		_g.refresh();
	},function(x3,y3) {
		_g.prev_pos.setX(0);
		_g.prev_pos.setY(0);
	},function(x4,y4) {
		_g.refresh();
		_g.jobController.changePos(_g.pos.getX(),_g.pos.getY());
		if(inDustBox) {
			_g.diagramController.removeJob(_g.jobController.getJob());
			_g.diagramView.showDustBox();
		}
	});
};
retro.view.JobView.__name__ = ["retro","view","JobView"];
retro.view.JobView.prototype = {
	drawView: function() {
		var _g = 0;
		var _g1 = this.inputportviews;
		while(_g < _g1.length) {
			var portView = _g1[_g];
			++_g;
			this.group.append(portView.group);
		}
		var _g2 = 0;
		var _g11 = this.outputportviews;
		while(_g2 < _g11.length) {
			var portView1 = _g11[_g2];
			++_g2;
			this.group.append(portView1.group);
		}
		this.group.append(this.titleRect);
		this.group.append(this.portRect);
		this.group.append(this.titleText);
		this.group.append(this.coll);
		var _g3 = 0;
		var _g12 = this.inputportviews;
		while(_g3 < _g12.length) {
			var portView2 = _g12[_g3];
			++_g3;
			this.group.append(portView2.upperGroup);
		}
		var _g4 = 0;
		var _g13 = this.outputportviews;
		while(_g4 < _g13.length) {
			var portView3 = _g13[_g4];
			++_g4;
			this.group.append(portView3.upperGroup);
		}
		this.cal2();
		if(this.job.customDraw != null) this.job.customDraw(this);
	}
	,removeSelf: function() {
		this.group.remove();
	}
	,visible_config_btn: function() {
		var _g = this;
		this.config_timer = new haxe.Timer(3000);
		this.config_timer.run = function() {
			_g.config_timer.stop();
			_g.configGraphic.attr({ visibility : "hidden"});
		};
		this.configGraphic.attr({ visibility : "visible"});
	}
	,OnAddInputPortView: function(port) {
		var snap = this.jobController.getEditor().snap;
		var portView = new retro.view.InputPortView(this.diagramController,this,port,snap);
		this.inputportviews.push(portView);
		return portView;
	}
	,OnAddOutputPortView: function(port) {
		var snap = this.jobController.getEditor().snap;
		var portView = new retro.view.OutputPortView(this.diagramController,this,port,snap);
		this.outputportviews.push(portView);
		return portView;
	}
	,cal: function() {
		var th = 2 * Math.PI / (this.inputportviews.length + this.outputportviews.length);
		var thh = 0;
		var _g = 0;
		var _g1 = this.inputportviews;
		while(_g < _g1.length) {
			var pv = _g1[_g];
			++_g;
			pv.setR(thh);
			thh += th;
		}
		var _g2 = 0;
		var _g11 = this.outputportviews;
		while(_g2 < _g11.length) {
			var pv1 = _g11[_g2];
			++_g2;
			pv1.setR(thh);
			thh += th;
		}
	}
	,cal2: function() {
		Lambda.mapi(this.inputportviews,function(i,view) {
			return view.setPos(0,i * 54 + 35 + 27.);
		});
		Lambda.mapi(this.outputportviews,function(i1,view1) {
			return view1.setPos(216,i1 * 54 + 35 + 27.);
		});
		this.portRect.attr({ height : this.inputportviews.length > this.outputportviews.length?this.inputportviews.length * 54:this.outputportviews.length * 54});
		this.coll.attr({ height : this.inputportviews.length > this.outputportviews.length?this.inputportviews.length * 54 + 35:this.outputportviews.length * 54 + 35});
	}
	,step: function() {
		var energy = 0;
		var _g = 0;
		var _g1 = this.inputportviews;
		while(_g < _g1.length) {
			var portView = _g1[_g];
			++_g;
			energy += portView.step();
		}
		var _g2 = 0;
		var _g11 = this.outputportviews;
		while(_g2 < _g11.length) {
			var portView1 = _g11[_g2];
			++_g2;
			energy += portView1.step();
		}
		return energy;
	}
	,refresh: function() {
		var _g = 0;
		var _g1 = this.inputportviews;
		while(_g < _g1.length) {
			var portView = _g1[_g];
			++_g;
			portView.refresh();
		}
		var _g2 = 0;
		var _g11 = this.outputportviews;
		while(_g2 < _g11.length) {
			var portView1 = _g11[_g2];
			++_g2;
			portView1.refresh();
		}
	}
	,addPos: function(x,y) {
		this.pos.setX(this.pos.getX() + x);
		this.pos.setY(this.pos.getY() + y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,setPos: function(x,y) {
		this.pos.setX(x);
		this.pos.setY(y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,getPos: function() {
		return this.pos;
	}
	,getOutputPortView: function(port) {
		var _g = 0;
		var _g1 = this.outputportviews;
		while(_g < _g1.length) {
			var opv = _g1[_g];
			++_g;
			if(opv.port.getName() == port.getName()) return opv;
		}
		return null;
	}
	,getInputPortView: function(port) {
		var _g = 0;
		var _g1 = this.inputportviews;
		while(_g < _g1.length) {
			var ipv = _g1[_g];
			++_g;
			if(ipv.port.getName() == port.getName()) return ipv;
		}
		return null;
	}
	,getInputPortViews: function() {
		return this.inputportviews;
	}
	,getOutputPortViews: function() {
		return this.outputportviews;
	}
	,getPortViews: function() {
		var portViews = new Array();
		var _g = 0;
		var _g1 = this.inputportviews;
		while(_g < _g1.length) {
			var ipv = _g1[_g];
			++_g;
			portViews.push(ipv);
		}
		var _g2 = 0;
		var _g11 = this.outputportviews;
		while(_g2 < _g11.length) {
			var opv = _g11[_g2];
			++_g2;
			portViews.push(opv);
		}
		return portViews;
	}
	,OnPosChanged: function(x,y) {
		this.setPos(x,y);
	}
	,__class__: retro.view.JobView
};
retro.view.OutputPortView = function(diagramController,jobview,port,snap) {
	var _g = this;
	retro.view.PortView.call(this,diagramController,jobview,snap);
	this.port = port;
	this.port.onConnected($bind(this,this.OnConnected));
	this.graphic.attr({ fill : "#FFFFFF", stroke : "#FFFFFF", strokeWidth : 0});
	var text = snap.text(-50,3,port.getName());
	text.attr({ 'font-size' : "8pt", fill : "#2C3E50", 'font-family' : "Helvetica, Arial, sans-serif"});
	this.upperGroup.append(text);
	this.coll.mousedown(function(e,x,y) {
		_g.diagramController.setRubberbandStart(_g.port);
	});
	this.port.onSelected = function() {
		_g.graphic.attr({ fill : "#E67E22", stroke : "#FFFFFF", strokeWidth : 0});
	};
	this.port.onNormal = function() {
		_g.graphic.attr({ fill : "#FFFFFF", stroke : "#FFFFFF", strokeWidth : 0});
	};
};
retro.view.OutputPortView.__name__ = ["retro","view","OutputPortView"];
retro.view.OutputPortView.__super__ = retro.view.PortView;
retro.view.OutputPortView.prototype = $extend(retro.view.PortView.prototype,{
	OnConnected: function(o,i) {
		var inputView = this.jobView.diagramView.getInputPortView(i);
		var pathView = new retro.view.PathView(this.diagramController,this.jobView.diagramView,this,inputView,this.snap);
		this.views.push(pathView);
		inputView.views.push(pathView);
	}
	,step: function() {
		if(this.views.length == 0) {
		}
		var force = new retro.pub.Point2D(0,0);
		var _g = 0;
		var _g1 = this.jobView.getPortViews();
		while(_g < _g1.length) {
			var ipv = _g1[_g];
			++_g;
			var coulomb = retro.pub.Point2D.sub(this.getPos(),ipv.getPos());
			var r = coulomb.distanceSq();
			if(r == 0) r = 0.01;
			retro.pub.Point2D.timesToSelf(coulomb,1 / r * 100);
			retro.pub.Point2D.addToSelf(force,coulomb);
		}
		var _g2 = 0;
		var _g11 = this.views;
		while(_g2 < _g11.length) {
			var pathView = _g11[_g2];
			++_g2;
			var attraction = retro.pub.Point2D.sub(pathView.target.getPos(),this.getPos());
			var r1 = attraction.distance();
			if(r1 > 1000) r1 = 1000;
			retro.pub.Point2D.timesToSelf(attraction,r1 / 120);
			retro.pub.Point2D.addToSelf(force,attraction);
		}
		retro.pub.Point2D.timesToSelf(force,1);
		this.step_by_force(force);
		this.refresh();
		return this.velocity * this.velocity * 100;
	}
	,__class__: retro.view.OutputPortView
});
retro.view.PathView = function(diagramController,diagramView,source_port,target_port,snap) {
	var _g = this;
	this.onRemoveListeners = new Array();
	this.diagramController = diagramController;
	this.source = source_port;
	this.target = target_port;
	this.snap = snap;
	this.diagramView = diagramView;
	this.source.port.onDisconnected($bind(this,this.onDisconnect));
	this.group = this.snap.group();
	this.graphic = this.snap.line(0,0,0,0);
	this.coll = this.snap.line(0,0,0,0);
	this.graphic.attr({ stroke : "#FFFFFF", strokeWidth : 1});
	this.coll.attr({ stroke : "#a0a000", 'stroke-opacity' : 0, strokeWidth : 30});
	diagramView.path_group.append(this.group);
	this.coll.mousedown(function(e,x,y) {
		_g.visible_remove_btn();
	});
	this.group.append(this.graphic);
	this.group.append(this.coll);
	this.refresh();
	this.init_remove_btn();
};
retro.view.PathView.__name__ = ["retro","view","PathView"];
retro.view.PathView.prototype = {
	init_remove_btn: function() {
		var _g = this;
		Snap.load("/images/remove.svg",function(f) {
			var g = f.select("g");
			_g.diagramView.control_group.append(g);
			g.mousedown(function(e,x,y) {
				retro.controller.DiagramController.disconnect(_g.source.port,_g.target.port);
				_g.remove_graphic.attr({ visibility : "hidden"});
			});
			g.attr({ visibility : "hidden"});
			g.transform("translate(" + 0 + "," + 0 + ")");
			_g.remove_graphic = g;
		});
	}
	,visible_remove_btn: function() {
		var _g = this;
		var xx = (this.target.getPos().getX() + this.source.getPos().getX()) / 2 - 80 - 15 - 6;
		var yy = (this.target.getPos().getY() + this.source.getPos().getY()) / 2 - 15 - 15 - 6;
		this.remove_graphic.transform("translate(" + xx + "," + yy + ")");
		this.remove_timer = new haxe.Timer(2000);
		this.remove_timer.run = function() {
			_g.remove_graphic.attr({ visibility : "hidden"});
			_g.remove_timer.stop();
		};
		this.remove_graphic.attr({ visibility : "visible"});
	}
	,onDisconnect: function(o,i) {
		if(this.target.port != i) return;
		this.group.remove();
		this.remove_graphic.remove();
		HxOverrides.remove(this.source.views,this);
		HxOverrides.remove(this.target.views,this);
		this.target.isConnected = false;
	}
	,refresh: function() {
		var xx = this.target.getPos().getX() - this.source.getPos().getX();
		var yy = this.target.getPos().getY() - this.source.getPos().getY();
		var len = Math.sqrt(xx * xx + yy * yy);
		xx = xx / len;
		yy = yy / len;
		this.graphic.attr({ x1 : this.source.getPos().getX() + xx * 20, y1 : this.source.getPos().getY() + yy * 20, x2 : this.target.getPos().getX() - xx * 20, y2 : this.target.getPos().getY() - yy * 20});
		this.coll.attr({ x1 : this.source.getPos().getX() + xx * 20, y1 : this.source.getPos().getY() + yy * 20, x2 : this.target.getPos().getX() - xx * 20, y2 : this.target.getPos().getY() - yy * 20});
	}
	,__class__: retro.view.PathView
};
retro.view.RunMode = { __ename__ : true, __constructs__ : ["Stop","Run"] };
retro.view.RunMode.Stop = ["Stop",0];
retro.view.RunMode.Stop.toString = $estr;
retro.view.RunMode.Stop.__enum__ = retro.view.RunMode;
retro.view.RunMode.Run = ["Run",1];
retro.view.RunMode.Run.toString = $estr;
retro.view.RunMode.Run.__enum__ = retro.view.RunMode;
retro.view.ProjectView = function(projectController,exportController) {
	var _g = this;
	this.projectController = projectController;
	this.exportController = exportController;
	this.mode = retro.view.RunMode.Stop;
	var snap1 = this.projectController.getEditor().snap;
	var project = this.projectController.getProject();
	project.onDiagramAdded($bind(this,this.OnDiagramAdded));
	this.control_group = snap1.group();
	Snap.load("/images/play.svg",function(f) {
		var g = f.select("svg");
		_g.control_group.append(g);
		_g.control_group.transform("translate(" + 15 + "," + 15 + ")");
		Snap.load("/images/play-over.svg",function(f1) {
			var g2 = f1.select("svg");
			_g.control_group.transform("translate(" + 15 + "," + 15 + ")");
			g.click(function(e) {
				console.log("click");
				if(_g.mode == retro.view.RunMode.Stop) {
					_g.projectController.run();
					_g.mode = retro.view.RunMode.Run;
					_g.control_group.append(g2);
				}
			});
			g2.click(function(e1) {
				if(_g.mode == retro.view.RunMode.Run) {
					_g.projectController.stop();
					_g.mode = retro.view.RunMode.Stop;
					g2.remove();
				}
			});
		});
	});
};
retro.view.ProjectView.__name__ = ["retro","view","ProjectView"];
retro.view.ProjectView.prototype = {
	OnDiagramAdded: function(diagram) {
		this.diagramView = new retro.view.DiagramView(new retro.controller.DiagramController(this.projectController.getEditor(),diagram,this.projectController.getEditor().virtualDevice));
	}
	,__class__: retro.view.ProjectView
};
retro.view.Thema = function() { };
retro.view.Thema.__name__ = ["retro","view","Thema"];
retro.view.ValueCarrierView = function(editor,valueCarrier,diagramView) {
	this.valueCarrier = valueCarrier;
	this.diagramView = diagramView;
	this.valueCarrier.onStep($bind(this,this.OnStep));
	this.count = 0;
	var snap = editor.snap;
	this.pos = new retro.pub.Point2D(0,0);
	this.group = snap.group();
	var t = this.value2String(valueCarrier.getValue().value);
	var text = snap.text(-2,4,t);
	text.attr({ 'font-size' : "8pt", fill : "#FFFFFF", 'font-family' : "Helvetica, Arial, sans-serif"});
	this.graphic = snap.rect(-20,-20,40 + (t.length - 1) * 6,40,20,20);
	this.graphic.attr({ fill : "#E67E22", strokeWidth : 1, stroke : "#E67E22"});
	this.group.append(this.graphic);
	this.group.append(text);
	this.startPosition();
};
retro.view.ValueCarrierView.__name__ = ["retro","view","ValueCarrierView"];
retro.view.ValueCarrierView.prototype = {
	value2String: function(v) {
		if(Type["typeof"](v) == ValueType.TObject) return "Object"; else if(Type["typeof"](v) == ValueType.TNull) return "Null"; else if(Type["typeof"](v) == ValueType.TFloat) return Std.string(v); else if(Type["typeof"](v) == ValueType.TInt) return JSON.stringify(v); else if(Type["typeof"](v) == ValueType.TFloat) return v; else if(Type["typeof"](v) == ValueType.TBool) {
			if(v == true) return "True"; else return "False";
		} else {
			var class_name = Type.getClassName(Type.getClass(v));
			if(class_name == "String") return v; else return class_name;
		}
	}
	,OnUsed: function() {
		this.remove();
	}
	,OnStep: function() {
		this.addPos(this.vec.getX(),this.vec.getY());
	}
	,remove: function() {
		this.group.remove();
	}
	,startPosition: function() {
		var outputPortView = this.diagramView.getOutputPortView(this.valueCarrier.srcPort);
		var inputPortView = this.diagramView.getInputPortView(this.valueCarrier.destPort);
		this.vec = retro.pub.Point2D.sub(inputPortView.getPos(),outputPortView.getPos());
		retro.pub.Point2D.timesToSelf(this.vec,0.025);
		this.setPos(outputPortView.getPos().getX(),outputPortView.getPos().getY());
	}
	,addPos: function(x,y) {
		this.pos.setX(this.pos.getX() + x);
		this.pos.setY(this.pos.getY() + y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,setPos: function(x,y) {
		this.pos.setX(x);
		this.pos.setY(y);
		this.group.transform("translate(" + this.pos.getX() + "," + this.pos.getY() + ")");
	}
	,endPosition: function() {
	}
	,__class__: retro.view.ValueCarrierView
};
retro.vm = {};
retro.vm.Application = function() {
	this.diagram = null;
};
retro.vm.Application.__name__ = ["retro","vm","Application"];
retro.vm.Application.prototype = {
	getName: function() {
		return "Application Name";
	}
	,parse: function(json_obj) {
	}
	,parse_from_json: function(json_text) {
	}
	,__class__: retro.vm.Application
};
retro.vm.Runtime = function(diagram) {
	this.diagram = diagram;
};
retro.vm.Runtime.__name__ = ["retro","vm","Runtime"];
retro.vm.Runtime.prototype = {
	isRunning: function() {
		if(this.timer != null) return true;
		return false;
	}
	,run: function(entry,v) {
		var _g = this;
		this.invoke_entry(entry,new retro.model.Value(retro.pub.RetroType.RNumber,v));
		var speed = window.sessionStorage.getItem("speed");
		if(speed == null) speed = "32";
		this.timer = new haxe.Timer(Std.parseInt(speed));
		this.timer.run = function() {
			_g.run_step();
		};
	}
	,stop: function() {
		this.timer.stop();
		this.timer = null;
	}
	,invoke_entry: function(entry,v) {
		var _g4 = this;
		var worker = entry.getWorker();
		worker.act(null,function(script_result) {
			var _g = 0;
			var _g1 = entry.getOutputPorts();
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				var _g2 = 0;
				var _g3 = p.connection;
				while(_g2 < _g3.length) {
					var c = _g3[_g2];
					++_g2;
					var newValueCarrier = new retro.model.ValueCarrier(v,p,c);
					_g4.diagram.addValueCarrier(newValueCarrier);
				}
			}
		});
		return true;
	}
	,run_step: function() {
		var _g4 = this;
		var _g = 0;
		var _g1 = this.diagram.getValueCarriers();
		while(_g < _g1.length) {
			var valueCarrier = [_g1[_g]];
			++_g;
			var port = [valueCarrier[0].step()];
			if(port[0] == null) continue;
			port[0].setValueCarrier(valueCarrier[0]);
			var params = port[0].parent.getParams();
			var worker = port[0].parent.getWorker();
			var flg = true;
			var _g2 = 0;
			var _g3 = port[0].parent.getInputPorts();
			while(_g2 < _g3.length) {
				var p = _g3[_g2];
				++_g2;
				if(p.getValue() == null) flg = false;
			}
			if(flg) {
				var _g21 = 0;
				var _g31 = port[0].parent.getInputPorts();
				while(_g21 < _g31.length) {
					var p1 = _g31[_g21];
					++_g21;
					this.diagram.removeValueCarrier(p1.useValueCarrier());
				}
			}
			worker.act(params,(function(port,valueCarrier) {
				return function(script_result) {
					if(script_result == null) return;
					var _g22 = 0;
					var _g32 = port[0].parent.getInputPorts();
					while(_g22 < _g32.length) {
						var p2 = _g32[_g22];
						++_g22;
						_g4.diagram.removeValueCarrier(p2.useValueCarrier());
					}
					_g4.diagram.removeValueCarrier(valueCarrier[0]);
					var _g23 = 0;
					var _g33 = port[0].parent.getOutputPorts();
					while(_g23 < _g33.length) {
						var p3 = _g33[_g23];
						++_g23;
						var sr = script_result.get(p3.name);
						if(sr == null) continue;
						var _g5 = 0;
						var _g6 = p3.connection;
						while(_g5 < _g6.length) {
							var c = _g6[_g5];
							++_g5;
							var newValueCarrier = new retro.model.ValueCarrier(new retro.model.Value(p3.type,sr.value),p3,c);
							_g4.diagram.addValueCarrier(newValueCarrier);
						}
					}
				};
			})(port,valueCarrier));
		}
	}
	,__class__: retro.vm.Runtime
};
retro.vm.Worker = function(job,func) {
	this.job = job;
	this.func = func;
};
retro.vm.Worker.__name__ = ["retro","vm","Worker"];
retro.vm.Worker.prototype = {
	act: function(params,cb) {
		this.func(params,cb);
	}
	,__class__: retro.vm.Worker
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var q = window.jQuery;
js.JQuery = q;
retro.library.core.TextBox.id = 0;
retro.view.Thema.fill = "#FCFCFC";
retro.view.Thema.stroke = "#FFFFFF";
retro.view.Thema.strokeWidth = 1;
retro.view.Thema.fontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.fontSize = "8pt";
retro.view.Thema.fontFill = "#2C3E50";
retro.view.Thema.radius = 20;
retro.view.Thema.white = "#FFFFFF";
retro.view.Thema.orange = "#E67E22";
retro.view.Thema.blue = "#3498DB";
retro.view.Thema.jobTitleFontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.jobTitleFontSize = "8pt";
retro.view.Thema.jobTitleFontFill = "#FFFFFF";
retro.view.Thema.jobWidth = 216;
retro.view.Thema.jobTitleHeight = 35;
retro.view.Thema.jobTitleTextX = 12;
retro.view.Thema.jobTitleTextY = 21;
retro.view.Thema.jobTitleFill = "#E67E22";
retro.view.Thema.jobTitleStroke = "#FFFFFF";
retro.view.Thema.jobTitleStrokeWidth = 0;
retro.view.Thema.jobOnePortHeight = 54;
retro.view.Thema.jobPortFill = "#FFFFFF";
retro.view.Thema.jobPortStroke = "#FFFFFF";
retro.view.Thema.jobPortStrokeWidth = 0;
retro.view.Thema.portRadius = 20;
retro.view.Thema.inputPortFill = "#3498DB";
retro.view.Thema.inputPortFillOpacity = 0;
retro.view.Thema.inputPortStroke = "#FFFFFF";
retro.view.Thema.inputPortStrokeWidth = 1;
retro.view.Thema.inputPortFontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.inputPortFontSize = "8pt";
retro.view.Thema.inputPortFontFill = "#2C3E50";
retro.view.Thema.outputPortFill = "#FFFFFF";
retro.view.Thema.outputPortStroke = "#FFFFFF";
retro.view.Thema.outputPortStrokeWidth = 0;
retro.view.Thema.outputPortFontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.outputPortFontSize = "8pt";
retro.view.Thema.outputPortFontFill = "#2C3E50";
retro.view.Thema.outputPortTextX = -50;
retro.view.Thema.outputPortTextY = 3;
retro.view.Thema.selectedOutputPortFill = "#E67E22";
retro.view.Thema.selectedOutputPortStroke = "#FFFFFF";
retro.view.Thema.selectedOutputPortStrokeWidth = 0;
retro.view.Thema.inputPortTextX = 20;
retro.view.Thema.inputPortTextY = 3;
retro.view.Thema.pathLineStroke = "#FFFFFF";
retro.view.Thema.pathLineStrokeWidth = 1;
retro.view.Thema.consoleFill = "#FFFFFF";
retro.view.Thema.consoleStroke = "#FFFFFF";
retro.view.Thema.consoleStrokeWidth = 0;
retro.view.Thema.consoleFontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.consoleFontSize = "8pt";
retro.view.Thema.consoleFontFill = "#E67E22";
retro.view.Thema.constantValueFill = "#E67E22";
retro.view.Thema.constantValueStroke = "#E67E22";
retro.view.Thema.constantValueStrokeWidth = 1;
retro.view.Thema.constantValueFontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.constantValueFontSize = "8pt";
retro.view.Thema.constantValueFontFill = "#ffffff";
retro.view.Thema.constantValueRadius = 20;
retro.view.Thema.valueCarrierFill = "#E67E22";
retro.view.Thema.valueCarrierStroke = "#E67E22";
retro.view.Thema.valueCarrierStrokeWidth = 1;
retro.view.Thema.valueCarrierFontFamily = "Helvetica, Arial, sans-serif";
retro.view.Thema.valueCarrierFontSize = "8pt";
retro.view.Thema.valueCarrierFontFill = "#FFFFFF";
retro.view.Thema.valueCarrierRadius = 20;
retro.view.Thema.playSvgX = 15;
retro.view.Thema.playSvgY = 15;
retro.view.Thema.createSvgX = 80;
retro.view.Thema.createSvgY = 15;
retro.view.Thema.saveSvgX = 220;
retro.view.Thema.saveSvgY = 2;
retro.view.Thema.dustboxRightX = 90;
retro.view.Thema.dustboxY = 10;
retro.view.Thema.dustboxWidth = 100;
retro.view.Thema.dustboxHeight = 100;
retro.view.Thema.removeRadius = 22;
Main.main();
})(typeof window != "undefined" ? window : exports);

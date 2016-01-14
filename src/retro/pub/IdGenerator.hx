package retro.pub;

typedef ID = String;
typedef EditorKey = String;

class IDGenerator{
	private var uniqueEditorKey : EditorKey;
	private var counter : Int;
	private static var idGen : IDGenerator; 

	private function new(uniqueEditorKey){
		this.uniqueEditorKey = uniqueEditorKey;
		this.counter = 0;
	}

	public static function getInstance(uniqueEditorKey){
		if( idGen == null ){
			idGen = new IDGenerator(uniqueEditorKey);
		}
		return idGen;
	}

	public function genID(){
		this.counter += 1;
		return this.uniqueEditorKey + Std.string(this.counter);
	}

}
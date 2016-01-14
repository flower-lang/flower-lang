package retro.model;

class EntryJob extends Job{

	public function new(id){
		super(id);
	}
	
	override public function getName() {
		return "Entry";
	}
	
}
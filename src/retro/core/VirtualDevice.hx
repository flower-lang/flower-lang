package retro.core;

#if js
import retro.view.ConsoleView;
import snap.Snap;
#end

class VirtualDevice {

#if js
	private var consoleDevice : ConsoleView;
	private var snap:Snap;
#end
	
	public function new() {
	
	}
	
#if js
	public function setConsoleDevice(consoleDevice : ConsoleView) {
		this.consoleDevice = consoleDevice;
	}
	
	public function getConsoleDevice() {
		return this.consoleDevice;
	}
	
	public function setSVGDevice(snap : Snap) {
		this.snap = snap;
	}
	
	public function getSnap() {
		return this.snap;
	}	
#end
	
}
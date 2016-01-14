package retro.pub;

class UserAgent{
	public static function checkTablet() : Bool{
		if(js.Browser.window.navigator.userAgent.indexOf("iPad") > 0) {
			return true;
		}
		if(js.Browser.window.navigator.userAgent.indexOf("iPhone") > 0) {
			return true;
		}
		return false;
	}
}
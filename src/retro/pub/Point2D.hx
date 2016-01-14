package retro.pub;

class Point2D {
	private var x:Float;
	private var y:Float;
	public function new(x, y) {
		this.x = x;
		this.y = y;
	}
	public function getX() {
		return this.x;
	}
	public function getY() {
		return this.y;
	}
	public function setX(x) {
		this.x = x;
	}
	public function setY(y) {
		this.y = y;
	}
	public function normalized() {
		var len = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= len;
		this.y /= len;
	}
	static public function add(p1:Point2D, p2:Point2D) {
		return new Point2D(p1.x + p2.x, p1.y + p2.y);
	}
	static public function sub(p1:Point2D, p2:Point2D) {
		return new Point2D(p1.x - p2.x, p1.y - p2.y);
	}
	static public function addToSelf(p1:Point2D, p2:Point2D) {
		p1.x += p2.x;
		p1.y += p2.y;
	}
	static public function subToSelf(p1:Point2D, p2:Point2D) {
		p1.x -= p2.x;
		p1.y -= p2.y;
	}
	static public function timesToSelf(p1:Point2D, t:Float) {
		p1.x *= t;
		p1.y *= t;
	}
	public function distance() {
		return Math.sqrt(this.distanceSq());
	}
	public function distanceSq() {
		return this.getX() * this.getX();
	}
}

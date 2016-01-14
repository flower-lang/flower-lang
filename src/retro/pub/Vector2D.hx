package retro.pub;


class Vector2D {
	private var p1:Point2D;
	private var p2:Point2D;
	public function new(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
	public function new(x1, y1, x2, y2) {
		this.p1 = new Point2D(x1, y1);
		this.p2 = new Point2D(x2, y2);
	}
	public function distance() {
		return Math.sqrt(this.distanceSq());
	}
	public function distanceSq() {
		var p = Point2D.sub(this.p1, this.p2);
		return p.getX() * p.getX() + p.getY() * p.getY();
	}
}

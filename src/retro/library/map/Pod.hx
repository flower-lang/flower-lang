package retro.library.map;

class Pod{
    private static var instance : Pod;
    private var map : Map<String,Dynamic>;

    private function new() this.map = new Map<String, Dynamic>();
    public static function getInstance()
        return if( instance == null ) instance = new Pod() else instance;

    public function exists(key) return this.map.exists(key);
    public function get(key) return this.map.get(key);
    public function set(key, value) return this.map.set(key, value);
}
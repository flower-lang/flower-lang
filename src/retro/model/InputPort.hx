package retro.model;

import retro.model.Value;

class InputPort extends Port {
	//model
	public var connection : Array<OutputPort>;
	private var valueCarrier : ValueCarrier;
	private var constantValue : Value;
	//listeners
	private var onSetValueListeners:Array<ValueCarrier->Void>;
	private var onUseValueListeners:Array<Void->Void>;
	private var onSetConstantValueListeners:Array<Value->Void>;
	private var onRemoveConstantValueListeners:Array<Void->Void>;
	
	public function new(parent, type, name){
		super(parent, type, name);
		this.connection = new Array<OutputPort>();
		this.onSetValueListeners = new Array<ValueCarrier->Void>();
		this.onUseValueListeners = new Array<Void->Void>();
		this.onSetConstantValueListeners = new Array<Value->Void>();
		this.onRemoveConstantValueListeners = new Array<Void->Void>();
	}
	
	public function setValueCarrier(valueCarrier:ValueCarrier) {
		this.valueCarrier = valueCarrier;
		this.fireOnSetValueListeners(this.valueCarrier);
	}
	
	public function getValueCarrier():ValueCarrier {
		return this.valueCarrier;
	}
	
	public function getConstantValue() {
		return this.constantValue;
	}
	
	public function getValue():Value {
		if(this.constantValue != null) {
			return this.constantValue;
		}else{
			if(this.valueCarrier == null) {
				return null;
			}
			return this.valueCarrier.getValue();
		}
	}
	
	public function useValueCarrier() {
		var v = this.valueCarrier;
		this.valueCarrier = null;
		this.fireOnUseValueListeners();
		return v;
	}
	
	//定数を設定
	public function setConstant(value:Value) {
		this.constantValue = value;
		this.fireOnSetConstantValueListeners(this.constantValue);
	}
	
	//定数を削除
	public function removeConstant() {
		this.constantValue = null;
		this.fireOnRemoveConstantValueListeners();
	}
	
	public function onSetValue(listener) {
		this.onSetValueListeners.push(listener);
	}
	
	public function onUseValue(listener) {
		this.onUseValueListeners.push(listener);
	}
	
	public function onSetConstantValue(listener) {
		this.onSetConstantValueListeners.push(listener);
	}
	
	public function onRemoveConstantValue(listener) {
		this.onRemoveConstantValueListeners.push(listener);
	}
	
	private function fireOnSetValueListeners(v) {
		for(l in this.onSetValueListeners) {
			l(v);
		}
	}
	
	private function fireOnUseValueListeners() {
		for(l in this.onUseValueListeners) {
			l();
		}
	}
	private function fireOnSetConstantValueListeners(v) {
		for(l in this.onSetConstantValueListeners) {
			l(v);
		}
	}
	private function fireOnRemoveConstantValueListeners() {
		for(l in this.onRemoveConstantValueListeners) {
			l();
		}
	}
}
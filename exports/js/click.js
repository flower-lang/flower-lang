$(function(){
	$('.main_menu').click(function(){
		$(this).toggleClass("active");
	});

	var modal_open = false;
	var listeners = [];
	function CreateSvgDialog() {
	}

	CreateSvgDialog.prototype.on = function(listener) {
		listeners[0] = listener;
	}
	CreateSvgDialog.prototype.open = function() {
		if( modal_open == false ){
			modal_open = true;
			var modal =	$('<a href="#sub_svg"></a>');
			modal.leanModal({top: 20, closes : [(function(){ modal_open = false; })]});
			$(modal).click();
		}
	}


	function CreateSlideDialog() {
		this.listener = [];
		this.no_modal_listener = [];
	}

	CreateSlideDialog.prototype.on = function(listener) {}

	CreateSlideDialog.prototype.open = function(id) {
		var self = this;
		if( $("#slide_" + id).size() > 0 && modal_open == false){
			modal_open = true;
			var modal =	$('<a href="#slide_'+id+'"></a>');
			//var array = this.listener;
			//array.push(function(){ modal_open = false;	console.log("aaa"); });
			modal.leanModal({top: 20, closes : [function() {
				if(modal_open) {
					self.listener[0]()
				}
				modal_open = false;
			}]});
			$(modal).click();
		}else{
			this.no_modal_listener[0]();
		}
	}

	CreateSlideDialog.prototype.close = function(listener, no_modal_listener){
		this.listener[0] = listener;
		this.no_modal_listener[0] = no_modal_listener;
	}

	window.CreateSvgDialog = CreateSvgDialog;
	window.CreateSlideDialog = CreateSlideDialog
});
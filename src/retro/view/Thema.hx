package retro.view;

class Thema {
	// 色のデフォルト設定
	// dafaults Thema
	inline public static var fill = "#FCFCFC";
	inline public static var stroke = "#FFFFFF";
	inline public static var strokeWidth = 1;

	inline public static var fontFamily = "Helvetica, Arial, sans-serif";
	inline public static var fontSize = "8pt";
	inline public static var fontFill = "#2C3E50";

	inline public static var radius = 20;


	// ここに変数をテキトーに追加していいぽよ
	//例 : つかってないぽよ
	//inline public static var customfontFill = "";
	inline public static var white = "#FFFFFF";
	inline public static var orange = "#E67E22";
	inline public static var blue = "#3498DB";
	// ここまでー

	// 以下の変数名は代えないでぽよー。
	// jobView Thema
	inline public static var jobTitleFontFamily = fontFamily;
	inline public static var jobTitleFontSize = fontSize;
	inline public static var jobTitleFontFill = Thema.white;

	inline public static var jobWidth = 216;
	inline public static var jobTitleHeight = 35;
	inline public static var jobTitleTextX = 12;
	inline public static var jobTitleTextY = 21;

	inline public static var jobTitleFill = Thema.orange;
	inline public static var jobTitleStroke = stroke;
	inline public static var jobTitleStrokeWidth = 0;


	inline public static var jobOnePortHeight = 54;

	inline public static var jobPortFill = Thema.white;
	inline public static var jobPortStroke = Thema.white;
	inline public static var jobPortStrokeWidth = 0;

	inline public static var portRadius = radius;

	//InputPortView Thema
	inline public static var inputPortFill = Thema.blue;
	inline public static var inputPortFillOpacity = 0;
	inline public static var inputPortStroke = stroke;
	inline public static var inputPortStrokeWidth = Thema.strokeWidth;

	inline public static var inputPortFontFamily = fontFamily;
	inline public static var inputPortFontSize = fontSize;
	inline public static var inputPortFontFill = Thema.fontFill;


	//OutputPortView Thema
	inline public static var outputPortFill = Thema.white;
	inline public static var outputPortStroke = stroke;
	inline public static var outputPortStrokeWidth = 0;

	inline public static var outputPortFontFamily = fontFamily;
	inline public static var outputPortFontSize = fontSize;
	inline public static var outputPortFontFill = Thema.fontFill;

	inline public static var outputPortTextX = -50;
	inline public static var outputPortTextY = 3;

	//OutputPortView Selected Thema
	inline public static var selectedOutputPortFill = Thema.orange;
	inline public static var selectedOutputPortStroke = stroke;
	inline public static var selectedOutputPortStrokeWidth = 0;

	inline public static var inputPortTextX = 20;
	inline public static var inputPortTextY = 3;

	// PathLine
	inline public static var pathLineStroke = Thema.white;
	inline public static var pathLineStrokeWidth = strokeWidth;

	//Console View
	inline public static var consoleFill = Thema.white;
	inline public static var consoleStroke = Thema.white;
	inline public static var consoleStrokeWidth = 0;

	inline public static var consoleFontFamily = fontFamily;
	inline public static var consoleFontSize = fontSize;
	inline public static var consoleFontFill = Thema.orange;

	// Constant Value 
	inline public static var constantValueFill = Thema.orange;
	inline public static var constantValueStroke = Thema.orange;
	inline public static var constantValueStrokeWidth = strokeWidth;

	inline public static var constantValueFontFamily = fontFamily;
	inline public static var constantValueFontSize = fontSize;
	inline public static var constantValueFontFill = "#ffffff";

	inline public static var constantValueRadius = radius;

	// Value Carrier
	inline public static var valueCarrierFill = Thema.orange;
	inline public static var valueCarrierStroke = Thema.orange;
	inline public static var valueCarrierStrokeWidth = strokeWidth;

	inline public static var valueCarrierFontFamily = fontFamily;
	inline public static var valueCarrierFontSize = fontSize;
	inline public static var valueCarrierFontFill = "#FFFFFF";

	inline public static var valueCarrierRadius = radius;


	// play svg
	inline public static var playSvgX = 15;
	inline public static var playSvgY = 15;

	// create svg
	inline public static var createSvgX = 80;
	inline public static var createSvgY = 15;

	// save svg 
	inline public static var saveSvgX = 220;
	inline public static var saveSvgY = 2;

	// dustbox svg
	inline public static var dustboxRightX = 90;
	inline public static var dustboxY = 10;

	inline public static var dustboxWidth = 100;
	inline public static var dustboxHeight = 100;

	// remove svg
	inline public static var removeRadius = 22;
}

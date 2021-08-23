export enum WORDTYPE {
	UP_DOWN,
	LEFT_RIGHT,
	FOUR_LINE,
	SQUARE,
	COMBINE,
}

export enum PINYINTYPE {
	FORM,
	FIRST_UP,
	ALL_UP,
}

export interface WORDSTYLE {
	fontStyle: String;
	fontSize: String;
	fontColor: String;
}

export interface PINYINSTYLE {
	fontStyle: String;
	fontSize: String;
	fontColor: String;
}

export interface controllerFields {
	wordType: WORDTYPE;
	pinyinType: PINYINTYPE;
	wordStyle: WORDSTYLE;
	pinyinStyle: PINYINSTYLE;
	showWord: Boolean;
	showPinyin: Boolean;
	markTone: Boolean;
	uKeepPoint: Boolean;
	fontWidth: Number;
	useFontWidth: Boolean;
}

export interface wordFields {
	word: String; // word
	pinyin: String; // pinyin
	pysData: String; // 多音
}

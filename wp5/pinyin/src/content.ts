
import { parseDom, getUpELement } from "./utils/dom";
import { decorationSvgs } from "./utils/svg_constants";
import { FONTSIZEDEFAULT } from "./data";
import { removeTone } from './utils/noTone';

const renderList = {
	0: renderUpDown,
	1: renderLeftRight,
	2: renderLine,
	3: renderSquare,
	4: renderCombine
};

export const editContainer = (config, isPreview = false) => {
	const {
		data,
		options,
	} = config;

	const {
		wordType,
		wordStyle: {fontSize: wordFontSize},
		pinyinStyle: {fontSize: pinyinFontSize},
		fontWidth,
		useFontWidth
	} = options;
	const renderFunc = renderList[wordType];
	let item = '';
	for (let i = 0; i < data.length; i++) {
		item += renderFunc(data[i], options, isPreview).trim();
	}

	let width = undefined;
	let _wordFontSize = undefined;
	if( wordType === 0 ) {
		// 如果使用的是跟随文本的模式
		if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
			width =  useFontWidth ?  fontWidth + 'em' : '1em';
			_wordFontSize = useFontWidth ? `${(1/fontWidth).toFixed(2)}em` : '1em';
		} else {
			if(useFontWidth) {
				width = Math.max(options.fontWidth, 20) + 'pt';
			} else {
				width = getWidth(wordFontSize, pinyinFontSize) + 'pt';
			}
			_wordFontSize = wordFontSize + 'pt';
		}
	} else {
		if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
			_wordFontSize = '1em';
		} else {
			_wordFontSize = wordFontSize + 'pt';
		}
	}

	const map = new Map();

	map.set(0, `<span class="${ useFontWidth ? "py-equal-width ": "py-not-equal-width "}py-item-wrap-0 py-item-wrapper" style="font-size: ${width}">
	${
		isPreview ? '' : `
		<input
		style="margin-top:${ data.length ? '0.5em' : 0};
		width:${ data.length ? '10px' : '8em'};
		font-size:${_wordFontSize}"
			type="text" id="input--1" data-index="-1" placeholder="${data.length ? "" : "请输入文字~"}" autocomplete="off" class="py-first-input"
		>`
	}
	${item}</span>`);

	map.set(1, `<span class="py-item-wrap-1 py-item-wrapper" style="font-size: ${_wordFontSize}">
	${
		isPreview ? '' : `
		<input style="width:${ data.length ? '10pt' : '8em'}" type="text" id="input--1" data-index="-1" placeholder="${data.length ? "" : "请输入文字~"}" autocomplete="off" class="py-first-input">
	`}
	${item}</span>`);

	map.set(2, `<span class="py-item-wrap-2 py-item-wrapper" style="font-size: ${pinyinFontSize + 'px'}">
	${
		isPreview ? '' : `
		<input style="width:${ data.length ? '10pt' : '8em'}" type="text" id="input--1" data-index="-1" placeholder="${data.length ? "" : "请输入文字~"}" autocomplete="off" class="py-first-input">
	`}
	${item}</span>`);

	map.set(3, `<span class="py-item-wrap-3 py-item-wrapper" style="font-size: ${_wordFontSize}">
	${
		isPreview ? '' : `
		<input style="width:${ data.length ? '10pt' : '8em'}" type="text" id="input--1" data-index="-1" placeholder="${data.length ? "" : "请输入文字~"}" autocomplete="off" class="py-first-input">
	`}
	${item}</span>`);

	map.set(4, `<span class="py-item-wrap-4 py-item-wrapper" style="font-size: ${_wordFontSize}">
	${
		isPreview ? '' : `
		<input
		style="margin-top:${ data.length ? '0.5em' : 0};
		width:${ data.length ? '10px' : '8em'};
		font-size:${_wordFontSize}"
			type="text" id="input--1" data-index="-1" placeholder="${data.length ? "" : "请输入文字~"}" autocomplete="off" class="py-first-input"
		>`
	}
	${item}</span>`);


	let template = map.get(wordType);

	if(isPreview) {
		template = template.trim().replace(/\s{2,}/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<').replace(/class="py-item"/g, '').replace(/(color|font-family):inherit;?/g, '').replace(/(class|style)="\s{0,}"/g, '');
		template = template.replace(/contenteditable="true"/g, '');
	}
	return template;
};

export const addContainer = (config) => {
	const { data, options } = config;
	const { wordType } = options;
	let str = "";
	let renderFunc = renderList[wordType];
	for (let i = 0; i < data.length; i++) {
		str += renderFunc(data[i], options).trim();
	}
	return str;
};

function renderUpDown(data, options, isPreview = false) {

	const {
		wordStyle,
		pinyinStyle,
		showWord,
		showPinyin,
		fontWidth,
		useFontWidth,
		pinyinType
	} = options;

	const { pysData } = data;
	const polyphone = pysData.length > 0;
	// 是否展示多选的箭头
	const showSelectIcon = polyphone && showPinyin && showWord && !isPreview;
	const showInput = !isPreview;
	let pinyinFontSize = pinyinStyle.fontSize;
	let wordFontSize = wordStyle.fontSize;
	if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
		wordFontSize = useFontWidth ? `${(1/fontWidth).toFixed(2)}em` : '1em';;
		pinyinFontSize = useFontWidth ? `${(1/fontWidth).toFixed(2)}em` : '1em';
	} else {
		wordFontSize += 'pt';
		pinyinFontSize += 'pt';
	}

	return `
		<span class="py-item">
			<span class="py-pinyin" style="font-size:${pinyinFontSize}">
				<span
					contenteditable="true"
					class="py-wrap${showPinyin ? "" : ' hide-remain'}"
					style="color:${pinyinStyle.color}; font-family:${pinyinStyle.fontFamily}"
					>
					${wrapper(data.pinyin, options)}
				</span>
				${
					isPreview ? '' : `
					<div id="POLYPHONE" class="pys-chooser ${ showSelectIcon ? "" : "hide"}">
						<span class="py-down">${decorationSvgs.pys_tips}</span>
						<span class="py-masks pysChooser"></span>
					</div>`
				}
			</span>
			<span class="py-word" style="font-size:${wordFontSize}">
					<span
						style="color:${wordStyle.color};font-family:${wordStyle.fontFamily}"
					>
						<span class="${(showWord || data.type !== 1)  ? "" : 'hide-remain'}" >${data.word}</span>
					${
						isPreview ? '' :
						`
						<input type="text"
							class="py-word-input ${showInput ? "" : 'hide'}"
							autocomplete="off" style="font-size:1em">
						`
					}
					</span>
				</span>
		</span>`;
}

function renderLeftRight(data, options, isPreview = false) {

	const {
		wordStyle,
		pinyinStyle,
		showWord,
		showPinyin,
		pinyinType
	} = options;

	const { pysData } = data;
	const polyphone = pysData.length > 0;
	const showSelectIcon = polyphone && showPinyin && showWord && !isPreview;
	const showInput = !isPreview;

	let wordFontSize = wordStyle.fontSize;
	let pinyinFontSize = pinyinStyle.fontSize;
	if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
		wordFontSize = '1em';
		pinyinFontSize = '1em';
	} else {
		wordFontSize += 'pt';
		pinyinFontSize += 'pt';
	}

	return `
		<span class="py-item">
			<span class="py-word" style="font-size:${wordFontSize};">
				${
					isPreview ? '' : `
					<input
						class="py-word-input ${showInput ? "" : 'hide'}"
						
						type="text">`
				}
				<span
					class="py-word-span${(showWord || data.type !== 1) ? "" : ' hide'}" 
					style="color:${wordStyle.color};font-family:${wordStyle.fontFamily}"
				>
					${data.word}
				</span>
				<span
					class="py-pinyin-span${(showPinyin && data.type === 1) ? "" : ' hide'}"
					style="color:${pinyinStyle.color};font-size:${pinyinFontSize};"
				>
					<span class="${showWord ? "" : 'hide'}">(</span>
					<span class="py-wrap" style="font-family:${pinyinStyle.fontFamily}"  contenteditable="true">${wrapper(data.pinyin, options)}</span>
					<span class="${showWord ? "" : 'hide'}">)</span>
				</span>
				${
					isPreview ? '' : `
					<div id="POLYPHONE" class="pys-chooser ${ showSelectIcon ? "" : "hide" }">
						<span class="py-down">${decorationSvgs.pys_tips}</span>
						<span class="py-masks pysChooser"></span>
					</div>`
				}
			</span>
		</span>`;
}

function renderLine(data, options, isPreview = false) {

	const {
		wordStyle,
		pinyinStyle,
		showWord,
		showPinyin,
		pinyinType
	} = options;

	const { pysData } = data;
	const polyphone = pysData.length > 0;
	const showSelectIcon = polyphone && showPinyin && showWord && !isPreview;
	const showInput = !isPreview;

	let wordFontSize = wordStyle.fontSize;
	let pinyinFontSize = pinyinStyle.fontSize;
	if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
		wordFontSize = '1em';
		pinyinFontSize = '1em';
	} else {
		wordFontSize += 'pt';
		pinyinFontSize += 'pt';
	}

	return `
		<span class="py-item">
			<span class="py-word">
				${
					isPreview ? '' : `
					<input
						class="py-word-input ${showInput ? "" : 'hide'}"
						
						type="text">`
				}
				<span
					class="py-pinyin-span ${(showPinyin) ? "" : 'hide'}"
					style="color:${pinyinStyle.color};font-size:${pinyinFontSize};"
				>
					<span class="py-wrap" style="font-family:${pinyinStyle.fontFamily}" contenteditable="true">${wrapper(data.pinyin, options)}</span>
				</span>
				${
					isPreview ? '' : `
					<div id="POLYPHONE" class="pys-chooser ${ showSelectIcon ? "" : "hide" }">
						<span class="py-down">${decorationSvgs.pys_tips}</span>
						<span class="py-masks pysChooser"></span>
					</div>`
				}
			</span>
		</span>`;
}

function renderSquare(data, options, isPreview = false) {

	const {
		wordStyle,
		pinyinStyle,
		showWord,
	} = options;

	const showInput = !isPreview;
	let wordFontSize = wordStyle.fontSize;
	let pinyinFontSize = pinyinStyle.fontSize;
	if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
		wordFontSize = '1em';
		pinyinFontSize = '1em';
	} else {
		wordFontSize += 'pt';
		pinyinFontSize += 'pt';
	}

	return `
		<span class="py-item">
			<span class="py-word" style="font-size:${wordFontSize};">
				${
					isPreview ? '' : `
					<input
						class="py-word-input ${showInput ? "" : 'hide'}"
						type="text">`
				}
				<span
					class="py-word-span ${(showWord || data.type !== 1) ? "" : 'hide'}" 
					style="color:${wordStyle.color};font-family:${wordStyle.fontFamily}"
				>
					${data.word}
				</span>
			</span>
		</span>`;
}

function renderCombine(data, options, isPreview = false) {

	const {
		wordStyle,
		pinyinStyle,
		showWord,
		showPinyin,
		fontWidth,
		useFontWidth,
		pinyinType
	} = options;

	const { pysData } = data;
	const polyphone = pysData.length > 0;
	// 是否展示多选的箭头
	const showSelectIcon = polyphone && showPinyin && showWord && !isPreview;
	const showInput = !isPreview;
	let pinyinFontSize = pinyinStyle.fontSize;
	let wordFontSize = wordStyle.fontSize;
	if (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) {
		wordFontSize = useFontWidth ? `${(1/fontWidth).toFixed(2)}em` : '1em';;
		pinyinFontSize = useFontWidth ? `${(1/fontWidth).toFixed(2)}em` : '1em';
	} else {
		wordFontSize += 'pt';
		pinyinFontSize += 'pt';
	}

	return `
		<span class="py-item">
			<span class="py-pinyin" style="font-size:${pinyinFontSize}">
				<span
					contenteditable="true"
					class="py-wrap ${showPinyin ? "" : 'hide-remain'}"
					style="color:${pinyinStyle.color}; font-family:${pinyinStyle.fontFamily}"
					>
					${wrapper(data.pinyin, options)}
				</span>
				${
					isPreview ? '' : `
					<div id="POLYPHONE" class="pys-chooser ${ showSelectIcon ? "" : "hide"}">
						<span class="py-down">${decorationSvgs.pys_tips}</span>
						<span class="py-masks pysChooser"></span>
					</div>`
				}
			</span>
			<span class="py-word" style="font-size:${wordFontSize}">
					<span
						style="color:${wordStyle.color};font-family:${wordStyle.fontFamily}"
					>
						<span class="${(showWord || data.type !== 1)  ? "" : 'hide-remain'}" >${data.word}</span>
					${
						isPreview ? '' :
						`
						<input type="text"
							class="py-word-input ${showInput ? "" : 'hide'}"
							autocomplete="off" style="font-size:1em">
						`
					}
					</span>
				</span>
		</span>`;
}

const getWidth =  (wordFontSize, pinyinFontSize) => {
	const renewMinWidth = 10;
	return Math.max(wordFontSize, pinyinFontSize, renewMinWidth);
}

const wrapper = (str, options) => {
	const { pinyinType: type, markTone } = options;
	if (type === 1) {
		str = firstUp(str);
	} else if (type === 2) {
		str = str.toUpperCase();
	}
	return markTone ? str : removeTone(str);
};

const firstUp = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generatepolyphonePop = (config, index, pinyinEle) => {
	let { data, options } = config;
	data = data[index - 1];
	const editContent = document.body.querySelector("#EDITCONTENT");
	const children = editContent.children[0];
	let pop = polyphonePop(data.pysData, index, pinyinEle, options);
	pop && children.appendChild(parseDom(pop)[0]);
}

const polyphonePop = (pysData, index, pinyinEle, options) => {
	const container = document.body.querySelector(".py-border");
	let left = container.offsetLeft;
	let top = container.offsetTop;
	const {x, y} = pinyinEle.getBoundingClientRect();
	return`<div class="popOut_pys pysChooser" data-index="${index}" style="left: ${x - left + 4}px; top: ${y - top}px;">
			${pysData.map(item => `<div class="pys">${wrapper(item, options)}</div>`).join('')}
		</div>`;
}

export const generatepolyphonePop4UPDown = (event, config, index) => {
	let { data, options } = config;
	data = data[index - 1];
	const editContent = document.body.querySelector("#EDITCONTENT");
	const children = editContent.children[0];
	let pop = polyphonePop4UPDown(data.pysData, event, index, options);
	pop && children.appendChild(parseDom(pop)[0]);
}

const polyphonePop4UPDown = (pysData, event, index, options) => {
	const container = document.body.querySelector(".py-border");
	let left = container.offsetLeft;
	let top = container.offsetTop;
	const target = getUpELement(event.target, "py-word", "py-edit-content").querySelector(".pys-chooser");
	if(!target) 
		return;
	const {x, y} = target.getBoundingClientRect();
	return`<div class="popOut_pys pysChooser" data-index="${index}" style="left: ${x - left + 4}px; top: ${y - top}px;">
			${pysData.map(item => `<div class="pys">${wrapper(item, options)}</div>`).join('')}
		</div>`;
}

export const polyphoneSelect = (e, config) => {
	const pinyin = e.target.innerHTML;
	const item = getUpELement(e.target, "popOut_pys", "py-edit-content");
	let index = +item.getAttribute("data-index");
	// 更新data
	config.data[index - 1].pinyin = pinyin;
	updateRender(index, pinyin);
}

const updateRender = (index, pinyin) => {
	let updateElement =null;
	const editContent = document.body.querySelector("#EDITCONTENT");
	// 修改dom
	let item = editContent.children[0].children;
	for(let i = 0; i< item.length; i++) {
		if(+index === i) {
			updateElement = item[i];
			break;
		}
	}
	updateElement.querySelector(".py-wrap").innerHTML = pinyin;
	// 删除弹框
	const children = editContent.children[0];
	const delItem = children.querySelector(".popOut_pys");
	delItem && children.removeChild(delItem);
}
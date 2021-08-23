import { decorationSvgs } from "./utils/svg_constants";
import { editContainer, addContainer, generatepolyphonePop, generatepolyphonePop4UPDown, polyphoneSelect } from "./content";
import { getNode, getFontSiezList, getFontFamilyList, getFontColorList, isPromise, getWordNameByValue, getWordNameByValue4PY } from "./utils/utils";
import { getPinYin, getSymbol, getMixin } from "./utils/generate";
import { createContainer, insertAfter, getUpELement, removeContainer, otherDomUpdate } from "./utils/dom";
import { containerId, FONTSIZEDEFAULT, EMRANGE, PTRANGE } from "./data";

let isComposing: boolean = false;
let isPending: boolean = false;
const defaultConfig = {
	data: [],
	options: {
		wordType: 0, // 上下,左右,四线三格，田字格，组合等
		pinyinType: 0, // 1 - 标准，2 - 首字母大写，3 - 大写
		fontWidth: 2, // 文字相对宽度
		useFontWidth: false, // 是否使用字体宽度
		wordStyle: {
			show: true,
			fontSize: "默认",
			fontFamily: "inherit",
			color: "inherit",
		}, // 字体、大小、字色、显示汉字
		pinyinStyle: {
			show: true,
			fontSize: "默认",
			fontFamily: "inherit",
			color: "inherit",
		}, // 字体、大小、字色、标注声调、显示拼音，u是否去点
		showWord: true,
		showPinyin: true,
		markTone: true,
		uKeepPoint: true,
	},
};
let config: any = {};
let _onSubmit = undefined;
let _defaultOptions = {};
let _pyFontFamilys = [];
let _wordFontFamilys = [];

const IDs = {
	OTHERBASICCONTROL: "OTHERBASICCONTROL",
	SHOWWORD: "SHOWWORD",
	SHOWPINYIN: "SHOWPINYIN",
	MARKTONE: "MARKTONE",
	UKEEPPOINT: "UKEEPPOINT",

	CLEAR: "CLEAR",
	RESET: "RESET",

	BASICCONTROL: "BASICCONTROL",
	UPDOWN: "UPDOWN",
	LEFTRIGHT: "LEFTRIGHT",
	FOURLINE: "FOURLINE",
	SQUARE: "SQUARE",
	COMBINE: "COMBINE",

	FORM: "FORM",
	FIRSTUP: "FIRSTUP",
	ALLUP: "ALLUP",

	EDITCONTENT: "EDITCONTENT",

	STYLEBASICCONTROL: "STYLEBASICCONTROL",
	PINYINFONTSTYLE: "PINYINFONTSTYLE",
	PINYINFONTSIZE: "PINYINFONTSIZE",
	PINYINFONTCOLOR: "PINYINFONTCOLOR",

	ERRORMSG: "ERRORMSG",

	WORDFONTSTYLE: "WORDFONTSTYLE",
	WORDFONTSIZE: "WORDFONTSIZE",
	WORDFONTCOLOR: "WORDFONTCOLOR",
	USEFONTWIDTH: "USEFONTWIDTH",

	BLACKFONT: "BLACKFONT",
	REDFONT: "REDFONT",

	BLACKPINYIN: "BLACKPINYIN",
	REDPINYIN: "REDPINYIN",

	CANCEL: "CANCEL",
	SUBMIT: "SUBMIT",
};

let getSelectList = undefined;

export default function generate({data = defaultConfig, onSubmit = () => {}, 
	pyFontFamilys,
	wordFontFamilys,
	pyFontSizes,
	wordFontSizes,
	wordColors, 
	pyColors
}) {
	config = JSON.parse(JSON.stringify(data));
	_onSubmit = onSubmit;
	_defaultOptions = JSON.parse(JSON.stringify(config.options));
	_wordFontFamilys = wordFontFamilys;
	_pyFontFamilys = pyFontFamilys;
	// 0.创建容器
	createContainer();
	// 设置下拉框模板
	getSelectList = _getSelectList(pyFontFamilys, wordFontFamilys, pyFontSizes, wordFontSizes, wordColors, pyColors);
	// 1.初始化基本数据
	document.querySelector(`#${containerId}`).innerHTML = `
	<div class="py-mask">
		<div class="py-border">
			<div class="py-title">学科工具拼音</div>
			<div class="py-top-bar-main">
				<div id="${IDs.OTHERBASICCONTROL}" class="py-other-basic-control">
					<div>${topOptions(config)}</div>
					<div>
						<div id="${IDs.CLEAR}" class="py-clear-btn py-line-item-btn">
							<span>${decorationSvgs.clear}</span>
							<span>清除</span>
						</div>
						<div id="${IDs.RESET}" class="py-reset-btn py-line-item-btn">
							<span>${decorationSvgs.reset}</span>
							<span>重置</span>
						</div>
					</div>
				</div>
				<div id="${IDs.BASICCONTROL}" class="py-basic-control">
					<div>
						${wordOptions(config)}
					</div>
					<div>
						${pinyinOptions(config)}
					</div>
				</div>
			</div>
			<div id="${IDs.EDITCONTENT}" class="py-edit-content">
				${editContainer(config)}
			</div>
			<div id="${IDs.ERRORMSG}">
			</div>
			<div class="py-footer">
				<div id=${IDs.STYLEBASICCONTROL} class="py-panel">
					${panel(config)}
				</div>
				<div>
					<button id="${IDs.CANCEL}" class="py-cancel-btn">取消</button>
					<button id="${IDs.SUBMIT}" class="py-ok-btn">确认</button>
				</div>
			</div>
		</div>
	</div>
    `;
	// 2.监听事件
	addEventAgent();
}


const topOptions = (config): string => {
	const { showWord, showPinyin, markTone, wordType } = config.options;
	const checkedSvgs = decorationSvgs.checked;

	return `
	${
		wordType === 2 ? "" : 
		`<div id=${IDs.SHOWWORD} class="py-line-item py-line-item-btn">
			<span class='py-checkbox ${showWord ? "checked" : ""}'>${checkedSvgs}</span>
			<span class='py-tab'>显示汉字</span>
		</div>`
	}
	${
		wordType === 3 ? "" : 
		`<div id=${IDs.SHOWPINYIN} class="py-line-item py-line-item-btn">
			<span class='py-checkbox ${showPinyin ? "checked" : ""} '>${checkedSvgs}</span>
			<span class='py-tab'>显示拼音</span>
		</div>`
	}
	${
		wordType === 3 ? "" : 
		`<div id=${IDs.MARKTONE} class="py-line-item py-line-item-btn">
			<span class='py-checkbox ${markTone ? "checked" : ""} '>${checkedSvgs}</span>
			<span class='py-tab'>标注音调</span>
		</div>`
	}
	`
    ;
};

const wordOptions = (config): string => {

	const { wordType } = config.options;
	const { up_down, left_right, four_line, square, combine } = decorationSvgs;
	return `
	<div id="${IDs.UPDOWN}" data-value="0" class="py-list-item ${wordType === 0 ? 'active': ''}">
		<span class="py-low1">${up_down}</span>
		<span>拼音上下</span>
	</div>
	<div id="${IDs.LEFTRIGHT}" data-value="1" class="py-list-item  ${wordType === 1 ? 'active': ''}">
		<span class="py-low1">${left_right}</span>
		<span>拼音左右</span>
	</div>
	<div id="${IDs.FOURLINE}" data-value="2" class="py-list-item ${wordType === 2 ? 'active': ''}">
		<span class="py-low2">${four_line}</span>
		<span>四线三格</span>
	</div>
	<div id="${IDs.SQUARE}" data-value="3" class="py-list-item ${wordType === 3 ? 'active': ''}">
		<span class="py-low2">${square}</span>
		<span>田字格</span>
	</div>
	<div id="${IDs.COMBINE}" data-value="4" class="py-list-item ${wordType === 4 ? 'active': ''}">
		<span>${combine}</span>
		<span>组合形式</span>
	</div>`;
};

const pinyinOptions = (config): String => {
	const { pinyinType } = config.options;
	const { form_font, first_upper_font, all_upper_font } = decorationSvgs;

	return `
	<div id="${IDs.FORM}" data-value="0" class="py-list-item ${pinyinType === 0 ? 'active': ''}">
		<span class="py-low2">${form_font}</span>
		<span>标准样式</span>
	</div>
	<div id="${IDs.FIRSTUP}" data-value="1" class="py-list-item ${pinyinType === 1 ? 'active': ''}">
		<span class="py-low2">${first_upper_font}</span>
		<span>首字大写</span>
	</div>
	<div id="${IDs.ALLUP}" data-value="2" class="py-list-item ${pinyinType === 2 ? 'active': ''} last">
		<span class="py-low2">${all_upper_font}</span>
		<span>全大写</span>
	</div>`;
}

const panel = (config): string => {
	const { wordType } = config.options;
	return `<div class='${ wordType == 3 ? "py-hide-remain" : ""}'>${panel1(config)}</div>
	<div class='${ wordType == 2 ? "py-hide-remain" : ""}'>${panel2(config)}</div>`;
}

const panel1 = (config): string => {

	const { options: { pinyinStyle: { fontFamily, fontSize, color } } } = config;
	const { nabla, font } = decorationSvgs;

	return `
	<div>拼音样式</div>
	<div id=${IDs.PINYINFONTSTYLE} class='py-opt py-borders'>
		<span class='choice' style="width:50px">
			<span>${getWordNameByValue4PY(fontFamily, _pyFontFamilys)}</span>
		</span>
		<span class='py-down'>${nabla}</span>
		<div class ='pinyinFamilyPanel style-select hide'>${getSelectList(IDs.PINYINFONTSTYLE)}</div>
	</div>
	<div id=${IDs.PINYINFONTSIZE} class='py-opt py-borders'>
		<span class='choice' style="width:50px">
			<span>${fontSize}</span>
		</span>
		<span class='py-down'>${nabla}</span>
		<div class ='pinyinSizePanel style-select hide'>${getSelectList(IDs.PINYINFONTSIZE)}</div>
	</div>
	<div id=${IDs.PINYINFONTCOLOR} class='py-opt'>
		<span class='choice'>
			${font}
			<span class='box' style="background: ${color};"></span>
		</span>
		<span class='py-down'>${nabla}</span>
		<div class ='pinyinColorPanel style-select hide'>
			${getSelectList(IDs.PINYINFONTCOLOR)}
		</div>
	</div>
	`;
};


const panel2 = (config): string => {

	const { options: { wordStyle: { fontFamily, fontSize, color }, fontWidth, useFontWidth, wordType } } = config;
	const { nabla, font, checked } = decorationSvgs;

	return `
	<div>汉字样式</div>
	<div id=${IDs.WORDFONTSTYLE} class='py-opt py-borders'>
		<span class='choice' style="width:50px">
			<span>${getWordNameByValue(fontFamily, _wordFontFamilys)}</span>
		</span>
		<span class='py-down'>${nabla}</span>
		<div class ='fontFamilyPanel style-select hide'>${getSelectList(IDs.WORDFONTSTYLE)}</div>
	</div>
	<div id=${IDs.WORDFONTSIZE} class='py-opt py-borders'>
		<span class='choice' style="width:50px">
			<span>${fontSize}</span>
		</span>
		<span class='py-down'>${nabla}</span>
		<div class ='fontSizePanel style-select hide'>${getSelectList(IDs.WORDFONTSIZE)}</div>
	</div>
	<div id=${IDs.WORDFONTCOLOR} class='py-opt'>
		<span class='choice'>
			${font}
			<span class='box' style="background: ${color};"></span>
		</span>
		<span class='py-down'>${nabla}</span>
		<div class ='fontColorPanel style-select hide'>
			${getSelectList(IDs.WORDFONTCOLOR)}
		</div>
	</div>
	<div class="${wordType === 0 ? '' : 'hide'}" style="margin:0 8px" >字宽</div>
	<span id=${IDs.USEFONTWIDTH} class='py-checkbox ${useFontWidth ? "checked" : ""} ${wordType === 0 ? '' : 'hide'}'>${checked}</span>
	<div class="font-width-area ${wordType === 0 ? '' : 'hide'}"  style="width: 40px">
		<input type="number" value="${fontWidth}" />
	</div>
	`;
};

let _getSelectList = (pyFontFamilys, wordFontFamilys, pyFontSizes, wordFontSizes, wordColors, pyColors): Function => {

	const pyFamilyList = getFontFamilyList(2, pyFontFamilys);
	const pyFontSizeList = getFontSiezList(2, pyFontSizes);
	const pyfontColorList = getFontColorList(2, pyColors);
	const wordFamilyList = getFontFamilyList(1, wordFontFamilys);
	const wordfontSizeList = getFontSiezList(1, wordFontSizes);
	const wordfontColorList = getFontColorList(1, wordColors);

	return function(type: string): string {

		const selectListObj = {
			[IDs.PINYINFONTSTYLE]: pyFamilyList,
			[IDs.PINYINFONTCOLOR]: pyfontColorList,
			[IDs.PINYINFONTSIZE]: pyFontSizeList,
			[IDs.WORDFONTSTYLE]: wordFamilyList,
			[IDs.WORDFONTSIZE]: wordfontSizeList,
			[IDs.WORDFONTCOLOR]: wordfontColorList
		};
		return `<div>
			<ul>${selectListObj[type]}</ul>
		</div>`;
	}
};

const addEventAgent = () => {
	// 顶部
	document.getElementById(IDs.OTHERBASICCONTROL).addEventListener("click",(e) => { otherBasicControl(e) },false);

	// 基础内容
	document.getElementById(IDs.BASICCONTROL).addEventListener("click",(e) => {updateBasicControl(e);},false);

	// 输入区域
	addEditContetEventAgent();

	// 样式控制
	document.getElementById(IDs.STYLEBASICCONTROL).addEventListener('click', stylePanelClickHandle, false);
	document.getElementById(IDs.STYLEBASICCONTROL).addEventListener('change', e => {
		const {
			wordStyle: {fontSize: wordFontSize},
			pinyinStyle: {fontSize: pinyinFontSize},
		} = config.options;
		const range = (wordFontSize === FONTSIZEDEFAULT || pinyinFontSize === FONTSIZEDEFAULT) ? EMRANGE : PTRANGE;
		let { value = range[0] } = e.target;
		if(value > range[1] || value < range[0]) {
			value = value > range[1] ? range[1] : range[0];
			e.target.value = value;
		}
		// 更新data
		config.options.fontWidth = value;
		// 更新dom
		document.querySelector(".py-edit-content").innerHTML = editContainer(config);
	}, false);

	// 取消，确认
	document.getElementById(IDs.CANCEL).addEventListener("click",() => {
		removeContainer();
	},false);
	document.getElementById(IDs.SUBMIT).addEventListener("click", submitHandler,false);

};

const addEditContetEventAgent = () => {

	const editContent = document.body.querySelector(`#${IDs.EDITCONTENT}`);
	editContent.addEventListener("input",  (e) => {
		const { target, data = undefined, isComposing = true } = e;
		const { tagName = "" } = target;
		if (tagName === "SPAN") {
			const { innerText } = e.target;
			const index = getIndex(target);
			config.data[index - 1].pinyin = innerText;
		} else if (tagName === "INPUT" && data && !isComposing) {
			addValue(e, data, 2);
		}
	});

	editContent.addEventListener("compositionstart", e => {
		isComposing = true;
	});
	
	editContent.addEventListener("compositionend", e => {
		isComposing = false;
		const { target, data } = e;
		const { tagName = "" } = target;
		if (tagName !== "INPUT") {
			return;
		}

		// 默认在输入法下只可以输入汉字或者只可以输入拼音
		// 1.如果输入的是普通的字符
		const symbol = data.replace(/[\u4E00-\u9FA5]/g, '');
		if (symbol) {
			addValue(e, symbol, 2);
			return;
		}
		// 2.输入的内容是汉字
		const hanZi = data.replace(/[^\u4E00-\u9FA5]/g, '');
		if(hanZi) {
			addValue(e, hanZi, 1);
			return;
		}
		e.target.value = '';
	})

	editContent.addEventListener("paste",  (e) => {
		// 遍历然后动态生成数据，然后更改dom
		let data = (e.clipboardData || window.clipboardData).getData('text');
		e.preventDefault();
		if(data) {
			addValue(e, data, 3);
			return;
		}
		e.target.value = '';
	});

	// 多音字处理
	editContent.addEventListener("click" , e => {
		const { target } = e;
		// 1.判断是否点击的是子节点，如果是就不处理
		const innerClickElement = getUpELement(target, "popOut_pys", "py-edit-content");
		if(innerClickElement) {
			polyphoneSelect(e, config);
			return;
		}
		// 2.如果有展开的节点，清空节点
		const editContent = document.body.querySelector("#EDITCONTENT");
		const children = editContent.children[0];
		const delItem = children.querySelector(".popOut_pys");
		delItem && children.removeChild(delItem);
		if ([0, 4].includes(config.options.wordType)) {
			// 3.是否点击的是 上下的 多选拼音
			const pysEle = getUpELement(target, "pys-chooser", "py-edit-content");
			if(pysEle) {
				const index = getIndex(target);
				generatepolyphonePop(config, index, pysEle);
				return;
			}
			// TODO: 对点击文字的处理
			const pinyinEle = getUpELement(target, "py-wrap", "py-edit-content");
			if (pinyinEle) {
				return;
			}
		} else {
			// 3.5是否点击的是 左右的 多选拼音和icon
			const pysEle = getUpELement(target, "pys-chooser", "py-edit-content");
			if(pysEle) {
				const index = getIndex(target);
				generatepolyphonePop4UPDown(e, config, index);
				return;
			}
			// TODO: 点击竖板文字权限
			const pinyinEle = getUpELement(target, "py-wrap", "py-edit-content");
			if (pinyinEle) {
				return;
			}
		}
		// 4.如果点击的是文字和拼音
		const word = getUpELement(target, "py-item", "py-edit-content");
		if(word) {
			word.querySelector("input").focus();
			return;
		}
		// 5.如果点击的是第一个input
		const input = getUpELement(target, "py-first-input", "py-edit-content");
		if(input) {
			input.focus();
			return;
		}
		// 6.点击剩余区域
		const inputs = editContent.querySelectorAll("input")
		inputs[inputs.length - 1].focus();
	}, false);

	editContent.addEventListener("keydown", (e) => {
		const { key = "", target: { id, tagName } } = e as any;
		if (tagName === "INPUT" && !isComposing) {
			if (key === "Backspace" && id !== "input--1") {
				const item = getUpELement(e.target, "py-item", "py-edit-content");
				const prev = item.previousElementSibling;
				// 更新数据
				const index = getIndex(e.target);
				config.data.splice(index - 1, 1);
				otherDomUpdate(config);
				// 删除当前元素
				item.parentNode.removeChild(item);
				if(prev.tagName === "INPUT") {
					prev.focus();
					return;
				}
				let prevInput = prev.querySelector("input");
				prevInput && prevInput.focus();
			} else if (key === "ArrowLeft") {
				const item = getUpELement(e.target, "py-item", "py-edit-content");
				// 上一个获取焦点
				const prevEle =  item.previousElementSibling;
				if(prevEle && prevEle.tagName === "INPUT") {
					prevEle.focus();
					return;
				}
				prevEle.querySelector("input").focus();
			} else if (key === "ArrowRight") {
				if(id === "input--1") {
					e.target.nextElementSibling.querySelector("input").focus();
					return;
				}
				const item = getUpELement(e.target, "py-item", "py-edit-content");
				// 下一个获取焦点
				item.nextElementSibling.querySelector("input").focus();
			}
		}
	}, false);	
}


const otherBasicControl = (e) => {

	const { target } = e;
	const item = getUpELement(target, "py-line-item-btn", "py-other-basic-control");
	if(!item) {
		return;
	}
	const { id } = item;
	if(id === IDs.RESET) {
		config.options = JSON.parse(JSON.stringify(_defaultOptions));
		// 更新顶部样式
		document.getElementById(IDs.OTHERBASICCONTROL).children[0].innerHTML = topOptions(config);
		// 更新拼音样式
		document.getElementById(IDs.BASICCONTROL).children[0].innerHTML = wordOptions(config);
		// 更新字体样式
		document.getElementById(IDs.STYLEBASICCONTROL).innerHTML = panel(config);
		// 更新内容
		document.querySelector(".py-edit-content").innerHTML = editContainer(config);
		return;
	}
	if(id === IDs.CLEAR) {
		if (config.data.length > 0) { // 更新内容
			config.data = [];
			document.querySelector(".py-edit-content").innerHTML = editContainer(config);
		}
		return;
	}
	clickHandler(id);
}


function clickHandler(id) {
	const { showWord, showPinyin, markTone } =
		config.options;
	switch (id) {
		case IDs.SHOWWORD:
			config.options.showWord = !showWord;
			break;
		case IDs.SHOWPINYIN:
			config.options.showPinyin = !showPinyin;
			break;
		case IDs.MARKTONE:
			config.options.markTone = !markTone;
			break;
		case IDs.RESET:
			break;
	}

	document.querySelector("#"+id).firstElementChild.classList.toggle("checked");
	document.querySelector(".py-edit-content").innerHTML = editContainer(config);
}

const clearSelected = (list) => {
	list.forEach((id) => {
		document.querySelector("#" + id).classList.remove("active");
	});
};

function updateBasicControl(e) {
	const node = getNode(e);
	const id = node.id;
	const value = node.getAttribute("data-value");
	if (
		id !== IDs.BASICCONTROL &&
		!node.classList.contains("active") &&
		!node.classList.contains("disable")
	) {
		const list = [
			IDs.UPDOWN,
			IDs.LEFTRIGHT,
			IDs.FOURLINE,
			IDs.SQUARE,
			IDs.COMBINE,
		];
		const list2 = [IDs.FORM, IDs.FIRSTUP, IDs.ALLUP];
		if (list.includes(id)) {
			config.options.wordType = +value;
			clearSelected(list);
		} else {
			config.options.pinyinType = +value;
			clearSelected(list2);
		}
		document.querySelector("#" + id).classList.add("active");
		document.querySelector(".py-edit-content").innerHTML = editContainer(config);
		if (list.includes(id)) {
			const { wordType } = config.options;
			// 更新顶部样式
			document.getElementById(IDs.OTHERBASICCONTROL).children[0].innerHTML = topOptions(config);
			// 更新字体样式
			document.getElementById(IDs.STYLEBASICCONTROL).innerHTML = panel(config);
		}
	}
}

const typeFunc = {
	1: getPinYin,
	2: getSymbol,
	3: getMixin
}

function addValue(e, value, type) {
	const { target } = e;
	// 2.将汉字转化成对应的数据格式
	let pinyin = typeFunc[type](value);
	// 3.更新数据
	updateData(target, pinyin);
	// 4.更新dom
	updateChild(target, pinyin);
	// 5.清空默认值
	e.target.value = '';
	// 6.激活对应位置的光标
	updateFocus(target, pinyin.length);
}

const updateData = (target, pinyin) => {
	if ([...target.classList].includes("py-first-input")) { // 第一个input
		config.data.splice(0,0, ...pinyin);
	} else {
		const index = getIndex(target);
		config.data.splice(index, 0, ...pinyin);
	}
	otherDomUpdate(config);
}

const updateChild = (target, pinyin) => {
	
	const newElement = addContainer({
		data:pinyin,
		options: config.options
	});
	if(target.id === "input--1") {
		// 根据不同的布局类型增加不同的页面结构
		insertAfter(newElement, target);
	} else {
		const item = getUpELement(target, "py-item", "py-edit-content");
		insertAfter(newElement, item);
	}
}

const updateFocus = (target, length) => {
	if ([...target.classList].indexOf("py-first-input") !== -1) { // 第一个input
		document.getElementById("EDITCONTENT").querySelectorAll("input")[length].focus();
	} else {
		let item = getUpELement(target, "py-item", "py-edit-content");
		while(length--) {
			item = item.nextElementSibling;
		}
		item.querySelector("input").focus();
	}
}

const getIndex = (target) => {
	const editContent = document.body.querySelector(`#${IDs.EDITCONTENT}`);
	const children = editContent.children[0].children;
	const item = getUpELement(target, "py-item", "py-edit-content");
	let index = -1;
	for(let i = 0; i < children.length; i++) {
		if(children[i] === item) {
			index = i;
			break;
		}
	}
	return index;
}

// 面板点击事件
const stylePanelClickHandle = (e) => {
	e.stopPropagation()
	// 1.是否是字宽控制
	const { target } = e;
	const item = getUpELement(target, "py-checkbox", "py-panel");
	if(item) {
		const { id } = item;
		config.options.useFontWidth = !config.options.useFontWidth;
		document.querySelector("#"+id).classList.toggle("checked");
		document.querySelector(".py-edit-content").innerHTML = editContainer(config);
		return;
	}
	const node = getUpELement(e.target, "li", "py-panel");
	if(!node) {
		return;
	}

	// 1.获取被点击的元素的innerHtml
	const name = node.getAttribute('data-name');
	// 获取父节点，根据对应id获取type，然后根据对应type更新对应值，更新页面dom，更新content的dom
	const typeNode = getUpELement(e.target, "py-opt", "py-panel");
	if(!typeNode) {
		return;
	}
	let selectChange = false;
	const { pinyinStyle, wordStyle } = config.options;
	switch (typeNode.id) {
		case IDs.PINYINFONTSTYLE:
			if (pinyinStyle.fontFamily !== name) {
				pinyinStyle.fontFamily = name;
				selectChange = true;
			}
			break;
		case IDs.PINYINFONTSIZE:
			if (pinyinStyle.fontSize != name) {
				let oldVal = pinyinStyle.fontSize;
				pinyinStyle.fontSize = name;
				selectChange = true;
				fontSizeTypeChange(name, oldVal);
			}
			break;
		case IDs.PINYINFONTCOLOR:
			if (pinyinStyle.color !== name) {
				pinyinStyle.color = name;
				selectChange = true;
			}
			break;
		case IDs.WORDFONTSTYLE:
			if (wordStyle.fontFamily !== name) {
				wordStyle.fontFamily = name;
				selectChange = true;
			}
			break;
		case IDs.WORDFONTSIZE:
			if (wordStyle.fontSize != name) {
				let oldVal = wordStyle.fontSize;
				wordStyle.fontSize = name;
				selectChange = true;
				fontSizeTypeChange(name, oldVal);
			}			
			break;
		case IDs.WORDFONTCOLOR:
			if (wordStyle.color = name) {
				wordStyle.color = name;
				selectChange = true;
			}	
			break;
		default:
			break;
	}
	function fontSizeTypeChange(newVal, prevVal) {
		if (newVal === FONTSIZEDEFAULT || prevVal === FONTSIZEDEFAULT) {
			// 切换到默认模式
			pinyinStyle.fontSize = newVal;
			wordStyle.fontSize = newVal;
		}
		config.options.fontWidth = newVal === FONTSIZEDEFAULT ? 2 : 30;
	}
	// 更新拼音样式
	document.getElementById(IDs.STYLEBASICCONTROL).innerHTML = panel(config);
	// 更新拼音
	selectChange && (document.querySelector(".py-edit-content").innerHTML = editContainer(config));
}

const submitHandler = () => {
	isPending = true;
	const { data } = config;
	if (!data.length) {
		document.getElementById(IDs.ERRORMSG).innerHTML ="<span class='error-msg'>老师，请输入内容</span>";
		isPending = false;
	}
	if( _onSubmit && typeof _onSubmit === 'function') {
		const res = _onSubmit({
			data: config,
			html: editContainer(config, true),
		})
		if(isPromise(res)) {
			res.then(res => {
				res !== false && removeContainer();
			})
			.finally(() => {
				isPending = false;
			});
		} else {
			console.log("参数异常");
			isPending = false;
		}
	} else {
		console.log("参数异常");
		isPending = false;
	}
};
import { pyFontFamilys, wordFontFamilys, pyFontSizes, wordFontSizes, wordColors, pyColors } from "../data";
export const getNode = (e) => {
	let node = e.target;
	while (!node.id) {
		node = node.parentNode;
	}
	return node;
};

/**
 * 
 * @param type {1:汉字 2:拼音}
 * @returns 
 */

export const getFontFamilyList = (type = 1, config) => {
	const select = config || (type === 1 ? wordFontFamilys : pyFontFamilys);
	let temp = "";
	for (let item of select) {
		temp += `<li data-name="${item.value}" class="size">${item.label}</li>`;
	}
	return temp;
};

/**
 * 
 * @param type {1:汉字 2:拼音}
 * @returns 
 */

export const getFontSiezList = (type = 1, config) => {
	const list = config || (type === 1 ? wordFontSizes : pyFontSizes);
	let temp = "";
	for (let item of list) {
		temp += `<li data-name="${item.value}" class="size">${item.label}</li>`;
	}
	return temp;
};


/**
 * 
 * @param type {1:汉字 2:拼音}
 * @returns 
 */

export const getFontColorList = (type = 1, config) => {

	const select = config || (type === 1 ? wordColors : pyColors);
	let temp = "";
	for (let item of select) {
		temp += `<li data-name="${item.value}"><span style='background:${item.value}' class='color-box'></span>${item.label}</li>`;
	}
	return	temp;
}

export const getWordNameByValue = (value, list) => {
	list = (list || wordFontFamilys).filter(item => (item.value === value || item.label === value) );
	return (list.length > 0 || '') && list[0].label;
}

export const getWordNameByValue4PY = (value, list) => {
	list = (list || pyFontFamilys).filter(item => (item.value === value || item.label === value) );
	return (list.length > 0 || '') && list[0].label;
}

export const isPromise = func => {
	return func && typeof func.then === 'function' && typeof func.catch === 'function';
}
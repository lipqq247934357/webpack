import { pinyin as generate } from "pinyin-pro";

export const getPinYin = (str): Object[] => {
	const list = [];
	const pinyins = generate(str).split(" ");
	for (let i = 0; i < str.length; i++) {
		let word = str[i];
		const pinyin = generate(word, { multiple: true, type: "array" });
		list.push({
			word,
			pinyin: pinyins[i],
			pysData: pinyin.length > 1 ? pinyin : [],
			type: 1,
		});
	}
	return list;
};

const specialMark = ["…", "—"];

export const getSymbol = (str): Object[] => {
	const list = [];
	const length = str.length;
	for (let i = 0; i < str.length; i++) {
		let mark = str[i];
		if (specialMark.includes(mark) && i < length - 1) {
			for (let item of specialMark) {
				if (mark === item && str[i + 1] === item) {
					// 对 …… 和 —— 的特殊处理
					list.push({
						pinyin: "",
						pysData: [],
						type: 2,
						word: mark.repeat(2),
					});
					i++;
					break;
				}
			}
		} else {
			list.push({
				pinyin: "",
				pysData: [],
				type: 2,
				word: mark,
			});
		}
	}
	return list;
};

let word = /([\u4E00-\u9FA5]+)/;

export const getMixin = (str) => {
	const arr: string[] = format(str);
	const list = [];
	let index = 0;
	if (!word.test(arr[0])) {
		// 不是以汉字开头
		arr.unshift("");
		index++;
	}

	for (; index < arr.length; index++) {
		if (index % 2 === 0) {
			list.push(...getPinYin(arr[index]));
		} else {
			list.push(...getSymbol(arr[index]));
		}
	}
	return list;
};

const format = (str): string[] => {
	return str.split(word).filter((item) => item.length);
};

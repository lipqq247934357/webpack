import { containerId } from "../data";

export const createContainer = () => {
	if(!document.getElementById(containerId)) {
		const container = parseDom(`<div id="${containerId}" class="pinyin"></div>`);
		document.body.appendChild(container[0]);
	}
};

export const insertAfter = (newElement, targetElement) => {
	newElement = parseDom(newElement);
    const parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
		let len = newElement.length;
		for(let i = 0; i < len;  i++) {
			parent.appendChild(newElement[0]);
		}
    } else {
		for(let i = newElement.length; i > 0;  i--) {
			parent.insertBefore(newElement[i - 1], targetElement.nextSibling);
		}
    }
}

export const parseDom = (arg) => {
　　 const objE = document.createElement("div");
　　 objE.innerHTML = arg;
　　 return objE.childNodes;
};

export const getUpELement = (currentEle: any, targetClassOrTagname: string, endEleClassOrTagment: string): Element | null => {
	const classList = currentEle.classList.value.trim().split(' ')
	const tagName = currentEle.tagName.toLocaleLowerCase()
	if (classList.includes(targetClassOrTagname) ||tagName === targetClassOrTagname) return currentEle
	else if (classList.includes(endEleClassOrTagment) ||tagName === targetClassOrTagname||tagName ==='body') return null
	else return getUpELement(currentEle.parentNode as Element, targetClassOrTagname, endEleClassOrTagment)
}


export const removeContainer = () => {
	document.getElementById(containerId).innerHTML = "";
};

export const otherDomUpdate = config => {
	const { data, options: { wordType, pinyinStyle: { fontSize } }} = config;
	const input0 = document.getElementById("input--1");
	input0.setAttribute("placeholder", data.length ? "" : "请输入文字~");
	data.length && (document.getElementById("ERRORMSG").innerHTML = "");
	// 更新input宽度
	const input = document.body.querySelector("#input--1");
	input.style.width = (data.length ? "10px" : "8em");
	wordType === 0 && (input.style.marginTop = (data.length ? (+fontSize * 2 - 3 + "px") : 0));
}
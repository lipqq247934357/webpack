import { ScalarType } from './interface'
import { compress } from 'compress-json'
const TYPE_NORMAL = 'normal'
const TYPE_LINE = 'line'
const TYPE_DIVISION = 'division'

enum VALUE_TYPE {
  EMPTY = "EMPTY",
  STAR = "STAR",
  TRIANGLE = "TRIANGLE",
  NUM = "NUM",
  SIGN = "SIGN"
}
enum SIGNS {
  ADD = "+",
  SUB = "-",
  MUTIPLE = "*",
  DIVISION = "/"
}


// 默认配置不暴露的
const _spacingX = 10,
  _spacingY = 10,
  cellWidth = 25,
  cellHeight = 25,
  strokeColor = 'black',
  strokeWidth = 1,
  accRecWidth = 10,
  accRecHeight = 10,
  accFontSize = 12,
  lendBoxWidth = 8,
  lendBoxHeight = 8,
  decimalBoxWidth = 8,
  decimalBoxHeight = 8,
  svgPadding = 20


const getSignPath = (type: SIGNS, fill): string => {

  switch (type) {
    case SIGNS.ADD:
      return ` 
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19 11.4823L19 12.4999L12.5354 12.553L12.5177 19.0354H11.5L11.4823 12.553L5 12.4999L5.0354 11.4823L11.5 11.5177V5.05308L12.5 5.0354L12.5531 11.5177L19 11.4823Z" fill="${fill}"/>
        `
    case SIGNS.SUB:
      return `
        <path d="M19.0354 12.5L19 11.5H5.03541L5.0354 12.5H19.0354Z" fill="${fill}"/>
       `
    case SIGNS.MUTIPLE:
      return `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5586 6.69458L17.2782 7.41417L12.7446 12.0229L17.3158 16.6191L16.5962 17.3388L11.9999 12.7675L7.3787 17.3137L6.68414 16.569L11.2804 12.0229L6.70918 7.45176L7.40379 6.73215L12.025 11.2783L16.5586 6.69458Z" fill="${fill}"/>
        `
  }
}
const getTextInnerHtml = <T>(config): T | string => {
  const { id, fill, x, y, type, value } = config
  const textContainer =
    (s: string): string => `<text
              class='cell'
              id='${id}'
              fill='${fill}'
              text-anchor='middle'
              alignment-baseline="middle" 
              style="font-size:22px;"
              x="${x}"
              y="${y + 2}">${s}</text>`
  const svgContainer = (value) => `<svg class='cell' width='26' height='26' x='${x - 13}' y='${y - 13}'>${getSignPath(value, fill)}</svg>`
  if (type == VALUE_TYPE.EMPTY) return ''
  else if (type == VALUE_TYPE.NUM) return textContainer(value)
  else if (type == VALUE_TYPE.SIGN) return svgContainer(value)
  else if (type == VALUE_TYPE.STAR) return textContainer('★')
  else if (type == VALUE_TYPE.TRIANGLE) return textContainer('▲')
  else return ''
}
const getSvg = (data: ScalarType, exp: string, verbose: boolean = true) => {
  const { rowLen, rows, showBorder, showAcc, showLend, spacing } = data
  const spacingX = spacing || _spacingX
  const spacingY = spacing || _spacingY
  const boxWidth = cellWidth + spacingX
  let colLen = 0
  let content = ``
  let currentHeight = 0

  const renderCell = (offsetX: number, currentHeight: number, cell: { id: any; border: any; text: any; accumulate: any; lend: any; decimal: any }) => {
    const { id, border, text, accumulate, lend, decimal } = cell
    const { visible: borderVisible, color: borderColor, fill: borderFill } = border
    const { font: textFont, type: textType, value: textValue } = text
    const { visible: accVisible, value: accValue, font: accFont, border: accBorder } = accumulate
    const { visible: lendVisible, fill: lendFill } = lend
    const { visible: decimalVisible, fill: decimalFill } = decimal

    return `<rect 
              class='cell cell-box'
              id='${id}'
              x="${offsetX}" 
              y="${currentHeight}"
              width="${cellWidth}" 
              height="${cellHeight}"
              stroke="${borderColor || strokeColor}"
              fill="${borderFill}"
              stroke-width="${strokeWidth}" 
              style="
            ${(showBorder || borderVisible) && (textType !== "EMPTY") ? "" : `opacity:0`}
              " />`
      + // 单元格中文本
      getTextInnerHtml({
        id: id,
        type: textType,
        value: textValue,
        fill: textFont.color || strokeColor,
        x: offsetX + cellWidth / 2,
        y: currentHeight + cellHeight / 2
      })
      + // 进位符号
      `
              <rect
              class='acc acc-box'
              id='${id}'
              style="${(showAcc || accVisible) && accBorder.visible ? "" : "opacity:0;"}"
              x="${offsetX + cellWidth + spacingX / 2 - accRecWidth / 2}"
              y="${currentHeight + cellHeight + spacingY / 2 - accRecHeight / 2}"
              width="${accRecWidth}"
              height="${accRecHeight}"
              stroke="${accBorder.color}"
              fill="${accBorder.fill}"
              ></rect>
              <text
              class='acc'
              id='${id}'
              style="${(accVisible || showAcc) && accValue ? "" : "opacity:0;"} font-size:${accFontSize}px;fill:${accFont.color}"
              text-anchor="middle"
              alignment-baseline="middle"
              x="${offsetX + cellWidth + spacingX / 2}"
              y="${currentHeight + cellHeight + spacingY / 2 + 1}"
              >${accValue}</text>`

      +
      `<rect
              class='lend lend-box'
              id='${id}'
              x="${offsetX + cellWidth / 2 - lendBoxWidth / 2}"
              y="${currentHeight - spacingY / 2 - lendBoxHeight / 2}"
              width="${lendBoxWidth}"
              height="${lendBoxHeight}"
              fill='transparent'
             ></rect>
      ` + // 借位符号
      `<circle
              class='lend'
              id='${id}'
              style="${showLend && lendVisible ? "" : "display:none"}"
              cx="${offsetX + cellWidth / 2}"
              cy="${currentHeight - spacingY / 2}"
              r='${2}'
              fill="${lendFill}"></circle>
              `
      + // 小数点

      `<rect
              class='decimal decimal-box'
              id='${id}'
              x="${offsetX + cellWidth + spacingX / 2 - decimalBoxWidth / 2}"
              y="${currentHeight + cellHeight - 5 - decimalBoxWidth / 2}"
              width="${decimalBoxWidth}"
              height="${decimalBoxHeight}"
              fill='transparent'
             ></rect>`
      +
      `<circle
              class='decimal '
              id='${id}'
              style="${decimalVisible ? "" : "display:none"}"
              cx="${offsetX + cellWidth + spacingX / 2}"
              cy="${currentHeight + cellHeight - 5}"
              r='${1.2}'
              fill="${decimalFill}"></circle>
             `

  }

  rows.map((column: { from?: any; to?: any; children?: any; type?: any }) => {
    const { children, type } = column
    switch (type) {
      case TYPE_NORMAL:
        colLen++
        children.map((cell: any, x: number) => {
          const offsetX = x * boxWidth
          content += renderCell(offsetX, currentHeight, cell)
        })
        currentHeight += cellHeight + spacingY
        break
      case TYPE_LINE:
        content += `<line x1="${boxWidth * column.from}" y1="${currentHeight}"  x2="${boxWidth * column.to}" y2="${currentHeight}" stroke = "${strokeColor}" stroke-width ="${strokeWidth}" />`
        currentHeight += spacingY
        break
      case TYPE_DIVISION:
        //  <path xmlns="http://www.w3.org/2000/svg" d="M14.5 0 C14.5 22.5 15.939 29.3738 3 39.5" stroke="black"/>
        content += `<line  x1="${boxWidth * column.from}" y1="${currentHeight}"  x2="${boxWidth * column.to}" y2="${currentHeight}" stroke = "${strokeColor}" stroke-width ="${strokeWidth}" />
         <path d="M ${boxWidth * column.from} ${currentHeight}
          C ${boxWidth * column.from} ${currentHeight + 22.5} ${boxWidth * column.from + 1.5} ${currentHeight + 29.3} ${boxWidth * column.from - 8.5} ${currentHeight + 39.5} " stroke="black" fill="rgb(0,0,0,0)"/>
        `
        currentHeight += spacingY
        break
      default:
        break
    }
  })

  const width = rowLen * boxWidth + spacingX + accRecWidth + spacingX
  const height = colLen * (cellHeight + spacingY) + (rows.length - colLen) * spacingY + spacingY + accRecHeight + spacingY

  const w = `${width / 22}em`
  const h = `${height / 22}em`
  const html = `<svg
     version="1.1"
     baseProfile="full"
     width='${w}'
     height='${h}'
     viewBox = '-${svgPadding} -${svgPadding} ${width} ${height}'
     style='font-family: "Times New Roman", "思源黑体SC-Regular";'
     xmlns="http://www.w3.org/2000/svg">
      <!-- <![CDATA[${verbose ? JSON.stringify(data) : compress(data).join(',')}]]> -->
      <!-- <![EXP[${exp}]]> -->
      <!-- <![VERBOSE[${+verbose}]]> --> 
     ${content}
     </svg>`
  return {
    svg:verbose ? html : simplify(html),
    extra:{
      width:w,
      height:h 
    }
  }
}


const simplify = (html: string) => {
  document.body.insertAdjacentHTML('beforeend', `<div style="display:none" id='backup'>${html}</div>`)
  const svg = document.querySelector('#backup svg')
  const doms = Array.from(svg.children)
  for (const dom of doms) {
    const styles = document.defaultView.getComputedStyle(dom, null)
    const needDelete = styles.opacity == '0' || styles.display === 'none' || (dom.getAttribute('fill') == 'transparent' && dom.getAttribute('class') !== 'cell cell-box')
    if (needDelete)
      dom.remove()
  }
  const outerHTML = svg.outerHTML
  document.querySelector('#backup').remove()
  return outerHTML.replace(/\s{2,}/g, ' ')
}

export default getSvg
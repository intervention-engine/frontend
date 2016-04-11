export default function createStylesheet() {
  let style = document.createElement('style');
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);
  return style;
}

export function addCSSRule(sheet, selector, rules, index) {
  if ('addRule' in sheet) {
    sheet.addRule(selector, rules, index);
  } else if ('insertRule' in sheet) {
    sheet.insertRule(`${selector} { ${rules} }`, index);
  }
}

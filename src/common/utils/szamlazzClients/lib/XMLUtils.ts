import xml2js from 'xml2js';

export function pad(num: number, str = '  ') {
  let o = '';
  if (num > 0) {
    for (let i = 0; i < num; i++) {
      o = o + str;
    }
  }
  return o;
}

const xmlSubstChars = { '<': '&lt;', '>': '&gt;', '&': '&amp;' };
const xmlSubstRegexp = /[<>&]/g;
const replaceXMLChar = (chr: string) => xmlSubstChars[chr];

function escapeXMLString(str: string) {
  return str.replace(xmlSubstRegexp, replaceXMLChar);
}

export function wrapWithElement(name: any, data: any = null, indentLevel = 0) {
  indentLevel = indentLevel || Number(data) || 0;

  if (Array.isArray(name)) {
    return name
      .map((item) => wrapWithElement(item[0], item[1], indentLevel + 1))
      .join('');
  }

  let o = '';

  if (typeof data !== 'undefined' && data !== null) {
    o = pad(indentLevel) + '<' + name + '>';

    if (Array.isArray(data)) {
      o += '\n' + wrapWithElement(data, indentLevel) + pad(indentLevel, '  ');
    } else {
      if (data instanceof Date) {
        const y = data.getFullYear();
        const m =
          data.getMonth() + 1 < 10
            ? `0${data.getMonth() + 1}`
            : `${data.getMonth() + 1}`;
        const d =
          data.getDate() < 10 ? `0${data.getDate()}` : `${data.getDate()}`;

        o += y + '-' + m + '-' + d;
      } else {
        o += escapeXMLString(String(data));
      }
    }

    o += '</' + name + '>\n';
  }

  return o;
}

export function parseString(xml: xml2js.convertableToString): Promise<any> {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export async function xml2obj(
  xml: xml2js.convertableToString,
  objList: any,
): Promise<any> {
  const res = await parseString(xml);
  const hash = {};
  Object.keys(objList).forEach((keyPath) => {
    const path = keyPath.split('.');

    let found = true;
    let p = res;

    for (let i = 0; i < path.length; i++) {
      if (p.hasOwnProperty(path[i])) {
        console.log('>>', path[i]);
        p = p[path[i]];
      } else {
        found = false;
        break;
      }
    }

    if (found) {
      hash[objList[keyPath]] = p[0];
    }
  });

  return hash;
}

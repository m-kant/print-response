// https://logfetch.com/js-console-colors/

const hexs = {
  key: '#9cdcfe',
  num: '#b5cea8',
  bool: '#569cd6',
  str: '#ce9178',
  func: '#ffea76',
}

/** Simplfied analog of chalk */
const paint = {
  /** set text color in hex format */
  hex(hex:string, m: any, resetAtEnd = true) {
    const [r,g,b] = hexToRgb(hex);
    let formatted = `\x1b[38;2;${r};${g};${b}m` + String(m);
    if (resetAtEnd) formatted += '\x1b[39m'; // сбросить цвет текста
    return formatted;
  },
  /** set background color in hex format */
  bg(hex:string, m: any, resetAtEnd = true) {
    const [r,g,b] = hexToRgb(hex);
    let formatted = `\x1b[48;2;${r};${g};${b}m` + String(m);
    if (resetAtEnd) formatted += '\x1b[49m';
    return formatted;
  },
  reset(realy = true) { return realy ? '\x1b[0m' : ''; },
  key  (m: any, resetAtEnd?: boolean) { return this.hex(hexs.key,  m, resetAtEnd); },
  num  (m: any, resetAtEnd?: boolean) { return this.hex(hexs.num,  m, resetAtEnd); },
  bool (m: any, resetAtEnd?: boolean) { return this.hex(hexs.bool, m, resetAtEnd); },
  str  (m: any, resetAtEnd?: boolean) { return this.hex(hexs.str,  m, resetAtEnd); },
  func (m: any, resetAtEnd?: boolean) { return this.hex(hexs.func, m, resetAtEnd); },
  white(m: any, resetAtEnd?: boolean) { return this.hex('ffffff',  m, resetAtEnd); },
  gray (m: any, resetAtEnd?: boolean) { return this.hex('aaaaaa',  m, resetAtEnd); },
}


function hexToRgb(hex: string) {
  var bigint = parseInt(hex.replace(/^#/, ''), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}

export default paint;

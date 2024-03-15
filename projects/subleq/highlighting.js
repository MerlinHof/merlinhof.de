function updateEditor() {
  let code = document.getElementById('editorOverlay').innerText;
  code = code.replaceAll(String.fromCharCode(160), '&nbsp;');
  code = code.replaceAll('\n', '<br>');
  let strings = [];

  // Numbers
  for (let j = 0; j <= 9; j++) {
    code = code.replaceAll(j, "<font color='replaceWithNumberColor'>" + j + '</font>');
  }
  code = code.replaceAll('replaceWithNumberColor', '#272AD0');

  // Registers
  let registers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'sp'];
  for (let j = 0; j < registers.length; j++) {
    code = code.replaceAll(' ' + registers[j] + ',', " <font color='#C03E2A'>" + registers[j] + '</font>,');
    code = code.replaceAll(' ' + registers[j].toUpperCase() + ',', " <font color='#C03E2A'>" + registers[j].toUpperCase() + '</font>,');
    code = code.replaceAll('[' + registers[j], "[<font color='#C03E2A'>" + registers[j] + '</font>');
    code = code.replaceAll('[' + registers[j].toUpperCase(), "[<font color='#C03E2A'>" + registers[j].toUpperCase() + '</font>');
    code = code.replaceAll(' ' + registers[j] + '<br>', " <font color='#C03E2A'>" + registers[j] + '</font><br>');
    code = code.replaceAll(' ' + registers[j].toUpperCase() + '<br>', " <font color='#C03E2A'>" + registers[j].toUpperCase() + '</font><br>');
  }

  // Keywords
  let keywords = ['jmp ', 'db ', 'mov ', 'add ', 'sub ', 'inc ', 'dec ', 'hlt', 'ble ', 'bge ', 'blt ', 'bgt ', 'beq ', 'bnq ', 'call ', 'mod ', 'ret', 'push ', 'pop ', 'mul ', 'div ', 'clr ', 'heapbase', 'stackbase'];
  for (let j = 0; j < keywords.length; j++) {
    code = code.replaceAll(keywords[j], "<font color='#A0449F'>" + keywords[j] + '</font>');
    code = code.replaceAll(keywords[j].toUpperCase(), "<font color='#A0449F'>" + keywords[j].toUpperCase() + '</font>');
  }

  // Labels, Strings, Defines, Macros
  let lines = code.split('<br>');
  for (let j = 0; j < lines.length; j++) {
    lines[j] = lines[j].trim();
    if (lines[j].includes('"')) {
      let si = lines[j].indexOf('"');
      let ei = lines[j].lastIndexOf('"')+1;
      if (si+1 != ei) {
        strings.push(lines[j].substring(si, ei));
        let name = '[reserverd_highlighter_string_' + (strings.length - 1) + ']';
        lines[j] = lines[j].substring(0, si) + "<font color='#6CB765'>" + name + '</font>' + lines[j].substring(ei, lines[j].length);
      }
    }
    if (lines[j].substr(-1) == ':') {
      let label = lines[j].substring(0, lines[j].length-1);
      lines[j] = "<font color='#4081B0'>" + lines[j].substring(0, lines[j].length-1) + '</font>:'
      for (let k = 0; k < lines.length; k++) {
        lines[k] = lines[k].replaceAll(label,  "<font color='#4081B0'>" + label + '</font>');
      }
    }
    if (lines[j].substring(0, 8) == '#define ') {
      let name = lines[j].substring(8, lines[j].length);
      name = name.substring(0, name.indexOf(' ')).trim();
      if (name.trim().length > 0 && name != '<font') {
        lines[j] = "<font color='#41792A'>#define</font>" + lines[j].substring(7, lines[j].length);
        for (let k = 0; k < lines.length; k++) {
          lines[k] = lines[k].replaceAll(name, "<font color='#C03E2A'>" + name + '</font>');
        }
      }
    }
    if (lines[j].substring(0, 7) == '#macro ') {
      let name = lines[j].substring(7, lines[j].length);
      name = name.substring(0, name.indexOf(' ')).trim();
      if (name.trim().length > 0 && name != '<font') {
        lines[j] = "<font color='#41792A'>#macro </font>" + lines[j].substring(7, lines[j].length);
        for (let k = 0; k < lines.length; k++) {
          lines[k] = lines[k].replaceAll(name + ' ', "<font color='#A0449F'>" + name + ' </font>');
        }
      }
    }
    if (lines[j] == '#end') {
      lines[j] = "<font color='#41792A'>#end</font>"
    }
  }
  code = lines.join('<br>');

  // Put back in strings
  for (let i = 0; i < strings.length; i++) {
    code = code.replace('[reserverd_highlighter_string_' + i + ']', strings[i]);
  }

  document.getElementById('editor').innerHTML = code;
}

function syncScroll() {
  let scrollPos = document.getElementById('editorOverlay').scrollTop;
  let editor = document.getElementById('editor');
  let maxScroll = editor.scrollHeight - editor.clientHeight;
  let marginTop = 10;
  if (scrollPos < 0) {
    editor.style.marginTop = marginTop - scrollPos;
  }
  if (scrollPos > maxScroll) {
    editor.style.marginTop = marginTop - (scrollPos-maxScroll);
  }
  document.getElementById('editor').scrollTop = scrollPos;
}





// -----

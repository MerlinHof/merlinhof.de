class CodeHighlighter {
  constructor() {
    this.defaultColor = "rgb(255, 255, 255)";
    this.commentColor = "rgb(95, 106, 132)";
    this.stringColor = "rgb(30, 230, 150)";
    this.keywordColor = "rgb(170, 130, 245)";
    this.functionColor = "rgb(116, 173, 233)";
    this.numberColor = "rgb(240, 200, 80)";
    this.symbolColor = "rgb(116, 173, 233)";
    this.attributeColor = "rgb(255, 183, 243)";
    this.capitalColor = "rgb(230, 140, 40)";
    this.classNameColor = "rgb(240, 50, 210)";
    this.keywords = "var const if else true false for while in undefined return class this static private new break defineSuffix import as end initas".split(" ");
  }

  highlightCode(code) {
    code = code.replaceAll(" ", " ¤ ");
    code = code.replaceAll("<br>", " ↩ ");
    code = code.replaceAll("\\\"", " \\\◊ ");
    let symbols = "# : \" ^ = == + - * / % += -= *= /= , < > <= >= != & | ! ? ( ) [ ] { }".split(" ");

    // Create Tokens
    for (let i = 0; i < symbols.length; i++) {
      code = code.replaceAll(symbols[i], " " + symbols[i] + " ");
    }
    code = code.replaceAll(".", " . ");
    while (code.includes("  ")) code = code.replaceAll("  ", " ");
    let tokens = code.split(" ");

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i].trim();

      // Comments
      if (token.startsWith("#")) {
        let endIndex = i;
        while(!tokens[endIndex].includes("↩") && endIndex < tokens.length-1) endIndex++;
        //tokens[i] = "<t style='color: " + this.commentColor + "'>" + tokens[i];
        tokens[i] = "<t style='color: " + this.commentColor + "; background-color: rgba(75, 86, 112, 0.2); border-radius: 7px;'>" + token;
        tokens[endIndex] += "</t>";
        i = endIndex;
        continue;
      }

      // Strings
      if (token.startsWith("\"")) {
        let endIndex;
        for (endIndex = i; endIndex < tokens.length-1; endIndex++) {
          if (tokens[endIndex].includes("\"")) {
            if (endIndex != i || tokens[endIndex].replace("\"", "").includes("\"")) {
              break;
            }
          }
        }
        //tokens[i] = "<t style='color: " + this.stringColor + "'>" + tokens[i];
        tokens[i] = "<t style='color: " + this.stringColor + "; background-color: rgba(30, 230, 150, 0.2); border-radius: 8px;'>" + token;
        tokens[endIndex] += "</t>";
        i = endIndex;
        continue;
      }

      // Capital Tokens
      let capitalRegex = /^[A-Z]+$/;
      if (capitalRegex.test(token)) {
        tokens[i] = "<t style='color: " + this.capitalColor + "'>" + token + "</t>"
        continue;
      }

      // ClassNames
      let classNameRegex = /^[A-Z]+([a-z]*[A-Z]*)+$/;
      if (classNameRegex.test(token)) {
        tokens[i] = "<t style='color: " + this.classNameColor + "'>" + token + "</t>"
        continue;
      }

      // Keywords
      if (this.keywords.includes(token)) {
        tokens[i] = "<t style='color: " + this.keywordColor + "'>" + token + "</t>";
        continue;
      }

      // Functions
      if (i < tokens.length-1 && tokens[i+1].startsWith("(") && token != ".") {
        tokens[i] = "<t style='color: " + this.functionColor + "'>" + token + "</t>"
        continue;
      }

      // Numbers
      let numberRegex = /^[0-9]+[a-z]*/;
      if (numberRegex.test(token)) {
        tokens[i] = "<t style='color: " + this.numberColor + "'>" + token;
        if (tokens[i+1] == "." && numberRegex.test(tokens[i+2])) {
          tokens[i+2] += "</t>";
          i += 2;
        } else {
          tokens[i] += "</t>";
        }
        continue;
      }

      // Attributes
      if (tokens[i-1] == "." && !symbols.includes(token) && token != "." && !numberRegex.test(token)) {
        tokens[i] = "<t style='color: " + this.attributeColor + "'>" + token + "</t>"
        continue;
      }

      // Symbols
      if (symbols.includes(token)) {
        tokens[i] = "<t style='color: " + this.symbolColor + "'>" + token + "</t>"
        continue;
      }

    }

    let finalCode = tokens.join("");
    finalCode = finalCode.replaceAll("↩", "<br>");
    finalCode = finalCode.replaceAll("¤", " ");
    finalCode = finalCode.replaceAll("  ", "&nbsp;&nbsp;");
    finalCode = finalCode.replaceAll("◊", "\"");
    finalCode = "<t style='color: " + this.defaultColor + "'>" + finalCode + "</t>"
    return finalCode;
  }
}




String.prototype.startsWith = function(str) {
  return this.substring(0, str.length) == str;
}

String.prototype.endsWith = function(str) {
  return this.substr(this.length-str.length) == str;
}





function highlightingTestCases() {
  let highlighter = new CodeHighlighter();
  let stdc = highlighter.defaultColor;
  let cmtc = highlighter.commentColor;
  let strc = highlighter.stringColor;
  let kwdc = highlighter.keywordColor;
  let fncc = highlighter.functionColor;
  let numc = highlighter.numberColor;
  let symc = highlighter.symbolColor;
  let atrc = highlighter.attributeColor;
  let code = "# Los geht's:<br>var name = \"Merlin\"<br>var age = 20<br>var height = 20.2m<br>for (var i = 0, i < 7, i++)<br>if (2*x^2 <= 20) print(\"Hello World\")<br>return undefined*2<br>for(var x in 0...100)<br>return 2*this.name.length<br>break";
  let expeced = `<t style='color: ${stdc}'><t style='color: ${cmtc}'># Los geht's:<br></t><t style='color: ${kwdc}'>var</t> name <t style='color: ${symc}'>=</t> <t style='color: ${strc}'>"Merlin"</t><br><t style='color: ${kwdc}'>var</t> age <t style='color: ${symc}'>=</t> <t style='color: ${numc}'>20</t><br><t style='color: ${kwdc}'>var</t> height <t style='color: ${symc}'>=</t> <t style='color: ${numc}'>20.2m</t><br><t style='color: ${kwdc}'>for</t><t style='color: ${fncc}'> </t><t style='color: ${symc}'>(</t><t style='color: ${kwdc}'>var</t> i <t style='color: ${symc}'>=</t> <t style='color: ${numc}'>0</t><t style='color: ${symc}'>,</t> i <t style='color: ${symc}'><</t> <t style='color: ${numc}'>7</t><t style='color: ${symc}'>,</t> i<t style='color: ${symc}'>+</t><t style='color: ${symc}'>+</t><t style='color: ${symc}'>)</t><br><t style='color: ${kwdc}'>if</t><t style='color: ${fncc}'> </t><t style='color: ${symc}'>(</t><t style='color: ${numc}'>2</t><t style='color: ${symc}'>*</t>x<t style='color: ${symc}'>^</t><t style='color: ${numc}'>2</t> <t style='color: ${symc}'><</t><t style='color: ${symc}'>=</t> <t style='color: ${numc}'>20</t><t style='color: ${symc}'>)</t> <t style='color: ${fncc}'>print</t><t style='color: ${symc}'>(</t><t style='color: ${strc}'>"Hello World"</t><t style='color: ${symc}'>)</t><br><t style='color: ${kwdc}'>return</t> <t style='color: ${kwdc}'>undefined</t><t style='color: ${symc}'>*</t><t style='color: ${numc}'>2</t><br><t style='color: ${kwdc}'>for</t><t style='color: ${symc}'>(</t><t style='color: ${kwdc}'>var</t> x <t style='color: ${kwdc}'>in</t> <t style='color: ${numc}'>0</t>...<t style='color: ${numc}'>100</t><t style='color: ${symc}'>)</t><br><t style='color: ${kwdc}'>return</t> <t style='color: ${numc}'>2</t><t style='color: ${symc}'>*</t><t style='color: ${kwdc}'>this</t>.<t style='color: ${atrc}'>name</t>.<t style='color: ${atrc}'>length</t><br><t style='color: ${kwdc}'>break</t></t>`;
  let actual = highlighter.highlightCode(code);
  return expeced == actual;
}

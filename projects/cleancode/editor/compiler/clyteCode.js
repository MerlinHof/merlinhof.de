/*
Started 23.05.2022
Converts the Code of the provieded project to an AST
relying on just very basic execution units. This is
also the place where compiler errors are produced.
*/

// Global Variables
let strings = {};
let numberSuffixes = {};
let integerRegex = /^[0-9]+[a-z]*$/;
let floatRegex = /^[0-9]+\.[0-9]+[a-z]*$/;
let nameRegex = /^[a-z]+([a-z]*[A-Z]*[0-9]*)*$/;
let suffixRegex = /^([a-z]*[A-Z]*)+$/;
let error;

// Interface to the outside world
function toClyteCode(project, callback) {
  error = function(msg) {
    callback("<t style='color: rgb(255, 100, 160)'>Error: " + msg + "</t>");
    errorState = true;
  }
  let errorState = false;
  callback("Running Precompiler...");
  let res = precompile(project, "main.cc");

  if (errorState) return;
  callback("Running Lexer...");
  res = analyzeLexicographically(res);

  if (errorState) return;
  callback("Running Parser...");
  res = parseTokens(res, 0);
  console.log("AST:");
  console.log(res);

  if (errorState) return;
  callback("Inferring Types...");
  typeInferrence();

  if (errorState) return;
  callback("Checking Legal...");
  legalChecking();

  if (errorState) return;
  callback("Simplifying..."); // i.e. class removal etc
  simplify();

  if (errorState) return;
  callback("Optimizing..."); // i.e. constant propagtion etc
  optimize();

  callback("<t style='color: rgb(40, 255, 200)'>Compiled Successfully!</t>");
}










// ------------------------------------------------------------------------------------------------
// Precompiler - handles custom number suffix definitions and imports
// ------------------------------------------------------------------------------------------------

function precompile(project, fileName) {
  let code = project[fileName].content;
  code = code.replaceAll("<br>", "↩");
  code = code.replaceAll("\n", "↩");
  code = code.replaceAll("\\\"", "\\\◊");
  code = code.replaceAll("  ", "→");
  code = code.replaceAll("↩ ", "↩");
  code += "↩";

  // TODO: Imports
  // ...

  // Remove and Save Strings
  if ((code.length - code.replaceAll("\"", "").length) % 2 != 0) {
    error("Unclosed String");
    return;
  }
  while (code.includes("\"")) {
    let startIndex = code.indexOf("\"");
    let string = code.substring(startIndex, code.indexOf("\"", startIndex+1)+1);
    console.log(string);
    let name = generateRandomName();
    strings[name] = string;
    code = code.replaceAll(string, name);
  }

  // Remove Comments
  while (code.includes("#")) {
    let startIndex = code.indexOf("#");
    let comment = code.substring(startIndex, code.indexOf("↩", startIndex));
    code = code.replaceAll(comment, "");
  }

  // Custom Number Suffixes
  while (code.includes("↩DEFINESUFFIX ")) {
    let startIndex = code.indexOf("↩DEFINESUFFIX ");
    let line = code.substring(startIndex, code.indexOf("↩", startIndex+1));
    let parts = line.split(" ");
    if (parts.length != 3 || !suffixRegex.test(parts[1]) || !(floatRegex.test(parts[2]) || integerRegex.test(parts[2]))) {
      error("DEFINESUFFIX must be of the form: \"DEFINESUFFIX name number\"");
      return;
    }
    let name = parts[1];
    let value = parts[2];
    numberSuffixes[name] = value;
    code = code.replaceAll(line, "");
  }

  // Remove Empty Lines and return
  while (code.includes("↩↩")) code = code.replaceAll("↩↩", "↩");
  console.log(code);
  return code;
}










// ------------------------------------------------------------------------------------------------
// Lexer - converts code to tokens
// ------------------------------------------------------------------------------------------------

function analyzeLexicographically(code) {
  code = code.replaceAll("++", "+=1");
  code = code.replaceAll("--", "-=1");

  let tokenDividers = "↩ → . # : \" ^ = + - * / % , < > & | ! ? ( ) [ ] { }".split(" ");
  for (let i = 0; i < tokenDividers.length; i++) {
    code = code.replaceAll(tokenDividers[i], " " + tokenDividers[i] + " ");
  }
  while (code.includes("  ")) code = code.replaceAll("  ", " ");
  code = code.replaceAll("+ =", "+=");
  code = code.replaceAll("- =", "-=");
  code = code.replaceAll("* =", "*=");
  code = code.replaceAll("/ =", "/=");
  code = code.replaceAll("< =", "<=");
  code = code.replaceAll("> =", ">=");
  code = code.replaceAll("= =", "==");
  code = code.replaceAll("! =", "!=");
  code = code.trim();
  let tokens = code.split(" ");
  for (let i = 0; i < tokens.length; i++) tokens[i] = tokens[i].trim();
  console.log("Tokens:");
  console.log(tokens);
  return tokens;
}











// ------------------------------------------------------------------------------------------------
// Parser - Builds the abastract syntax tree (AST)
// ------------------------------------------------------------------------------------------------

// Convers the provided list of statements to AST (recursive)
function parseTokens(tokens, lineNumberBase) {
  let ast = [];
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token == "↩" || token == "→" || token == "end") continue;
    console.log(i, token);
    let lineNumber = 1+lineNumberBase + tokens.slice(0, i).filter(x => x == "↩").length;

    // Comments
    if (token == "#") {
      let endIndex = i;
      for (; tokens[endIndex] != "↩" && endIndex < tokens.length; endIndex++);
      i = endIndex;
      continue;
    }

    // Variable / Constant declaration of the form "var x = 3" or "var x"
    if (token == "var" || token == "const") {
      let name = tokens[i+1];
      let value;
      if (tokens[i+2] == "=") {
        let endIndex = i+3;
        for (; tokens[endIndex] != "↩" && endIndex < tokens.length; endIndex++);
        value = expressionToAST(tokens.slice(i+3, endIndex));
        i = endIndex-1;
      }
      ast.push({
        "description": token + "Dec",
        "name": name,
        "type": "unknown",
        "value": value
      });
      i++;
      continue;
    }

    // Variable Assignment
    if (nameRegex.test(token) && tokens[i+1] == "=") {
      let endIndex = i+2;
      for (; tokens[endIndex] != "↩" && endIndex < tokens.length; endIndex++);
      let value = expressionToAST(tokens.slice(i+2, endIndex));
      ast.push({
        "description": "varAssignment",
        "name": token,
        "type": "unknown",
        "value": value
      });
      i = endIndex;
      continue;
    }

    // IfElse
    if (token == "if" && tokens[i+1] == "(") {
      let res = analyzeBraces(tokens, i+1);
      let condition = expressionToAST(res.content);
      let indents = getIndents(tokens, i);
      let endIndex = res.endIndex;
      let trueBlock = [];
      let falseBlock = [];
      let insideTrueBlock = true;
      while (endIndex < tokens.length) {
        if (tokens[endIndex] == "else") {
          insideTrueBlock = false;
          endIndex++;
          continue;
        }
        if (insideTrueBlock) {
          trueBlock.push(tokens[endIndex]);
        } else {
          falseBlock.push(tokens[endIndex]);
        }
        if (getIndents(tokens, endIndex) <= indents && !sameLine(tokens, i, endIndex)) {
          console.log("Broke at: " + tokens[endIndex]);
          break;
        }
        endIndex++;
      }
      console.log("IFFFFFF");
      console.log(trueBlock);
      console.log(falseBlock);
      // let endTrueBlockIndex = Infinity;
      // let isSingleLineIfElse = false;
      // while (endIndex < tokens.length && (getIndents(tokens, endIndex) > indents || sameLine(tokens, i, endIndex))) {
      //   endIndex++;
      //   if (tokens[endIndex] == "else") {
      //     isSingleLineIfElse = true;
      //     endTrueBlockIndex = endIndex;
      //   }
      // }
      // let trueBlock = parseTokens(tokens.slice(res.endIndex, endIndex), lineNumber);
      // let falseBlock = 0;
      // if (!isSingleLineIfElse && tokens[endIndex+indents+1] == "else") {
      //   endIndex = endIndex+2
      //   let prevEndIndex = endIndex;
      //   while (endIndex < tokens.length && (getIndents(tokens, endIndex) > indents || sameLine(tokens, i, endIndex))) endIndex++;
      //   falseBlock = parseTokens(tokens.slice(prevEndIndex, endIndex), lineNumber);
      // }
      ast.push({
        "description": "ifElse",
        "condition": condition,
        "trueBlock": trueBlock,
        "falseBlock": falseBlock
      });
      i = endIndex;
      continue;
    }

    // Function Call and Definition
    if (nameRegex.test(token) && tokens[i+1] == "(") {
      let res = analyzeBraces(tokens, i+1);
      let args = expressionToAST(res.content);
      let endIndex = res.endIndex-1;
      i = endIndex;
      let indents = getIndents(tokens, i);
      let isDef = false;

      // Single-Line-Def, Multiline-Def
      let body;
      if (endIndex+1 < tokens.length && tokens[endIndex+1] != "↩") {
        isDef = true;
        let bodyEndIndex = endIndex+1;
        while (bodyEndIndex < tokens.length && tokens[bodyEndIndex] != "↩") bodyEndIndex++;
        body = parseTokens(tokens.slice(endIndex+1, bodyEndIndex), lineNumber);
        i = bodyEndIndex;
        console.log("SingleDef");
      } else if (endIndex+1 < tokens.length && tokens[endIndex+1] == "↩" && getIndents(tokens, endIndex+1) > indents) {
        isDef = true;
        let bodyEndIndex = endIndex+1
        while (bodyEndIndex < tokens.length && getIndents(tokens, bodyEndIndex) > indents) bodyEndIndex++;
        body = parseTokens(tokens.slice(endIndex+3, bodyEndIndex), lineNumber);
        i = bodyEndIndex;
        console.log("Multidef");
      }

      ast.push({
        "description": (isDef) ? "funcDef" : "funcCall",
        "type": "unknown",
        "name": token,
        "args": args,
        "body": body
      });
      continue;
    }

    // return
    if (token == "return") {
      let endIndex = i+1;
      while (tokens[endIndex] != "↩" && endIndex < tokens.length) endIndex++;
      let val = expressionToAST(tokens.slice(i+1, endIndex));
      console.log(val);
      ast.push({
        "description": "return",
        "type": "unknown",
        "value": val
      });
      i = endIndex;
      continue;
    }

    // Unrecognized Tokens
    error("Unrecognized Token at line " + lineNumber + ": " + token);
    return;
  }
  return ast;
}



// Converts the provided expression to an AST (recursive)
// Braces > Mul/Div > Add/Sub
function expressionToAST(expr) {
  if (expr == [] || expr.length == 0) return [];
  if (expr.length == 1) {
    if (Object.keys(strings).includes(expr[0])) {
      return {
        "description": "value",
        "type": "string",
        "value": strings[expr[0]]
      };
    } else if (expr[0] == "true" || expr[0] == "false") {
      return {
        "description": "boolConstant",
        "type": "bool",
        "value": expr[0]
      };
    } else if (integerRegex.test(expr[0])) {
      return {
        "description": "value",
        "type": "int",
        "value": expr[0]
      };
    } else if (nameRegex.test(expr[0])) {
      return {
        "description": "variable",
        "type": "unknown",
        "value": expr[0]
      };
    }
  }

  // Floats
  if (expr.length == 3 && floatRegex.test(expr.join(""))) {
    return {
      "description": "value",
      "type": "float",
      "value": expr.join("")
    };
  }

  // Split Conditions at |
  nestedLevel = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") { nestedLevel++; continue; }
    if (expr[i] == ")") { nestedLevel--; continue; }
    if (nestedLevel == 0 && expr[i] == "|") {
      let leftBranch = expr.slice(0, i);
      let rightBranch = expr.slice(i+1, expr.length);
      return {
        "description": "expression",
        "type": "unknown",
        "operator": expr[i],
        "leftBranch": expressionToAST(leftBranch),
        "rightBranch": expressionToAST(rightBranch)
      };
    }
  }

  // Split Conditions at &
  nestedLevel = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") { nestedLevel++; continue; }
    if (expr[i] == ")") { nestedLevel--; continue; }
    if (nestedLevel == 0 && expr[i] == "&") {
      let leftBranch = expr.slice(0, i);
      let rightBranch = expr.slice(i+1, expr.length);
      return {
        "description": "expression",
        "type": "unknown",
        "operator": expr[i],
        "leftBranch": expressionToAST(leftBranch),
        "rightBranch": expressionToAST(rightBranch)
      };
    }
  }

  // Condition Comparisons
  nestedLevel = 0;
  let comparators = ["==", "!=", "<", ">", "<=", ">="];
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") { nestedLevel++; continue; }
    if (expr[i] == ")") { nestedLevel--; continue; }
    if (nestedLevel == 0 && comparators.includes(expr[i])) {
      let leftBranch = expr.slice(0, i);
      let rightBranch = expr.slice(i+1, expr.length);
      return {
        "description": "expression",
        "type": "unknown",
        "operator": expr[i],
        "leftBranch": expressionToAST(leftBranch),
        "rightBranch": expressionToAST(rightBranch)
      };
    }
  }

  // funcCall
  if (nameRegex.test(expr[0]) && expr[1] == "(" && expr[expr.length-1] == ")") {
    return {
      "description": "funcCall",
      "type": "unknown",
      "name": expr[0],
      "args": expressionToAST(expr.slice(2, expr.length-1))
    };
  }

  // Argument Lists
  if (expr.includes(",")) {
    let nestedLevel = 0;
    let res = [];
    let prevInd = 0;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] == "(") { nestedLevel++; continue; }
      if (expr[i] == ")") { nestedLevel--; continue; }
      if (nestedLevel == 0 && expr[i] == ",") {
        res.push(expressionToAST(expr.slice(prevInd, i)));
        prevInd = i+1;
      }
    }
    if (res.length > 0) {
      res.push(expressionToAST(expr.slice(prevInd, expr.length)));
      return res;
    }
  }

  // (a) => a
  // (a+(b+c)) => a+(b+c)
  // ((a+b)+c) => (a+b)+c
  // (a+(x))+(b) => (a+(x))+(b)
  if (expr[0] == "(" && expr[expr.length-1] == ")") {
    let nestedLevel = 0;
    let i = 0;
    for (; i < expr.length; i++) {
      if (expr[i] == "(") nestedLevel++;
      if (expr[i] == ")") nestedLevel--;
      if (nestedLevel == 0 && i == expr.length-1) {
        return expressionToAST(expr.slice(1, expr.length-1))
      } else if (nestedLevel == 0) {
        break;
      }
    }
  }

  // Get top level operator (+ -)
  nestedLevel = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") { nestedLevel++; continue; }
    if (expr[i] == ")") { nestedLevel--; continue; }
    if (nestedLevel == 0 && (expr[i] == "+" || expr[i] == "-")) {
      let leftBranch = expr.slice(0, i);
      let rightBranch = expr.slice(i+1, expr.length);
      return {
        "description": "expression",
        "type": "unknown",
        "operator": expr[i],
        "leftBranch": expressionToAST(leftBranch),
        "rightBranch": expressionToAST(rightBranch)
      };
    }
  }

  // Get sublevel operator (* / %)
  nestedLevel = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") { nestedLevel++; continue; }
    if (expr[i] == ")") { nestedLevel--; continue; }
    if (nestedLevel == 0 && (expr[i] == "*" || expr[i] == "/" || expr[i] == "%")) {
      let leftBranch = expr.slice(0, i);
      let rightBranch = expr.slice(i+1, expr.length);
      return {
        "description": "expression",
        "type": "unknown",
        "operator": expr[i],
        "leftBranch": expressionToAST(leftBranch),
        "rightBranch": expressionToAST(rightBranch)
      };
    }
  }

  // Condition Negation
  nestedLevel = 0;
  if (expr[0] == "!") {
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] == "(") nestedLevel++;
      if (expr[i] == ")") nestedLevel--;
      if (nestedLevel == 0 && i == expr.length-1) {
        let value = expr.slice(1, expr.length);
        return {
          "description": "expression",
          "type": "unknown",
          "operator": "!",
          "value": expressionToAST(value)
        };
      }
    }
  }

  // Unrecognized Tokens
  error("Unrecognized Expression: " + expr.join(" "));
}


// Helper funcions
// Get number of indents before line of token at index
function getIndents(tokens, i) {
  let indents = 0;
  let cnt = i;
  while (tokens[cnt] != "↩" && cnt >= 0) cnt--;
  cnt++;
  while (tokens[cnt] == "→") {
    cnt++;
    indents++;
  };
  return indents;
}

// Anazlyzes Braces and returns the content and endIndex
function analyzeBraces(tokens, i) {
  let endIndex = i;
  let nestedLevel = 0;
  for (; endIndex < tokens.length; endIndex++) {
    if (tokens[endIndex] == "(") nestedLevel++;
    if (tokens[endIndex] == ")") {
      nestedLevel--;
      if (nestedLevel == 0) break;
    }
  }
  return {
    content: tokens.slice(i+1, endIndex),
    endIndex: endIndex+1
  };
}

// Checks if two indices are on the same line
function sameLine(tokens, a, b) {
  for (let i = a; i <= b; i++) {
    if (tokens[i] == "↩") return false;
  }
  return true;
}

// Returns a randomly generated name
function generateRandomName() {
  let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let length = 21;
  let name = "";
  for (let i = 0; i < length; i++) {
    name += letters[Math.floor(Math.random()*letters.length)];
  }
  return "rnd_" + name;
}













// ------------------------------------------------------------------------------------------------
// Gets the types of all the variables
// ------------------------------------------------------------------------------------------------

function typeInferrence() {

}




// ------------------------------------------------------------------------------------------------
// Checks for not-allowed stuff
// ------------------------------------------------------------------------------------------------

function legalChecking() {

}




// ------------------------------------------------------------------------------------------------
// Simplifies the AST to very basic commands supported by every output option (no ObjectOrientation, etc)
// ------------------------------------------------------------------------------------------------

function simplify() {

}




// ------------------------------------------------------------------------------------------------
// Optimizes the hell out of the simplified AST
// ------------------------------------------------------------------------------------------------

function optimize() {

}

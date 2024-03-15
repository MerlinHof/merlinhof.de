
/*
Compiler:
01. Evaluate imports and add system libraries
02. Delete comments and empty lines
03. Escape Characters
04. Remove Strings and replace with placeholders (eg. string_fgjhksk38lo)
05. Evaluate Macros
06. Create Syntax Tree (Parser)
07. Check LEGAL (Scope etc)
08. Determine Types of all variables
09. Replace operators with correct functions (operator overloading)
10. Object Oriented to functional for Simplicity and Performance
11. Simplify Syntax Tree
12. Optimize Syntax Tree (maybe using AI?)
13. Generate potential warnings
14. Put strings back in
...
15. Parse GUI to GUI Syntax tree
16. Code Generation based on specified output option


Output Options:
- C Terminal / Textbased Program (without UI)
- Website (HTML, CSS, JS, PHP)
- Xcode Project (iOS, iPadOS, macOS) SwiftUI
- Android App (APK)
- Windows App (EXE)
- Linux App (Debian / Raspberry Pi)
- Bootable OS based on minimal Linux (x86, ARM) ISO
- Microcontrollers (Arduino, ESP32, etc)


Compiler Error Messages (examples):
- Type conflict concerning variable "name" in line 42
- Unable to access an unknown variable in line 78
- Unable to call an private method from outside the class in line 93
- Unable to call an unknown function in line 130
- Unable to import not existing file "gui.cs"
- ...
*/


/*
Features:
- JS Style Arrays
- Object Orientation (Java - JS - Mix)
- Untyped
- All function parameters are optional
- ...

*/




// For loops become a while loop inside a block
for (let i = 0, i < 100, i++) {
  greet += "How are you?"
}

{
  let i = 0
  while (i < 100) {
    greet += "How are you?"
    i = i+1
  }
}



// Struct is just a class
class Person {
  let name = "Peter Wurscht"
  let age = 34
  let birthday = new Date(12, 4, 1998);
}

// Enum
// -> if (dir == Direction.LEFT) { ... }
enum Direction {
  LEFT, RIGHT, UP, DOWN
}



/*
BASIC Language Features:
- Variable declaration
- Varable assignment
- if_else statement
- switch statement ???
- while loop (continue, break)
- function definition
- function calling (recursive)
- function returning
- macros
- type inference

-> Everything else is added via macros and libraries! Even Object Orientation is just a macro

LEGAL Checking:
- variable scope (defined in block using { } ) enough as only criteria?
- method of object exists ??? (obj.method == undefined)
- method is allowed to be called (private?)
- ...

*/



// Most basic program without any additional libraries / macros:
let a = 5
let b = 7*2+3
let c = mod(a, b)

mod(x, y) {
  if (x < y) {
    return x%y
  } else {
    return undefined
  }
}

let i = 0
while (i < 20) {
  i = i+1
}






// Object Oriented to functional:
class Raindrop {
  let x = random(0, width)
  let y = 0
  let size = random(4, 7)
  let speed = random(3, 6)

  fall() {
    y += speed;
    draw()
  }

  draw() {
    //...
  }
}

main() {
  let drops = []
  for (let i = 0, i < 50, i++) {
    let drop = new Raindrop()
    drop.draw()
    drops.push(drop)
  }
}


// To functional:

struct Raindrop {
  int x;
  int y;
  int size;
  int speed;
}

void rainDropInitializer(struct Raindrop drop*) {
  drop->x = random(0, width);
  drop->y = 0;
  drop->size = random(4, 7);
  drop->speed = random(3, 6);

}

void rainDropFall(struct Raindrop drop*) {
  drop->y += drop->speed;
  rainDropDraw(drop);
}

void rainDropDraw(struct Raindrop drop*) {
  // ...
}


void main() {
  struct Array drops*;
  {
    int i = 0;
    while (i < 50) {
      struct Raindrop drop*
      rainDropInitializer(drop);
      rainDropDraw(drop);
      arrayPush(drops, drop);
      i++;
    }
  }
}



// JS-Style Arrays in C:
union UniversalType {
  int i;
  char* string;
  double d;
  struct Raindrop drop;
  // ... all created classes (structs) in CleanScript
}

struct Array {
  int length;
  struct LinkedListElement *lastElement;
  struct LinkedListElement *linkedList;
}

struct LinkedListElement {
  int index;
  union UniversalType value;
  struct LinkedListElement *next;
}

void arrayPush(struct Array arr*, struct RainDrop drop*) {
  struct LinkedListElement newElement;
  union UniversalType value;
  value.drop = drop;
  newElement.type = type;
  newElement.index = arr->lastElement->index + 1;
  arr->lastElement = newElement;
}

void arrayGet(struct Array arr*, int index) {
  while () {

  }
}

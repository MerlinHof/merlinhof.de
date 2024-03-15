/*
CleanScript Specs

- Extremely Powerful, but also easy as fuck
- Very high level
- Native! (Linux, macOS, Windows, iOS, Android, Web, even Embedded?)
- Compile to Xcode Project (macOS, iOS (Swift, SwiftUI)), Linux ARM 64 App C (Raspberry Pi, Android (Java) and Windows (?) Apps
- Clean and consistent Syntax (!!!)
- Flexible
- Large and useful default libraries
- As logical as possible
- Efficient and fast executables
- Do as much work as possible at compile time for as fast as possible execution.
- Typed, BUT the types are infered! No explicit types!
- Deeply integrated UI functionality
- Highly parallel + UI Modifyable from within another thread!
- Main Thread != UI Thread (unlike JavaScript)
- NOT let and var, just let! (More mathematical and consistent)
- NOT undefined and null, just undefined!
- Large Array functionality; [...]+[...], [...]-"x", etc
- Multiple inheritance (extends more than one super class)
- Optional function parameters (instead of function overloading)
- Better == Operator! (Unlike JS, where '17' == 17 == true)
- Another basic type: Instad of getData("GET"); just use getData(GET);
- Macros!
- Allow crashing to better be able to debug
- TODO: DataBase Support! (Based on JSON?)
- Object == JSON
- Integrated Security / Encryption
- Integrated File system support
- Native Sensor Support (Accelerometer on iPhones, Kamera, Microphone, etc)
- No Semikolons!
- Allow on-the-fly generation of objects like:  let point = {x: 3, y: 12}
- TODO: Easy String manipulation!
- Abstract way of accessing Hardware (Bluetooth, Filesystem, etc)

What I don't like so far:
- (fixed) Two notations for accessing objects:
    1: obj.x
    2: obj["x"]
- (fixed) undefined, null, (basically the same)
- Two notations for switch ( -> and : )
- (fixed) Two function definitions, x() { ... } and lambdas (maybe treat functions as objects / variables?)

JS:
  It runs too easily, no matter how badly someone screws up.
  This means that the user sees the errors and not the programmer.

  If you write this code in any modern language such as Java, C#, Rust,
  and even TypeScript, the compiler would find the bugs before you even
  run this code. If you write it in Python, it will stop execution when
  it finds the bug and tell you why. In JavaScript, it will just
  “recover” from the bugs and return false.

Default Classes:
 - CleanScript()
 - Color()
 - Point()
 - Vector()
 - Math()
 - Matrix()
 - Thread()
 - Security() / Encryption()
 - DataBase()
 - WebRequest()
 - NeuralNetwork()
 - UI (Font, Window, all Elements, etc)
 - Graphics (for Canvas drawing)
 - ...

*/



// -------------------------------------------------
// -------------------------------------------------
// General Stuff


// Standard function definition
// Without "func" keyword to make it as short as possible
calc(a, b)
  let gg = a+b
  return gg*b + 8

// Or as "Lambda" function
// Same as the above, just without a name
// for consistency reasons
getData(x, y, (a, b) ->
  return (a+b)*b + 8
)


// Sorted Arguments
// Very Useful for mathematical functions
// The classical (old) way:
random(a, b) {
  if (b < a) {
    let tmp = a
    a = b
    b = tmp
  }
  assert(a <= b); // <= true
}

// New CleanScript way:
random(a < b) {
  assert(a <= b); // <= true
}

// Can also be combined with other (unsorted) arguments
test(a, b, c < d < e, f) {
  // here it is guaranteed that c is <= d which itself is <= e
}

// Default Values for (optional) parameters
// if called like this for example: calc(6)
// the parametes inside would have these values:
// a == 6
// b == undefined
// c == 12
// d == "hey"
calc(a, b, c = 12, d = "hey") {
  // code
}


// Easier condition checking
// In addition to classical ways! Not a replacement
// Intention is to make it not only shorter, but also
// way more intuitive.

/* old: */ if (a == b && b == c && c != d) { ... }
/* new: */ if (a == b == c != d) { ... }
// -------
/* old: */ if (a < b && b < c && c == d && d < e) { ... }
/* new: */ if (a < b < c == d < e) { ... }
// -------
/* old: */ if (a == 7 && b == 12 && c == 13 && d == 111) { ... }
/* new: */ if ((a, b, c, d) == (7, 12, 13, 111)) { ... }
// -------
/* old: */ if (a != undefined && b != undefined && c != undefined && d != undefined) { ... }
/* new: */ if ((a, b, c, d) != undefined) { ... }
// -------
/* old: */ if (a == 7 && b == 7 && c == 7) { ... }
/* new: */ if ((a, b, c) == 7) { ... }


// After every line, x has a value of "undefined"
let x
let x = undefined
let x = x*2
let x = 2/0
let x = object.thisPropertyDoesNotExist
let x = object.thisMethodDoesNotExist()
let x = nonReturnFunction()


// Objects
let person = {
  name: "Hans",
  country: "Germany",
  age: 19,
  alive = true,
  location: {
    x: 12,
    y: 7
  }
}

// Classes
class Person {
  let static maxAge = 100
  let static numberOfFeet = 2
  let private names = ["Hans", "Peter", "Klaus", "Franz"]
  let alive = true;
  let id

  constructor(name, country, age) {
    this.name = name
    this.country = country
    this.age = age
    id = random(Number.max)
  }
  hasBirthday() {
    age++
  }
  dies() {
    alive = false
  }
  static randomPerson() {
    return new Person(randomName(), ...);
  }
  private randomName() {
    return names[random(names.length)];
  }
}

// Multiple Inheritance (1 - ∞)
// TODO: How to address conflicting method names?
class Woman extends Person, Cycle {
  constructor() {
    super(...); // <- For Person
    super(...); // <- For Cycle
  }
  // ...
}




// Example System Library (Intern)
class CleanScript {
  static lightMode = true
  static platform = Platform.desktop
  static mousePosition = {x: 489, y: 201}
  static randomSeed = new Date().toMillis()
  static device = {
    vendor: Vendor.apple,
    name: "MacBook Pro",
    os: OS.macOS,
    version: 12.1,
    cpu: {
      vendor: Vendor.intel,
      name: "i5-7360U",
      frequency: 2.3,
      cores: 2,
      threads: 4
    },
    screen: {
      width: 1920,
      height: 1080,
      quality: 7,
      size: 13.3
    }
  }
  static getTheme() {
    return this.lightMode if this.LIGHT else this.DARK
  }
  static random() {
    CleanScript.randomSeed = (CleanScript.randomSeed*503889 + 20193785)%69048958785
    return CleanScript.randomSeed / 69048958785
  }
  static exit(code = 0) {
    // exit program
  }
  private hhh() {
    // code
  }
}


// Default random method
// random()         =>  0.39858284
// random(10)       =>  7
// random(90, 100)  => 93
random(a < b) {
  if (a == b == undefined) return CleanScript.random()
  if (b == undefined) return floor(CleanScript.random()*a)
  require(a != b, 'random: a == b not allowed') // <- Causes program to exit if not fulfilled with the specified message
  return a+floor(CleanScript.random()*(b-a))
}


// Operator Overloading
// *Inside* of those functions none of the other overloaded
// operators is activated!
// Defines: [1, 2, 3] + [4, 5, 6] == [1, 2, 3, 4, 5, 6]
// and:     [1, 2, 3] + 7         == [8, 9, 10]
overload(a + b) {
  if (sameType(a, []) && sameType(b, [])) {
    return a.concat(b)
  }
  if (sameType(a, []) && sameType(b, 0)) {
    let tmp = a.copy()
    for (let i = 0, i < tmp.length, i++) {
      tmp[i] += b
    }
    return tmp
  }
}

// Redefine access operator for array (Useless in this case,
// but may be very useful for own classes / objects)
// let arr = [1, 2, 3, 4, 5, 6]
// arr[1] != 2 anymore, but now arr[1] == 8
//
// Can be applied to every array, but here the + operator
// does only show this behaviour when applied to the object arr.
overload(a[i]) {
  if (sameType(a, []) && sameType(i, 0) && a == arr) {
    if (i < a.length/2) return a[2*i]+5
    return undefined
  }
}

// Redefine Power function
// write 3^7 instead of Math.pow(3, 7) (overrides xor!)
overload(a^b) {
  if (sameType(a, 0) && sameType(b, 0)) {
    return Math.pow(a, b)
  }
}



// Extend existing Classes from the outside
Array.toString(arr) {
  let res = "["
  for (let i = 0, i < arr.length, i++) {
    res += arr[i]
    if (i != arr.length-1) res += ", "
  }
  return res + "]"
}



// Default Color Class (Intern)
class Color {
  private colorList = {
    light: {
      red: new Color(255, 0, 0),
      green: new Color(255, 0, 0),
      blue: new Color(255, 0, 0),
      ...
    },
    dark: {
      red: new Color(255, 0, 0),
      green: new Color(255, 0, 0),
      blue: new Color(255, 0, 0),
      ...
    }
  }
  let red, green, blue, alpha

  constructor(r, g, b, a=255) {
    require((r, g, b) != undefined, "Color: requires at least 3 arguments")
    red = r
    green = g
    blue = b
    alpha = a
    themeChanged(CleanScript.getTheme())
  }
  clone() {
    return new Color(this.red, this.green, this.blue, this.alpha)
  }
  toString() {
    return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")"
  }
  static create(name, lightVersion, darkVersion) {
    require((name, lightVersion) != undefined, "Color.create: requires a name and at least one color");
    if (darkVersion == undefined) darkVersion = lightVersion
    colorList.light.(name) = lightVersion
    colorList.dark.(name) = darkVersion
    Color.(name) = (CleanScript.getTheme() == CleanScript.lightMode) ? lightVersion : darkVersion
  }
  static createGradient(name, direction, colors) {
    // ...
  }
  themeChanged(state) {
    if (state == CleanScript.lightMode) {
      for (key in colorList.light)
        Color.(key) = colorList.light.(key)
    } else {
      for (key in colorList.dark)
        Color.(key) = colorList.dark.(key)
    }
  }

  // Operator overloading
  overload(a == b) {
    if (sameType(a, Color) && sameType(b, Color)) {
      return a.red == b.red &&
             a.green == b.green &&
             a.blue == b.blue &&
             a.alpha == b.alpha
    }
  }
  overload(a[i]) {
    if (sameType(a, Color) && sameType(i, 0)) {
      return switch (i) {
        case 0 -> a.red
        case 1 -> a.green
        case 2 -> a.blue
        case 3 -> a.alpha
        default -> undefined
      }
    }
  }
  overload(a / b) {
    if (sameType(a, Color) && sameType(b, Color)) {
      return new Color(a.red/b.red, a.green/b.green, a.blue/b.blue, a.alpha/b.alpha)
    }
    if (sameType(a, Color) && sameType(b, 0)) {
      return new Color(a.red/b, a.green/b, a.blue/b, a.alpha/b)
    }
  }

}


// Classes for UI Elements
class Element {
  constructor() {
    this.x
    this.y
    this.z
    this.color
    this.width
    this.height
    this.id
    this.style
    this.cornerRadius
    ...
  }
}
class Box extends Element {
  constructor() {
    // ...
  }
}


// Read the first 10 files from desktop (ordered lexicographically)
let files = readFiles("/home/pi/desktop/", 10)



// Database Example
let db = new DataBase()
let customers = db.createTable()
customers.add({
  id: "67293891037"
  name: "Wladimir Putin",
  town: "Moscow",
  job: "Murderer",
  phone: "859203948"
})
customers.add({
  id: "40848293884"
  name: "Alexander Lukaschenko",
  town: "Belarus",
  job: "Murderer",
  phone: "1582945"
})

let products = db.createTable()
products.add({
  id: "05030298378954",
  name: "Gun",
  manufacturer: "RMX",
  stock: 59
})
products.add({
  id: "385892930942",
  name: "Bomb",
  manufacturer: "USW",
  stock: 59
})

let purchases = db.createTable()
purchases.add({
  id: "587589389230",
  buyerID: "67293891037",
  productID: "385892930942",
  quantity: 7
})

// TODO
//let res = db.match(customers, purchases, productID, "385892930942")
//let res = purchases.match(productID, "385892930942")
//print(res)
// ->

// Save and Load DBs
db.save("dbax")
let dat = DataBase.load("dbax")




// Enums
let direction = LEFT | RIGHT | UP | DOWN

// Usage:
let dir = RIGHT
if (dir == LEFT)        // = false
if (dir == direction)   // = true
if (LEFT < RIGHT)       // = true


// Syntax? Indents instead of {..} ?
if (a == b || x == 3)
  print("Hello")
  let c = a+b
  if (c == d)
    print("C was changed!")
    let c = a+b
  return
print("Done!");









// -------------------------------------------------
// -------------------------------------------------
// This is what a script file looks like for the user


// Specify location (important for websites - frontend or backend)
> frontend

// Import other files
import /src/util.cs
import /guis/ui.cs


// Makros - Used to extend Language Features (at compile time!)
// Very useful for larger projects or extremely clean code!
// usage:
// let a = 3; let b = 7
// swap a and b
// now a = 7 and b = 3
// intentially not looking like a function swap(a, b) to avoid confusion!
define Macro
  swap $a and $b
behaviour
  let f3bBxK = $a
  $a = $b
  $b = f3bBxK
end

// Macro for async block Syntax
define Macro
  async {
    $stmt
  }
behaviour
  new Thread().start((id) => {
    $stmt
  })
end

// Macro for function definition Syntax
define Macro
  $name($params) {
    $stmt
  }
behaviour
  let $name = new Func($params) {
    $stmt
  }
end




// Define GUI (usually not in the same file - has to be imported)
GUI {
  static f1 = new Font("/src/futura.ttf")
  static f2 = new Font("/src/americanTypewriter.ttf")
  static f3 = new Font("/src/openSans.ttf")

  // Changes applied to these variables automatically result in an UI refresh
  static mainHeaderStyle = style.container
  static loginDescription = "Or use your private ID to create a new account"
  static headerColor = Color.oceanBlue

  component MainScreen {
    Box: id = header, style = $mainHeaderStyle, onclick = login()
    Box: id = body, style = container
      > Box: id = innerBody, style = element + container
      > Img: id = profileIcon, style = icon, src = /data/profile.png
        >> Box: id = lul, style = innerBox
    2x Canvas: id = myCanvas$n, style = canvas
    Box: id = boxContainer
      > 12x BoxElement: id = box$n, onclick = openElement(this, $n)
  }

  component BoxElement {
    Box: id = header, style = container
    Img: id = profileIcon, style = icon, src = /data/profile.png
    Img: id = closeIcon, style = icon, src = /data/close.png
  }

  component LoginScreen {
    Text: id = loginTitle, style = title, content = "Log in Here!"
    Text: id = loginTitle, style = title, content = $loginDescription
    ...
  }


  style {
    all:
      font = f1
      color = white
      darkMode = dynamic

    header:
      width = 100pw
      height = 50px
      color = $headerColor
      stick = top

    container:
      width = 100pw
      height = 100ph
      color = skyBlue
      margin = 7px
      padding = 10px, 20px, 10px, 0px
      cornerRadius = 12px
      orientation = vertical
      centerX = true
      centerY = true

    innerBody extends container:
      color = red
      font = f3
      darkMode = disabled
      cornerSmoothing = 20%
  }
}


// Example of how UI modification works
modifyGUI() {

  // Getting an Element and changing its properties directly
  let body = GUI.mainScreen.body
  body.color = Color.oceanBlue
  body.visible = false
  body.centerX = false
  let loginTitle = GUI.loginScreen.loginTitle
  loginTitle.content = "An Error occured. Please try again"

  // Animate an Element
  let boxHeader = GUI.boxElement.header
  boxHeader.animate(width, 0, 1s)
  boxHeader.animate(opacity, 0.5, 1s)
  wait(1s)
  boxHeader.animate(width, default, 200ms)

  // Changing the font directly
  let headerStyle = GUI.style.header
  headerStyle.font = GUI.f2

  // Making use of static live variables -> automatically update the UI!
  GUI.headerColor = Color.red
  GUI.loginDescription = "You are banned from creating new accounts! Please reach out to our customer support."

  // Create new UI components and styles
  GUI.createComponent(myComponent) {
    Box: id = $x, style = myStyle
    Img: id = $z, style = icon, src = $y
  }
  GUI.createStyle(myStyle) {
    width = $x %
    height = $y px
    color = $z
  }

  // Adding and removing components (similar to adding a new element to innerHTML)
  GUI.mainScreen.header.addComponent(GUI.myComponent)
  GUI.mainScreen.header.removeComponent(GUI.myComponent)

  // Adding and removing styles from element
  GUI.mainScreen.header.addStyle(GUI.myComponent)
  GUI.mainScreen.header.removeStyle(GUI.myComponent)
  let styles = GUI.mainScreen.header.styles

  // Adding an Element directly without the need of creating an component prior.
  GUI.mainScreen.addElement() {
    Box: id = $x, style = myStyle
    Img: id = $z, style = icon, src = $y
  }
}


// ?????????????
// NOT ALLOWED ?
// due to consistency! All Event listeners need
// to be declared in the DOM itself, so they can
// be found with ease and the code does not need
// to be searched to find those listeners!
GUI.mainScreen.header.onClick(e) {
  print("I got clicked! My id is: " + e.id)
}
GUI.mainScreen.header.onTouch(e) {
  print("I got touched! My id is: " + e.id)
}


// Canvas example
drawRandomPoints(amount, a, b, c) {
  let canvas = GUI.mainScreen.myCanvas[0]
  canvas.draw(new Circle(x, y, radius, color))

  for (let i = 0, i < amount, i++) {
    let rect = new Rectangle()
    rect.x = random(canvas.width)
    rect.y = random(canvas.height)
    rect.width = random(100, 150)
    rect.height = random(100, 150)
    rect.cornerRadius = 10
    rect.color = Color.skyBlue
    canvas.draw(rect)
  }
}





// Main function (entry point) with UI
main() {
  enableDebugMode(true) // <- setting this to false disables all 'print()' calls
  let window = new Window()
  window.size = new Size(400, 200);
  window.isResizeable = false
  window.clear()
  window.interface = GUI.mainInterface
  window.show()

  // Add custom colors (accessible via Color.oceanBlue) with light and dark version
  Color.create(oceanBlue, new Color(94, 204, 242), new Color(94, 204, 242))
  Color.create(skyBlue, new Color(94, 204, 242), new Color(94, 204, 242))
  Color.create(fireRed, new Color(94, 204, 242), new Color(94, 204, 242))
  Color.createGradient(sun, toBottomRight, Color.red, Color.orange)
  GUI.mainInterface.title.color = Color.oceanBlue

  let primeString = getPrimeNumbers(100).toString()
  GUI.mainScreen.header.content = primeString
  print(primeString) // <- Debug Console
}

getPrimeNumbers(max) {
  let primes = [2]
  for (let i = 3, i < max, i += 2) {
    let isPrime = primes.every(p => i%p != 0)
    if (isPrime) primes.add(i)
  }
  return primes
}







// Parallelism
calculatePixels(data) {
  let pixels = []
  pixels.fill(0, 1000)

  let id = 7 // <- Optionals
  let thread = new Thread(id)
  thread.start((id) => {
    // code
  })
  wait(thread) // <- Makes no sense in this case, but it is possible to wait for threads to finish; same as thread.join() in other languages


  // Alternative. Easier and shorter, but less control:
  async {
    // code
  }
}



// Web Requests
getData(url) {
  let headers = {
    name: "Merlin",
    city: "Rosenheim"
  }
  let res = WebRequest.query(GET, url, headers)
  wait(res) // <- Blocks code execution, but not the UI! Required in this case.
  print(res)

  // Or using a callback:
  WebRequest.query(GET, url, headers, (res) {
    print(res.content)
  })
}

/*
------------------
--- CleanCode ----
------------------

- Minimal, Intelligent, Logical, Consistent Syntax
- Beautiful, extremely concise but very readable code
- Very lightweight and fast, no boilerplate code
- Large and useful standard library
- Mathematical foundation, as maths and programming have almost equal syntax
- Multithreaded (easy to use!)
- Useful Compiler errors (NOT forgiving like JS!)
- Extremely Powerful, but also very easy for beginners
- Fast and Efficient native (compiled) executables
- Do as much work as possible at compile time for as fast as possible execution.
- Typed, BUT the types are inferred! No explicit types!
- Deeply integrated UI functionality, not just an "Add-on"
- UI accessible from within every thread (UI runs in its own independent thread)!
- Multiple inheritance (extend more than one super class)
- Native, but abstract FileSystem / Hardware support (Bluetooth, GPIO, etc)
- Errors must be handled where they occur - no exception system
- Async / Threaded Code handled via Callbacks only

About JavaScript:
 It runs too easily, no matter how badly someone screws up.
 This means that the user sees the errors and not the programmer.
 If you write [...] code in any modern language such as Java, C#, Rust,
 and even TypeScript, the compiler would find the bugs before you even
 run [it]. If you write it in Python, it will stop the execution when
 it finds the bug and tell you why. In JavaScript, it will just
 “recover” from the bugs and return false.

CleanCode compiles to (Compiler Output Option COO):
1. C Terminal-Program (without UI)
2. Website (HTML, CSS, JS, PHP)
3. Xcode Project (iOS, iPadOS, macOS) Swift + SwiftUI
4. Android App (APK)
5. Windows App (EXE)
6. Linux App (Debian / Raspberry Pi)
7. Bootable OS based on minimal Linux (x86, ARM) ISO
8. Microcontrollers (Arduino, ESP32)
9. Custom Compiler Extensions for own Hardware

Main steps of the compilation process:
1. Compiler Compiles CC Code to basic AST
   only containing very basic statements
   -> Converting complex code to simple code (no classes etc)
   -> Type inferrence
   -> Error / Legal checking
2. Optimizer optimizes AST as good as it can,
   maybe even supported by ML
3. Compiler Output Builder (COB) builds Code
   depending on COO from that optimized AST
*/



# Basic Variable declaration
var name = "Merlin"
var age = 19
var height = 1.78m
var isAlive = true
var x, y = 4, 5
const PI = 3.14159265358
const E = 2.71828182846
10.0 == 10    # true


# Variable Swap? No problem!
x, y = y, x


# Basic Control Structures
if (isAlive & height < 1.8 | height > 2)
  print("Gotcha")
  isAlive = false

for (var i = 0, i < 20, i++)
  print("This is round [i+1] of 20")
  acc += 81

for (var i in 0...20) ...
for (var p in persons) ...

var x = 0
while (x < 10)
  print("Yeah")
  x += 1


# Enums for code clarification
const direction = UP, RIGHT, DOWN, LEFT
var dir = DOWN + 3
if (dir == RIGHT)
  print("Ah, it's right")
  dir = UP
if (dir == direction)
  print("It's a direction")
  dir += 1


# Tuples (= Lists or Arrays) -> defined order
var names = ("Olaf", "Angela", "Robert", "Annalena")
var mixedTypes = ("Hello", 12, date, 7.2)
var nested = ((1, 4), (6, 3), (1, (2, 2, 1, 0), 4))
var primes = (2, 3, 5)
primes.append(7)             # (2, 3, 5, 7)
primes.prepend(1)            # (1, 2, 3, 5, 7)
primes.insert(3, 7)          # (1, 2, 3, 7, 5, 7)
primes.removeValue(1)        # (2, 3, 7, 5, 7)
primes.removeIndex(0)        # (3, 7, 5, 7)
primes.removeAll(7)          # (3, 5)
primes.fill(8, 5)            # (3, 5, 8, 8, 8)
primes.slice(0, 3)           # (3, 5, 8, 8)
primes.copy()                # (3, 5, 8, 8)
primes.clear()               # ()
primes.concat(tuple)         # (10, 11, 12)
primes.forEvery(func)        # true / false
primes.map(func)             # (func(10), func(11), func(12))
primes.sort(func)            # (...)
primes.count(8)              # 0
primes.contains(2)           # true / false
primes.reverse()             # (12, 11, 10)
primes.replace(12, 3, 1)     # (3, 11, 10)
primes.swap(0, 1)            # (11, 12, 10)
primes.indexOf(12, offset)   # 1
primes.set(2, 7)             # (11, 12, 7)
primes.get(1)                # 12
primes.set(3, 4, 5, 7)       # => primes[3][4][5] = 7
primes.get(3, 4, 5)          # => primes[3][4][5]
var s = primes.size          # 3


# Tuples with only one element are tuples and their content simultaneously!
(12)+2 == (12+2) == 12+2 == 14 == (14)


# Tuples are intelligent!
var numbers = (21, 54, 9, 18)
var numbers = numbers.fill(0, 10)  # <- (21, 54, 9, 18, 0, 0, 0, 0, 0, 0)
var numbers = (1, 2, ..., 10)      # <- (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
var numbers = (8, 10, ..., 20)     # <- (8, 10, 12, 14, 16, 18, 20)
var numbers = (2, 4, ...)          # <- compilerError! only valid in comparisons because of unspecified size
var numbers = (0, ..., 10)         # <- (0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
var range   = 0...10               # <- (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)


# Tuple arithmetic
var numbers = (1, 2, 3) + 1      # (2, 3, 4)
var numbers = 10 - (1, 2, 3)     # (9, 8, 7)
var numbers = (1, 2, 3) * 3      # (3, 6, 9)
var numbers = (2, 4, 6) / 2      # (1, 2, 3)
var numbers = (1, 2) + (4, 5)    # (5, 7)
var numbers = (1, 2, 3) * (4, 5) # (4, 10, 12) wraparound -> result is always the length of the longest operand


# Tuple comparisons with Pattern Matching
(1, 2, 3) == (1, 2, 3)   # true
(1, 2, 3) != (1, 2, 4)   # true
((1), 2)  == (1, 2)      # true
(1, 2, 3) < (2, 3, 4)    # true (pair-wise comparison)
(7, 8, 9) > (6, 9, 5)    # false, 8 !> 9
(1, 2)    < (4, 5, 6)    # Error -> unequal length
(1, 2, 3) != (5, ...)    # true, every element != 5
(8, 2, 3) == (8, ...)    # false, not every element == 8
(1, 2, 3) == (1, *, 3)   # true
(1, 2, 3) == (*, 3)      # true
(1, 2, 3) == (*, 1, *)   # true  ->  *   represents every possible thing, even nothing or the sequence 5, 6, 7
(1, 2, 3) == (**, 1, **) # false ->  **  represents one and only one element like 5 or 7
(1, 2, 3) == (*)         # true
(1, 2, 3) == (**)        # false
(1, 2)    == (**, **)    # true
(1, 2, 3) == (*, 5)      # false
(*, *)    == (*)         # true
(**, **)  == (**)        # false


# Sets (Mengen, Pools) = unordered! -> HashLists, very fast and efficient
var set = {102, 46, 246, 346}
set.add(5)          # {102, 56, 5, 246, 346}
set.remove(102)     # {56, 5, 246, 346}
set.contains(45)    # false
var s = set.size    # 4


# Set arithmetic
var set = 2 * {1, 2, 3} + 3       # {5, 7, 9}
set = {102, 46, 247}
set.union({20, 22, 9})            # returns {102, 46, 247, 20, 22, 9}
set.intersect({7, 3, 46})         # returns {46}
set.isDisjunctTo({1, 2, 46, 7})   # returns false, because of 46


# Set comparison
{1, 5, 7} == {1, 5, 7}    # true
{1, 5, 7} == {7, 1, 5}    # true
{1, 1, 3} == {1, 3}       # true
{3, 4, 5} == {5, 6, 7}    # false
{{}, {}}  == {{}}         # false
# <, > are not defined


# Keyed Sets (like JS objects - but here it is very consistent with the rest of the language)
var person = {name: "Hans", age: 21, myFunc(p) p%2==0}
var name = person.name
person.age = 26
person.myFunc(3)

# Additional Maths (nothing special, just interesting concepts)
var sum  = sum(0...20, (i) 2*i*i)  # = 2*0^2 + 2*1^2 + 2*2^2 + 2*3^2 + ... + 2*20^2
var sum  = sum((1, 2, 3, 4, 5))    # = 1+2+3+4+5 = 15
var flr  = floor(3.4)
var sin  = sinus(2*PI)
var root = squareRoot(25)


# Define Functions
calculatePrimesUpTo(max)
  var primes = (2)
  for (var i = 3, i < max, i += 2)
    var isPrime = primes.forEvery((p) i%p != 0)
    if (isPrime) primes.append(i)
  return primes


# Definition of Sum Function (from section "Additional Maths")
# "!" after an parameter makes it mandatory
sum(tuple!, func)
  var sum = 0
  for (var elem in tuple)
    sum += (func == undefined) ? elem else func(elem)
  return sum


# Make Parameters Mandatory
sum(obj)
  print(obj)      # might be undefined
  print(obj.x)    # might be undefined, even if obj is not undefined
sum(obj!)
  print(obj)      # is definitely not undefined
  print(obj.x)    # is definitely not undefined -> only objects with attribute "x" are allowed


# Define functions with sorted / default parameters
# Crashes program if not able to sort! eg. random(2, 2)
random(a < b) ...
setName(name, update = true) ...


# Access all arguments in one function-local "args" tuple
myFunc()
  print(args)   # -> (1, 2, 3) if you called myFunc(1, 2, 3)
  return


# Call Functions
var primes = calculatePrimesUpTo(1000)
var random = random(4, 12)


# Pass function as argument
fetchData(url, callback)
# or with anonymous function
fetchData(url, (res, code)
  print("Got [res] with code [code]")
  print("That's it.")
  # ....
)


# Classes
class Person is Mammal
  const validCountries = GERMANY, USA, UKRAINE, FRANCE
  var name = new Name("Max", "Mustermann")
  var age = 30
  var homeTown = new City("83073", "Maxvorstadt")
  var country = GERMANY

  init(name, age)
    super(age)
    if (name != undefined) this.name = name
    if (age != undefined) this.age = age

  setCountry(c)
    if (c == validCountries) country = c
    else error("Invalid Country")

  setAge(age!)
    if (age in 0...100) this.age = age
    else error("Age doesn't seem valid")

  private getOlder()
    age += 1
    print("Happy Birthday!")

  static create()
    print("This creates a new default person")
    return new Person()

  private error(msg)
    print("An error occured: [msg]")
    person = Person.create()

  # Overload: + - * / < > == !
  add(a) ...
  lessThan(a) ...
  equals(a) ...
  not() ...



# Extend class from the outside (only if method not already exists)
extend Person
  toString()
    this.alive = false
    print("I killed you")
    return "personAsString"
  static createUndefinedPerson()
    print("As you wish")
    return new Person(undefined, 4)


# Instantiate Class
var name = new Name("Merlin", "Hof")
var person = new Person(name, 19)


# Powerful String Operations
var text = "Hello World, my name is Merlin, which is an old greek name"
text.substring(0, 9)      # "Hello World"
text.substring(48)        # "greek name"
text.substring("ll", "l") # "llo Worl"
text.indexOf("W", 3, 9)   # 6
text.count("rl")          # 2
text.split(" ")           # ("Hello", "World,", "my", "name", ...)
text.replace("l", "x", 2) # "Hexxo World, my ..."
text.length               # 58
getCharCode("A")          # 65
("T", "SL", "A").join()   # "TSLA"
" hello world  ".trim()   # "hello world"



# Simplified condition checking (classic vs new)
if (a == b & b == c & c != d)
if (a == b == c != d)
-
if (a < b & b < c & c == d & d < e)
if (a < b < c == d < e)
-
if (a == 7 & b == 12 & c == 13 & d == 111)
if ((a, b, c, d) == (7, 12, 13, 111))
-
if (a != undefined & b != undefined & c != undefined & d != undefined)
if ((a, b, c, d) != (undefined, ...))
-
if (a == 7 & b == 8 & c == 9 & d == 10 & e == 11)
if ((a, b, c, d, e) == (7, 8, ...))
-
if (a == 7 | a == 12 | a == 103)
if ((7, 12, 103).contains(a))


# Number Suffixes (Precompiler)
var thousand = 1k               # = 1000
var onePointTwoMillion = 1.2M   # = 1200000
var veryBigInt = 2b             # = 2 (but with thoretically infinite places -> slower)
var time = 80ms                 # = 80 (ms)
var time = 12s                  # = 12000 (ms)
var size = 80%                  # = 0.8
var twentyKilometers = 20km     # = 20000 (m)


# Define own Number Suffixes (Precompiler)
defineSuffix: g 9.81       # (m/s^2) => Earth's Gravitational Acceleration
defineSuffix: G 1000000000 # Giga
defineSuffix: s 1000       # Second
defineSuffix: cm 0.01      # Centimeter
defineSuffix: m 1          # Meter
defineSuffix: km 1000      # Kilometer
defineSuffix: ° 0.017453   # Degrees to radians
if (12km == 12000m)        # Obviously true


# CPU Multithreading
var id = 12
var thread = new Thread(id)
thread.start(callbackHandler, (callback, id)
  intenseCalculation()
  callback("Done :D ")
)


# GPU Multithreading (needs work done!)
# var id = 12
# var gpuTask = new GPUTask(id)
# gpuTask.start((id)
#   var x = 3+4
#   var y = x+5
#   return 2*y
# )


# -----------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------













# -----------------------------------------------------------------------------------
# Example GUI
# -----------------------------------------------------------------------------------

# Live Variables: Changes applied to these variables automatically result in an UI refresh (except if they are static!)
var font1 = new Font("/src/futura.ttf")
var font2 = new Font("/src/americanTypewriter.ttf")
var font3 = new Font("/src/openSans.ttf")
var mainHeaderStyle = style.container
var loginDescription = "Or use your private ID to create a new account"
var headerColor = Color.oceanBlue
static version = "1.2"

# Main Screen UI
component mainScreen
  box: id = header, style = $mainHeaderStyle
  box: id = body, style = container
    box: id = innerBody, style = element + container
    image: id = profileIcon, style = icon, src = "/data/profile.png"
      box: id = nestedBox, style = nestedBox
      box: id = thirdBox, style = nestedBox
      box: id = lulLol, style = idk
  2*canvas: id = myCanvas, style = canvas
  box: id = boxContainer
    12*boxElement: id = box, style = subBoxLul

# UI of another Element
component boxElement
  10*box: id = header, style = container
  image: id = profileIcon, style = icon, src = "/data/profile.png"
  image: id = closeIcon, style = icon, src = "/data/close.png"

# Yet another UI component
component loginScreen
  text: id = loginTitle, style = title, content = "Log in Here!"
  text: id = loginTitle, style = title, content = $loginDescription
  ...


# Styles all the elements in a reusable manner
style all
  font: font1
  color: white
  darkMode: dynamic

style header
  width: 100pw
  height: 50px
  color: $headerColor
  stick: top

style container
  width: 100pw
  height: 100ph
  color: skyBlue
  margin: 7px
  padding: 10px, 20px, 10px, 0px
  cornerRadius: 12px
  orientation: vertical
  centerX: true
  centerY: true

style innerBody extends container
  color: red
  font: font3
  darkMode: disabled
  cornerSmoothing: 20%










# -----------------------------------------------------------------------------------
# Example CleanCode Program with UI
# -----------------------------------------------------------------------------------
;
import CleanCode.basic
import CleanCode.neuralNetwork
import CleanCode.dataBase
import CleanCode.GUI
import "ellipticCurve.cc" as ECC
import "interface.gui"


# Program entry point
main()
  print("Hello World. First app, yeah!")
  var size = new Size(200, 450)
  var window = new Window(size)
  window.isResizeable = false
  window.show()
  modifyGUI()
  wait(20s)
  window.close()

modifyGUI()
  var body = GUI.mainScreen.body
  body.color = Color.oceanBlue
  body.visible = false
  body.centerX = false
  var loginTitle = GUI.loginScreen.loginTitle
  loginTitle.content = "An Error occured. Please try again"

  # Animate an Element
  var boxHeader = GUI.boxElement.header
  boxHeader.animate(width, 0, 1s)
  boxHeader.animate(opacity, 50%, 1s)
  wait(1s)
  boxHeader.animate(width, default, 200ms)

  # Changing a font directly
  var headerStyle = GUI.style.header
  headerStyle.font = GUI.font2

  # Making use of live variables -> automatically updates the UI!
  GUI.headerColor = Color.red
  GUI.loginDescription = "You are banned from creating new accounts! Please reach out to our customer support."

  # Create new UI components and styles (multiline string, not several strings as shown here!)
  var imagePath = "/src/profileImages/d6hj3jf46p.png"
  GUI.createComponent(name,
    "box: id=profileContainer, style=container"
    "  image: id=profileImage, style=image, src=[imagePath]"
  )

  var height = 40
  GUI.createStyle(name,
    "width = 20%"
    "height = [height]px"
    "color = Color.red"
  )

  # Adding and removing components to other components
  GUI.mainScreen.header.addComponent(GUI.myComponent)
  GUI.mainScreen.header.removeComponent(GUI.myComponent)

  # Adding and removing styles from element
  GUI.mainScreen.header.addStyle(GUI.myComponent)
  GUI.mainScreen.header.removeStyle(GUI.myComponent)
  var styles = GUI.mainScreen.header.styles

  # Adding (an) Element(s) directly without the need of creating an component prior.
  GUI.mainScreen.addElement(
    "Box: id = [x], style = myStyle"
    "Img: id = [z], style = icon, src = [y]"
  )

# Click Listener
GUI.boxElement.header.onClick(e)
  print("Hui, I got clicked! Nice!")
  print("My id is: [e.id], my color = [e.color]")
  print("And I am the [e.i] of [e.n] Elements!")
  var rect = new Rectangle(x, y, color, cornerRadius)
  GUI.mainScreen.canvas_3.drawRect(rect)

# Example function. Very Clean :)
getNeuralNetworkError()
  var shape = (12, 10, 10, 10, 8, 5)
  var nn = new NeuralNetwork(shape)
  var inputs = ().fill(0.3, 12)
  var res = nn.predict(inputs)
  var err = sum(0.3-res)/5
  return err

# Single line functions
triple(x) 3*x
isEven(x) x%2==0

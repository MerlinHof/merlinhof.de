class Compiler {
  constructor(option) {
    this.option = option;
    this.names = ["WebApp", "Xcode", "Windows", "Android", "Linux", "Raspberry Pi", "Bootable OS", "Microcontroller", "Terminal"];
    this.icons = ["safari", "apple", "windows", "android", "linux", "raspberry", "disc", "cpu", "terminal"];
    this.project;
  }

  getOptionName() {
    return this.names[this.option];
  }

  getOptionIcon() {
    return this.icons[this.option];
  }

  startCompilation(callback) {
    callback("Started Compilation...");
    let clyteCode = toClyteCode(this.project, callback);
    switch (this.option) {
      case 0:
        compileToWebApp(clyteCode, callback);
        break;
      case 1:
        compileToXcode(clyteCode, callback);
        break;
      case 2:
        compileToWindows(clyteCode, callback);
        break;
      case 3:
        compileToAndroid(clyteCode, callback);
        break;
      case 4:
        compileToLinux(clyteCode, callback);
        break;
      case 5:
        compileToRaspberryPi(clyteCode, callback);
        break;
      case 6:
        compileToBootableOS(clyteCode, callback);
        break;
      case 7:
        compileToMicrocontroller(clyteCode, callback);
        break;
      case 8:
        compileToTerminal(clyteCode, callback);
        break;
    }
  }
}

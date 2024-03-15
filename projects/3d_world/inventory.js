class Inventory {
  #inventoryBar;
  constructor(container) {
    this.items = [];
    let inventoryBar = document.createElement("div");
    inventoryBar.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    inventoryBar.style.display = "flex";
    inventoryBar.style.opacity = "0";
    inventoryBar.style.transform = "scale(0.8)";
    inventoryBar.style.transition = "0.3s";
    inventoryBar.style.padding = "7.5px";
    inventoryBar.style.borderRadius = "30px";
    inventoryBar.style["-webkit-backdrop-filter"] = "blur(10px)";
    inventoryBar.style["backdrop-filter"] = "blur(10px)";
    container.appendChild(inventoryBar);
    this.#inventoryBar = inventoryBar;
  }

  addItem(item) {
    if (!(item instanceof Item)) return;
    let itemElement = document.createElement("div");
    itemElement.style.height = "65px";
    itemElement.style.width = "65px";
    itemElement.style.borderRadius = "15px";
    itemElement.style.borderRadius = "15px";
    itemElement.style.margin = "7.5px";
    itemElement.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
    this.#inventoryBar.appendChild(itemElement);

    let itemImage = document.createElement("img");
    itemImage.src = "src/" + item.icon;
    itemImage.style.width = "100%";
    itemImage.style.height = "100%";
    itemImage.style.padding = "10px";
    itemImage.style.boxSizing = "border-box";
    itemElement.appendChild(itemImage);

    this.items.push({
      itemElement: itemElement,
      item: item
    });

    this.#inventoryBar.style.opacity = "1";
    this.#inventoryBar.style.transform = "scale(1)";
  }

  containsItem(name) {
    for (let item of this.items) {
      if (item.item.name == name) return true;
    }
    return false;
  }

  removeItem(name) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].item.name != name) continue;
      this.items[i].itemElement.remove();
      this.items.splice(i, 1);
      break;
    }
    if (this.items.length > 0) return;
    this.#inventoryBar.style.opacity = "0";
    this.#inventoryBar.style.transform = "scale(0.8)";
  }

  update() {

  }
}



class Item {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
}

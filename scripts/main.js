import { startBackgroundAnimation, smoothScrollTo } from "./general.js";
import DOM from "./dom.js";

// Global Variables and Elements
let screenHeight = window.innerHeight;
let projects;

// Initial Setup
setTimeout(async () => {
   startBackgroundAnimation();
   projects = await (await fetch("projects.json")).json();
}, 200);

// Start SVG Animation
async function startSvgAnimation() {
   const merlinSvgString = await (await fetch("/assets/images/ui/immerlin.svg")).text();
   let merlinSvgElement = new DOMParser().parseFromString(merlinSvgString, "image/svg+xml").documentElement;
   merlinSvgElement.id = "handwritingSvg";
   DOM.select("svgContainer").getFirstElement().appendChild(merlinSvgElement);
}
startSvgAnimation();

// Scroll Image Parallax Effects
window.addEventListener("scroll", () => {
   DOM.select(".projectElementImage").forEvery((elem) => {
      const image = new DOM([elem]);
      if (image.getTop() > -image.getHeight() && image.getTop() < screenHeight + 100) {
         let progress = (image.getTop() + image.getHeight() - 60) / (screenHeight + image.getHeight());
         image.setStyle({ objectPosition: `50% ${100 * progress}%` });
      }
   });
});

// Show Projects
DOM.select("sectionButtonDev").onClick(() => {
   selectSectionButton(DOM.select("sectionButtonDev"));
   showListContainer(projects.code);
});

// Show Texts
DOM.select("sectionButtonText").onClick(() => {
   selectSectionButton(DOM.select("sectionButtonText"));
   showListContainer(projects.texts);
});

// Show Designs
DOM.select("sectionButtonDesign").onClick(() => {
   selectSectionButton(DOM.select("sectionButtonDesign"));
   showListContainer(projects.designs);
});

// Show About Me
DOM.select("sectionButtonBio").onClick(() => {
   selectSectionButton(DOM.select("sectionButtonBio"));
   buildBioUi();
});

// Selects the specified sectionButton and dis-selects all others
function selectSectionButton(button) {
   DOM.select(".sectionButton").forEvery((elem) => {
      elem.classList.remove("selected");
   });
   button.addClass("selected");
}

// Shows the list container and fills it with the passed data
function showListContainer(data) {
   DOM.select("contentContainer").setContent("");
   for (let obj of data) {
      if (!obj.active) continue;

      if (obj.image != undefined && obj.images == undefined) {
         DOM.create("div.projectElementContainer")
            .append(DOM.create("t.title.projectElementTitle").setText(obj.title))
            .append(DOM.create("div.projectElementImageContainer").append(DOM.create(`img.projectElementImage [src=/assets/images/previews/${obj.image}]`)))
            .append(DOM.create("t.text.projectElementDescription").setText(obj.description))
            .onClick(() => {
               window.open(obj.url, "_blank");
            })
            .appendTo(DOM.select("contentContainer"));
      } else {
         let container = DOM.create("div.projectElementContainer.designElementContainer")
            .append(DOM.create("t.title.projectElementTitle").setText(obj.title))
            .append(DOM.create("t.text.projectElementDescription").setText(obj.description))
            .appendTo(DOM.select("contentContainer"));
         for (let image of obj.images) {
            container.append(DOM.create(`img.designImage [src=/assets/images/designs/${image}]`));
         }
      }
   }
   smoothScrollTo(screenHeight - 130, 1000);
}

// Build the UI of the AboutMe Container
function buildBioUi() {
   DOM.select("contentContainer").setContent("");
   let bio = projects.bio;

   let content = DOM.create("div #bioContainer")
      .append(DOM.create("div #bioImageContainer").append(DOM.create(`img #bioImage [src=/assets/images/ui/${bio.profileImage}]`)))
      .append(DOM.create("t.title #bioTitle").setText(bio.title))
      .append(DOM.create("t.text #bioText").setContent(bio.description))
      .appendTo(DOM.select("contentContainer"));

   let buttonContainer = DOM.create("div").appendTo(content);
   for (let action of bio.actions) {
      buttonContainer.append(
         DOM.create("div.button.flatButton")
            .onClick(() => {
               window.open(action.href, "_blank");
            })
            .append(DOM.create(`img.buttonImage [src=/assets/images/ui/${action.icon}]`))
            .append(action.text),
      );
   }
   smoothScrollTo(screenHeight - 130, 1000);
}

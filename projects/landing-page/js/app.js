/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const scrollingTimeoutInMs = 400;
const resizingTimeoutInMs = 100;
const page_top = document.getElementById("absolute_top");
const header = document.getElementById("header");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getLineHeightOfParagraph() {
  let firstParagreph = document.getElementsByTagName("p")[0];
  let fontSize = window.getComputedStyle(firstParagreph, null).getPropertyValue('line-height');
  return parseFloat(fontSize) + 1;
}

function onEndScrolling() {
  header.classList.remove('hide');
  header.classList.add('show');
  console.log("End of scrolling");
}

function onEndResizing() {
  let text_blocks = document.getElementsByClassName("section-text");

  for (let text_block of text_blocks) {
    if (text_block.classList.contains("show")) {
      text_block.style.maxHeight = text_block.scrollHeight + getLineHeightOfParagraph() + 'px';
    } else {
      text_block.style.maxHeight = 0;
    }
    text_block.style.overflow = 'hidden';
  }
}

/**
 * End Helper Functions

 * Begin Main Functions
 *
*/

// Nav Bar
const sections = document.getElementsByTagName('section');
const sectionCount = sections.length;
//console.log("Section Count " + sectionCount);

const navBar = document.querySelector('nav');
const navBarList = document.getElementById('navbar__list');
const navBarListContainer = document.createDocumentFragment();
let navBarElements = [];

const topNavElement = document.createElement('li');
topNavElement.textContent = "Top";
topNavElement.classList.add('menu-option');
topNavElement.addEventListener('click', function() {
  window.scroll({
    top: 0,
    behavior: "smooth"
  });
});

navBarListContainer.appendChild(topNavElement);
navBarElements.push(topNavElement);

for (let section of sections) {
  const sectionLabel = section.dataset.nav;
  const newNavElement = document.createElement('li');
  newNavElement.textContent = sectionLabel;
  newNavElement.classList.add('menu-option');
  newNavElement.addEventListener('click', function() {
    section.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    });
  });
  navBarListContainer.appendChild(newNavElement);
  navBarElements.push(newNavElement);
  //console.log(section.dataset.nav);
}

navBarList.appendChild(navBarListContainer);


// Scroll Listening
// Add class 'active' to section when near top of viewport

let endScrollingTimer;

document.addEventListener('scroll', function() {
  // Setup Timeout
  clearTimeout(endScrollingTimer);
  endScrollingTimer = setTimeout(onEndScrolling, scrollingTimeoutInMs);

  // Hide the header
  header.classList.remove('show');
  header.classList.add('hide');

  // Finding the Closest section
  let closerSection = page_top;
  let closerVerticalDistance = window.pageYOffset;
  //console.log(closerVerticalDistance);

  for (let sectionIndex = 0; sectionIndex < sections.length; ++sectionIndex) {
    const currentVerticalDistance = Math.abs(sections[sectionIndex].getBoundingClientRect().y);

    if (currentVerticalDistance < closerVerticalDistance) {
      closerSection = sections[sectionIndex];
      closerVerticalDistance = currentVerticalDistance;
    }
  }

  topNavElement.style.visibility = closerSection === page_top ? 'hidden' : 'visible';

  // Changing the Nav Bar element classes to highlight the closest visible section
  for (let sectionIndex = 0; sectionIndex < sections.length; ++sectionIndex) {
    const section = sections[sectionIndex];
    const navBarElement = navBarElements[sectionIndex + 1]; // Taking "Top" into account

    if (section === closerSection) {
      section.classList.add('your-active-class');
      navBarElement.classList.add('menu-option-active');
      navBarElement.classList.remove('menu-option');
    } else {
      section.classList.remove('your-active-class');
      navBarElement.classList.remove('menu-option-active');
      navBarElement.classList.add('menu-option');
    }
  }
  //console.log("Closer section is " + closerSection.dataset.nav);
});

// Collapsible sections
let collapse_labels = document.getElementsByClassName("collapsible");
let text_blocks = document.getElementsByClassName("section-text");

for (let i = 0; i < text_blocks.length; ++i) {
  collapse_labels[i].addEventListener('click', () => {
    text_blocks[i].classList.toggle("show");
    text_blocks[i].classList.toggle("hide");

    if (text_blocks[i].classList.contains("show")) {
      collapse_labels[i].textContent = "[-]";
      text_blocks[i].style.maxHeight = text_blocks[i].scrollHeight + getLineHeightOfParagraph() + 'px';
    } else {
      collapse_labels[i].textContent = "[+]";
      text_blocks[i].style.maxHeight = 0;
    }
  });
}

let endResizingTimer;

function onEndResing() {
  // Setup Timeout
  clearTimeout(endResizingTimer);
  endResizingTimer = setTimeout(onEndResizing, resizingTimeoutInMs);

  for (let text_block of text_blocks) {
    text_block.style.maxHeight = 'none';
    text_block.style.overflow = 'visible';
  }
}

window.addEventListener('resize', onEndResing);
onEndResing();

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

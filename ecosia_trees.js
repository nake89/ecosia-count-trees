const tree = document.getElementsByClassName("tree-counter-text")[0];
const numberOfSearches = Number(tree.innerText.replace(",", "").trim());
const numberOfTreesPlanted = Math.floor(numberOfSearches / 45);
const searchesTillNextTreePlanted = numberOfSearches % 45;
ele = document.createElement("div");

ele.className = "treeCount";
ele.style.setProperty("font-size", "small");
ele.innerHTML = `Searches: <b>${numberOfSearches}</b><br>
Trees planted: <font color="green"><b>${numberOfTreesPlanted}</b></font><br>
Searches till next tree: <b>${45 - searchesTillNextTreePlanted}</b>
`;
tree.parentNode.insertBefore(ele, tree.nextSibling);

// Hide original number
tree.style.setProperty("display", "none");

const jsTreeCountPopover = document.getElementsByClassName(
  "js-treecount-popover"
)[1];
jsTreeCountPopover.style.setProperty("height", "200%");

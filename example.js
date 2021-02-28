
function getNumber(id) {
  let content = document.getElementById(id);
  let full = content.getElementsByClassName("sedy");
  if (full.length === 0) {
    return null;
  } else {
    return full[0].innerHTML;
  }
}

let number = getNumber("right");
if (number) {
  console.log(number);
} else {
  console.log("Box is empty");
}

let arr = [];
for (let i = 0; i < 81; i++) {
  let r;
  if (i == 0) {
    r = getNumber(`right`);
  } else {
    r = getNumber(`right${i}`);
  }

  if (r) {
    arr.push(Number(r));
  } else {
    arr.push(0);
  }
}

let sudoku = [];
let s = 0;
for (let a = 0; a < 9; a++) {
  sudoku[a] = [];
  for (let b = 0; b < 9; b++) {
    sudoku[a].push(arr[s]);
    s++;
  }
}

console.log(JSON.stringify(sudoku));

var myDiv = document.createElement("button");
myDiv.name = "trigger";
myDiv.innerText = "Export Array";
let solutionbutton = document.getElementById("wrapper");
console.log(solutionbutton);
solutionbutton.appendChild(myDiv);

var myModal = document.createElement("div");
myModal.id = "content";
myModal.style = "display: none;";
myModal.setAttribute("aria-hidden", "true");
myModal.innerText = JSON.stringify(sudoku);
document.body.appendChild(myModal);
// Your CSS as text
var styles = `
/* Only WebKit requires a prefix */
@-webkit-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.overlay {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, .5);
}

.modal {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 80%;
	height: 80%;
	margin: auto;
	background: #FFF;
	-webkit-animation: fadeIn .5s;
	animation: fadeIn .5s;
}

.modal__wrapper {
	overflow: auto;
	height: 100%;
}

.modal__content {
	padding: 1em;
}

`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

(function (name, context, definition) {
  if (typeof define === "function" && define.amd) {
    define(definition);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = definition();
  } else {
    context[name] = definition();
  }
})("Modal", this, function () {
  "use strict";

  /**
   * Modal
   * @constructor
   * @param {HTMLElement} element
   */
  function Modal(element) {
    this.target = element;

    if (!this.isOpen) {
      this._init();
    }
  }

  /**
   * Init
   * @private
   */
  Modal.prototype._init = function () {
    var self = this;

    this.overlay = document.createElement("div");
    this.overlay.className = "overlay";
    this.overlay.setAttribute("tabindex", -1);

    this.modalWindow = document.createElement("div");
    this.modalWindow.className = "modal";
    this.modalWindow.setAttribute("role", "dialog");
    this.modalWindow.setAttribute("tabindex", 0);

    this.modalWrapper = document.createElement("div");
    this.modalWrapper.className = "modal__wrapper";

    this.modalContent = document.createElement("div");
    this.modalContent.className = "modal__content";

    this.closeButton = document.createElement("button");
    this.closeButton.className = "modal__close";
    this.closeButton.innerHTML = "Close";
    this.closeButton.setAttribute("type", "button");

    this.closeButton.onclick = function () {
      self.close();
    };

    this.escapeHandler = function (e) {
      if (e.keyCode === 27) {
        self.close();
      }
    };

    this.focusHandler = function (e) {
      if (!self.modalWrapper.contains(e.target)) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }

        self.modalContent.focus();
      }
    };

    this.modalWindow.appendChild(this.modalWrapper);
    this.modalWrapper.appendChild(this.modalContent);
    this.modalWindow.appendChild(this.closeButton);

    this.trigger = null;
    this.isOpen = false;
  };

  /**
   * Open
   * @param {String} content
   */
  Modal.prototype.open = function (content, callback) {
    if (this.isOpen) {
      return;
    }

    if (content) {
      this.update(content);
    }

    // Hide all background content from focus
    for (var i = 0, len = this.target.children.length; i < len; i++) {
      this.target.children[i].setAttribute("aria-hidden", true);
    }

    this.target.appendChild(this.overlay);
    this.target.appendChild(this.modalWindow);

    if (window.addEventListener) {
      window.addEventListener("focus", this.focusHandler, false);
      window.addEventListener("keyup", this.escapeHandler, false);
    } else {
      window.attachEvent("onfocus", this.focusHandler);
      window.attachEvent("onkeyup", this.escapeHandler);
    }

    this.trigger = document.activeElement;
    this.modalWindow.focus();

    this.isOpen = true;

    if (callback) {
      callback.call(this);
    }
  };

  /**
   * Update
   * @param {String} content
   */
  Modal.prototype.update = function (content) {
    this.modalContent.innerHTML = content;
  };

  /**
   * Close
   */
  Modal.prototype.close = function (callback) {
    if (window.removeEventListener) {
      window.removeEventListener("focus", this.focusHandler, false);
      window.removeEventListener("keyup", this.escapeHandler, false);
    } else {
      window.detachEvent("onfocus", this.focusHandler);
      window.detachEvent("onkeyup", this.escapeHandler);
    }

    this.target.removeChild(this.modalWindow);
    this.target.removeChild(this.overlay);

    for (var i = 0, len = this.target.children.length; i < len; i++) {
      this.target.children[i].removeAttribute("aria-hidden");
    }

    if (this.trigger) {
      this.trigger.focus();
      this.trigger = null;
    }

    this.isOpen = false;

    if (callback) {
      callback.call(this);
    }
  };

  /**
   * Teardown
   */
  Modal.prototype.teardown = function () {
    if (this.isOpen) {
      this.close();
    }

    delete this.escapeHandler;
    delete this.focusHandler;

    delete this.closeButton;
    delete this.modalContent;
    delete this.modalWrapper;
    delete this.modalWindow;
    delete this.overlay;

    delete this.trigger;
    delete this.isOpen;
  };

  return Modal;
});

/* Init */
var trigger = document.querySelector("[name=trigger]");
var content = document.getElementById("content");
var instance = new Modal(document.body);

trigger.onclick = function () {
  instance.open(content.innerHTML);
};

var outerwindow = document.createElement('div');
var outerScreen = document.createElement('div');
outerwindow.setAttribute('id', 'outerwindow');
outerwindow.classList.add('smartdual-secondary-window');
outerScreen.setAttribute('id', 'outerscreen');
outerScreen.classList.add('smartdual-secondary-windowheader');
outerScreen.innerHTML = '📺 Remote Window';

dualwindow = document.createElement('iframe');
dualwindow.setAttribute('src', 'https://www.google.co.in/');
dualwindow.classList.add('smartdual-dualwindowscreen');
outerScreen.append(dualwindow);

outerwindow.append(outerScreen);
document.getElementsByTagName('body')[0].append(outerwindow);

//Make the DIV element draggagle:
dragElement(document.getElementById('outerwindow'));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById('outerscreen')) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById('outerscreen').onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

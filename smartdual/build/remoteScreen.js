var globalURL = '';

(function () {
  // Want to retrieve the parameter passed from eventpage.js here
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

  chrome.runtime.onMessage.addListener(function (message) {
    globalURL = message.url;

    var outerwindow = document.createElement('div');
    var outerScreen = document.createElement('div');
    outerwindow.setAttribute('id', 'outerwindow');
    outerwindow.classList.add('smartdual-secondary-window');

    outerScreen.setAttribute('id', 'outerscreen');
    outerScreen.classList.add('smartdual-secondary-windowheader');
    outerScreen.innerHTML = `<img src="${message.logo}" width="13px" height="auto" /> &nbsp; smartdual window`;

    dualwindow = document.createElement('iframe');
    dualwindow.setAttribute('src', globalURL);
    dualwindow.setAttribute('width', '800px');
    dualwindow.classList.add('smartdual-windowframe');
    dualwindow.setAttribute('height', '500px');
    dualwindow.classList.add('smartdual-dualwindowscreen');

    outerwindow.append(outerScreen);
    outerwindow.append(dualwindow);
    document.getElementsByTagName('body')[0].prepend(outerwindow);

    //Make the DIV element draggagle:
    dragElement(document.getElementById('outerwindow'));

    //use receivedParameter as you wish.
  });
})();

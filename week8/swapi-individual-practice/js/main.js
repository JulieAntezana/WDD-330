


// The JavaScript code that makes the display active.



/*****************Dynamic Table of Contents*********/

var swlist = [
  {
    label: 'People',
    url: "./people.html"
  },
  {
    label: "Planets",
    url: "./planets.html"
  },
  {
    label: 'Ships',
    url: "./ships.html"
  },
  {
    label: 'Films',
    url: "./films.html"
  }
];
swListItems(swlist,"swList");

// create the href list (table of contents)
function swListItems(swItems, listElementName) {
  //let ol = document.getElementById(listElementName);
  let ol = window.swList;
  if(ol) {

    //loop through anonymous objects
    swItems.forEach(element => {

      //create the anchor and set attributes
      let anchor = document.createElement('a');
        anchor.innerHTML = element.label;
        anchor.href = element.url;
        anchor.target="_blank";

      //create list item and attach anchor
      let li = document.createElement('li');
        li.appendChild(anchor);

        ol.appendChild(li);

    });

  }
}
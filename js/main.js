// The JavaScript code that makes the display active.

/*****************Dynamic Table of Contents*********/

var weeklist = [
  {
    label: 'Week 1',
    url: "./week1/week1.html"
  },
  {
    label: "Week 2",
    url: "./week2/week2.html"
  },
  {
    label: 'Week 3',
    url: "./week3/week3.html"
  },
  {
    label: 'Week 4',
    url: "./week4/week4.html"
  }
];
listWeeklyItems(weeklist,"weekList");

// create the href list (table of contents)
function listWeeklyItems(weekItems, listElementName) {
  //let ol = document.getElementById(listElementName);
  let ol = window.weekList;
  if(ol) {

    //loop through anonymous objects
    weekItems.forEach(element => {

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

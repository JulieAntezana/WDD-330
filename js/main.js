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
  },
  {
    label: 'Week 5',
    url: "./week5/week5.html"
  },
  {
    label: 'Week 6',
    url: "./week6/week6.html"
  },
  {
    label: 'Week 7',
    url: "./week7/week7.html"
  },
  {
    label: 'Week 8',
    url: "./week8/week8.html"
  },
  {
    label: 'Week 9',
    url: "./week9/week9.html"
  },
  {
    label: 'Week 10',
    url: "./week10/week10.html"
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

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
/* <div id="hour-9" class="row time-block past">
        <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
</div> */

const currentDayEl = $('#currentDay');
const plannerBodyEl = $('#plannerBody');
const workHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

const currentDateTime = () => {
  let bigDateEnergy = $('<p>');
  let dayJs = dayjs().format('dddd D/M, h:mmA');
  bigDateEnergy.text(dayJs);
  currentDayEl.append(bigDateEnergy);
};

const createBlocks = () => {
  for (let i = 0; i < workHours.length; i++){
    let timeBlock = $('<div>');
    let textArea = $('<textarea>');
    let saveButton = $('<button>');
    timeBlock.addClass('row time-block');
    timeBlock.html(`<div class="col-2 col-md-1 hour text-center py-3"> ${workHours[i]} </div>`);
    timeBlock.attr('id', `${workHours[i]}`);

    textArea.addClass('col-8 col-md-10 description');
    textArea.attr('rows', '3');
    let textAreaText = JSON.parse(localStorage.getItem(timeBlock.attr('id')));
    if (!textAreaText){
      textArea.text('');
    } else {
      textArea.text(`${textAreaText}`);
    };

    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
    saveButton.html('<i class="fas fa-save" aria-hidden="true"></i>');

    saveButton.on('click', () => {
      localStorage.setItem(`${timeBlock.attr('id')}`, JSON.stringify(`${textArea.val()}`));
    });
    timeBlock.append(textArea, saveButton);
    plannerBodyEl.append(timeBlock);
  }
}

currentDateTime();
createBlocks();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// blocks for 9-5
// past/present/future depending on time
// 

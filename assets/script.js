const currentDayEl = $('#currentDay');
const plannerBodyEl = $('#plannerBody');
const workHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

$(function createBlocks() {
  // renders current date/time at the top of the page
  let bigDateEnergy = $('<p>');
  let dayJs = dayjs().format('dddd M/D, h:mmA');
  bigDateEnergy.text(dayJs);
  currentDayEl.append(bigDateEnergy);

  // returns current hour in 24-hour time
  const getHour = () => {
    return dayjs().hour();
  };

  // 
  for (let i = 0; i < workHours.length; i++){
    let timeBlock = $('<div>');
    let textArea = $('<textarea>');
    let saveButton = $('<button>');

    // time blocks w/ differing class states
    timeBlock.addClass('row time-block');
    // compares current hour with what the equivalent hour would be for each time block
    if (getHour() < i + 9){
      timeBlock.addClass('future');
    } else if (getHour() === i + 9){
      timeBlock.addClass('present');
    } else if (getHour() > i + 9){
      timeBlock.addClass('past');
    }
    timeBlock.html(`<div class="col-2 col-md-1 hour text-center py-3"> ${workHours[i]} </div>`);
    timeBlock.attr('id', `${workHours[i]}`);

    // text area w/ persistent text storage
    textArea.addClass('col-8 col-md-10 description');
    textArea.attr('rows', '3');
    let textAreaText = JSON.parse(localStorage.getItem(timeBlock.attr('id')));
    if (!textAreaText){
      textArea.text('');
    } else {
      textArea.text(`${textAreaText}`);
    };

    // save button generation w/ event listener
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
    saveButton.html('<i class="fas fa-save" aria-hidden="true"></i>');
    saveButton.on('click', () => {
      localStorage.setItem(`${timeBlock.attr('id')}`, JSON.stringify(`${textArea.val()}`));
    });
    
    timeBlock.append(textArea, saveButton);
    plannerBodyEl.append(timeBlock);
  };
});
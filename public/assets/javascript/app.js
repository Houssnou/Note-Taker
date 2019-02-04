$(document).ready(function () {
    // on load display all notes from db
    //build the content of our accordion 
    //ajax call 
    // call the API tables
    $.ajax({
        url: "/api/notes",
        method: "GET"
      })
      .then(function (notes) {
        console.log(notes);
        notes.forEach((note, index) => {
          //accordion is just a card with header and body so lets have fun.
          //lets create an object noteObj that contains all the note[i] info
          const noteObj = {
            id: note.id,
            title: note.title,
            content: note.content,
            created: moment(note.date_creation).format("YYYY-MM-DD h:mm:ss a"),
            updated: moment(note.last_modification).format("YYYY-MM-DD h:mm:ss a")
          }
          //build the card
          const $card = $("<card>");

          //the header
          const $cardheader = $(`<div class='card-header text-align' id='heading${index+1}'>`);
          //div row to wrap the line : title dates actions
          //inside the header we will have a row with 3colums 2-8-2
          const $row = $("<div class='row align-items-center'>");
          const $colTitle = $("<div class='col-2 d-flex align-content-start'>");
          const $colDates = $("<div class='col-8 d-flex align-content-start'>");
          const $colActions = $("<div class='col-2 d-flex justify-content-end'>");

          //inline style to be removed later #collapse-link {color: black; font-weight: bold; text-decoration: none;
          //button to make the title clikable
          const $buttonTitle = $(
            `<button class='btn btn-link' type='button' 
                              data-toggle='collapse' data-target='#note${index+1}'
                              aria-expanded='false' aria-controls='note${index+1}'
                              style='color: black; font-weight: bold; text-decoration: none'>`
          ).text(note.title).appendTo($colTitle);

          //build the line //build the line: Note 1 created: modified edit and suppress icon 
          const $spanCreated = $("<span class='mr-2'>").text("Created :").appendTo($colDates);
          const $spanCreatedContent = $("<span style='font-weight: bold'>").text(` ${moment(note.date_creation).format("ddd, MMM Do YYYY, h:mm a")}`).appendTo($colDates);
          const $spanLastAccess = $("<span class='mx-2'>").text("Last access :").appendTo($colDates);
          const $spanLastAccessContent = $("<span style='font-weight: bold'>").text(`  ${moment(note.last_modification).format("ddd, MMM Do YYYY, h:mm a")}`).appendTo($colDates);

          //$("<i class='fas fa-edit'>")
          const $update = $("<span class='fas fa-edit text-warning'>").appendTo($colActions);

          const $delete = $("<span class='fas fa-trash-alt text-danger'>").appendTo($colActions);

          //link the data to the button to be able to use it on click on the button
          $update
            .attr("id", "update")
            .attr("data-toggle", "modal")
            .attr("data-target", "#update-modal");

          $delete
            .attr("id", "delete")
            .attr("data-toggle", "modal")
            .attr("data-target", "#delete-modal");

          // Using the data method to append more data 
          $update.data("data-note", note);
          $delete.data("data-note", note);

          //append them to the 
          //$cardheader.append($buttonTitle, $spanCreated, $spanModified, $update, $delete);
          $row.append($colTitle, $colDates, $colActions);
          $cardheader.append($row);

          //the body
          const $divCollapse = $(
            `<div id='note${index+1}' aria-labelledby='heading${index+1}' data-parent='#accordion'>`);

          //quick check to determine if it should be a class collapse show or not        
          (index === 0) ? $divCollapse.addClass("collapse show"): $divCollapse.addClass("collapse");

          const $cardBody = $("<div class='card-body'>");
          $cardBody.text(note.content).appendTo($divCollapse);

          //build the card content
          $card.append($cardheader, $divCollapse).appendTo("#accordion");
        });
      });

    //event listener for a click on submit
    $("#add-note").on("click", (event) => {
      //avoid reload page
      event.preventDefault();

      //build an object newNote with the input values and auto generate the creation and modification date using moment()
      const newNote = {
        title: $("#title-input").val().trim(),
        content: $("#content-input").val().trim(),
        date_creation: moment().format("YYYY-MM-DD HH:mm:ss"),
        last_modification: moment().format("YYYY-MM-DD HH:mm:ss")
      };
      console.log(newNote);
      //ajax call
      $.ajax({
        url: "/api/notes",
        method: "POST",
        data: newNote
      }).then(data => {
        //inform the user
        alert("Note Saved Successfully!");
        //then clear form inputs
        $("#title-input").val("");
        $("#content-input").val("");
        //reload the page
        location.reload();
      });
    });

    //listener for a click on action icon update
    $(document).on("click", "#update", function () {
      //get the values back from the data ()
      const updateNote = $(this).data("data-note");

      //console.log(updateNote);

      //send data to the modal
      $("#title-modal").val(updateNote.title);
      $("#content-modal").val(updateNote.content);

      //confirm-update-modal
      $(document).on("click", "#confirm-update", function (event) {
        //build the update data
        //get the values of the update
        const updateData = {
          id: updateNote.id,
          title: $("#title-modal").val(),
          content: $("#content-modal").val(),
          last_modification: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        console.log(updateData);
        //do the ajax call 
        $.ajax({
          url: "/api/notes/"+updateNote.id,
          method: "PUT",
          data: updateData
        }).then(data => {
          //inform the user
          alert("Note Updated Successfully!");

          //get rid of the modal
          $("#update-modal").modal("dispose");

          //reload the page
          location.reload();
        });
      });
    });

    //listener for a click on action icon delete
    $(document).on("click", "#delete", function () {
      //get the values back from the data ()
      const deleteNote = $(this).data("data-note");

      console.log(deleteNote);

      //send the data to the modal
      //confirm delete
      $(document).on("click", "#confirm-delete", function (event) {
        //call ajax /api/delete
        $.ajax({
          url: "/api/notes",
          method: "DELETE",
          data: deleteNote
        }).then(data => {

          //inform the user
          alert("Note Successfully deleted!");
          //reload the page
          location.reload();
        });

      });

    });

    //event listener for a click on search
    $("#search").on("click", (event) => {
      //avoid reload page
      event.preventDefault();

      //get the values back from the data ()
      //get the input value
      const searchValue=$("#search-input").val().trim();

      console.log(searchValue);
      console.log("----------");
      console.log(`/api/notes/${searchValue}`)
      $.ajax({
        url: "/api/notes/"+searchValue,
        method: "GET",
        //data:
      })
      .then(function (notesFound) {
        //console.log(`Search result: ${notesFound.length}`);
        //console.log(notesFound);

        alert(`${notesFound.length} note(s) found!`);
        //clear the search input
        $("#search-input").val("");

        //reload the page
        location.reload();
      });
    });

  });

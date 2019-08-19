var app = document.getElementById('root');

//Target API and endpoints
const constants = {
    //filmsSource: "/api.json",
    filmsSource: "https://swapi.co/api/films/",
    moviesAPI: 'http://localhost:8080/movies',
    countries: 'http://localhost:8080/countries',
}

var darkSideButton = document.getElementById('darkSideButton');
darkSideButton.onclick = function() {
    location.href = constants.countries;
};


//Empty array where to store data for EDIT/UPDATE
window.storage = [];


// Get JSON data from API with GET request
const starwarsApp = {
    show: function show(submitEvent) {
        submitEvent.preventDefault();
        const inputValue = submitEvent.currentTarget[0].value;
        if (inputValue < 8 && inputValue >= 1) {
            fetch(constants.filmsSource)
                .then(response => response.json())
                .then((data) => {

                    // Get the input field
                    var obj = data.results[inputValue - 1];
                    window.moviesData = obj;
                    if (obj.episode_id = inputValue) {
                        $("#saveButton").show();
                        $("#content").show();
                        $("#content1").html(`Star Wars ${obj.episode_id} : ${obj.title}`);
                        $("#content2").html(obj.director);
                        $("#content3").html(obj.release_date);
                        $("marquee").remove();
                        $('#input').val('');


                    }
                }, (error) => console.error(error));
        } else {
            var errorMessage = document.createElement('marquee');
            errorMessage.setAttribute('direction', 'up');
            errorMessage.textContent = `ERROR: BETTER JEDI YOU CAN DO: 7 MOVIES THERE IS :ERROR`;
            app.appendChild(errorMessage);
            console.log(errorMessage)
            $("#content").hide();
            $("table").hide();
            $("#saveButton").hide();

        }

    },


    //Set for saving to database with Spring - function
    //Payload - JS was not reading underscore properly and was not saving to database
    save: function save() {
        const payload = {
            title: moviesData.title,
            episodeId: moviesData.episode_id,
            director: moviesData.director,
            releaseDate: moviesData.release_date
        }
        starwarsApp.store(payload);
    },


    //Store payload for edit/update function(should create PATCH in controller!)
    store: function(payload) {
        fetch(constants.moviesAPI, {
            body: JSON.stringify(payload),
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }


        })


        .then(function moviesAdd() {
            $("table").show();
            starwarsApp.getAll();

        })
    },


    //Get all data from  database and append to table in HTML
    getAll: function getAllMovies() {
        $('table tbody').html('');
        window.storage = [];
        fetch(constants.moviesAPI)
            .then(response => response.json())
            .then(movies => movies.forEach(movie => starwarsApp.appendToTable(movie)));
    },



    // Appending data to the table in HTML
    appendToTable: function appendToTable(movie) {

        storage.push(movie)
        $("#dataTable tbody").append(
            `<tr>
            <td><button type='button' onclick='starwarsApp.movieEdit(${movie.id},this);' class='btn btn-outline-primary editbtn'>EDIT</button></td> 
            <td>${movie.director}</td>
            <td>${movie.releaseDate}</td>
            <td>${movie.title}</td>
            <td>${movie.episodeId}</td>
            <td><button type='button' onclick='starwarsApp.delete(${movie.id});' class='btn btn-danger'>DELETE</button></td>
            </tr>`
        );

    },


    //Delete from database function
    delete: function removeMovie(id) {

        fetch(`${constants.moviesAPI}/${id}`, {
            method: 'DELETE'
        }).then(() => {
            starwarsApp.getAll();
        }).catch(err => {
            console.error(err)
        });
    },



    //Edit and update to database function
    movieEdit: function movieEdit(id, el) {
        var editData = $(el).parents('tr').find('td');
        if ($(el).html() == 'EDIT') {
            $.each((editData), function() {
                $(this).prop('contenteditable', true)
            });
            $(el).html('UPDATE');
            $(editData[5]).fadeOut();
        } else {
            $.each(editData, function() {
                $(this).prop('contenteditable', false)

            });
            $(editData[5]).fadeIn();
            $(el).html('EDIT');
            const payload = window.storage.find(movie => movie.id == id);
            payload.director = editData[1].innerText;
            payload.releaseDate = editData[2].innerText;
            payload.title = editData[3].innerText;
            payload.episodeId = editData[4].innerText;
            starwarsApp.store(payload);
        }


    }

}


//Get data about movie
document.forms["search"].addEventListener("submit", starwarsApp.show);

//Save to database
document.getElementById('saveButton').addEventListener("click", starwarsApp.save);
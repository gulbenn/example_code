function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort all rows
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // add again the new sorted rows
    tBody.append(...sortedRows);

    // column sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".product-table th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

//Delete products in database

function resetTable(){
    $.ajax({
        url: "https://webtech.labs.vu.nl/api24/3d0c8497/reset,
        method: "GET",
        success: function () {
            getProducts()
        }
    })
}


$("#reset").click(resetTable);

//Geting Products from the database

function getProductsFromDatabase() {
    let requestData = {}
    $.ajax({
        url: "",
        method: "GET",
        data: requestData,
        dataType: "json"
    })
      .done(function (data) {
        console.log(data)
    })
}


//Get elements from database for HTML table

function getProducts() {
    
    let requestData = []
    $.ajax({
        url: "https://webtech.labs.vu.nl/api24/3d0c8497",
        method: "GET",
        data: requestData,
        dataType: "json"
    }).done(function (data) {
        $("#productTable tbody").empty()
        data.forEach(function(element){
            let tr = "<tr>"
            tr = tr.concat("<td class='movie'>" + element.movie + "</td>")
            tr = tr.concat("<td class='year'>"+ element.year + "</td>")
            tr = tr.concat("<td class='genre'>" + element.genre + "</td>")
            tr = tr.concat("<td class='description'>" + element.description + "</td>")
            tr = tr.concat("<td> <img src=" + '"' + element.image + '"' + " alt='harry'></td>")


            $('#productTable tbody').append(tr)
        })
    })
}



function addItem(event) {

    let movie = $("#movie").val()
    let year = $("#year").val()
    let genre = $("#genre").val()
    let description = $("#description").val()
    let image = $("#image").val()


    $.ajax({
        url: "https://webtech.labs.vu.nl/api24/3d0c8497",
        method: "POST",
        data: {
            "movie": movie,
            "year": year,
            "genre": genre,
            "description": description,
            "image": image,

        },
        dataType: "json",
        success: function (data) {
            getProducts()
        }
    })
    event.preventDefault();
}




$(function () {
    getProducts()
    $("#getElemets").click(getProductsFromDatabase)
    $("#reset").click(resetTable);
    $("#submitButton").click(addItem);
})

/*
ERROR IDENTIFICATION AND CORRECTIONS

Error 1 (grade.html, Line 9):
Added return before checkMark() to prevent unwanted form submission.

Error 2 (grade.html, Line 17):
Changed showtable() to showTable().

Error 3 (grade.html, Line 19):
Corrected JavaScript filename from grades.js to grade.js.

Error 4 (grade.js, Line 5):
Changed assignment operator (=) to comparison operator (===).

Error 5 (grade.js, Line 9):
Changed isNan() to isNaN().

Error 6 (grade.js, Line 14):
Changed && to || to check both mark boundaries.

Error 7 (grade.js, Line 28):
Changed getElementByID() to getElementById().

Error 8 (grade.js, Line 30):
Changed style.colour to style.color.

Error 9 (grade.js, Line 38):
Changed loop starting value from 1 to 0.

Error 10 (grade.js, Line 42):
Changed innerHtml to innerHTML.

Additional corrections:
Added empty mark validation, grade colours,
random mark generation and checking date/time.
*/


/* Function to check student's mark */
function checkMark() {

    // Get student name and mark
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Check empty name
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check empty mark
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check whether mark is numeric
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark to integer
    mark = Number(mark);

    // Check mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Declare grade variable
    let grade;

    // Determine student's grade
    if (mark >= 80) {
        grade = "A";

    } else if (mark >= 65) {
        grade = "B";

    } else if (mark >= 50) {
        grade = "C";

    } else {
        grade = "F";
    }

    // Display result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour according to grade
    if (grade === "A" || grade === "B") {

        document.getElementById("result").style.color = "green";

    } else if (grade === "C") {

        document.getElementById("result").style.color = "orange";

    } else {

        document.getElementById("result").style.color = "red";
    }

    // Display checking date and time
    document.getElementById("checkTime").innerHTML =
        "Checked on: " + new Date();

    // Prevent form submission and page reload
    return false;

}


/* Function to display grade table */
function showTable() {

    // Arrays containing grades and mark ranges
    let grades = ["A", "B", "C", "F"];

    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Create table header
    let tableHTML =
        "<table>" +
        "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Loop through all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=
            "<tr>" +
            "<td>" + grades[i] + "</td>" +
            "<td>" + ranges[i] + "</td>" +
            "</tr>";

    }

    // Close table
    tableHTML += "</table>";

    // Display table
    document.getElementById("tableContainer").innerHTML =
        tableHTML;

}


/* Function to generate random mark */
function randomMark() {

    // Generate random whole number from 0 to 100
    let randomNumber = Math.floor(Math.random() * 101);

    // Put random number into mark input
    document.getElementById("mark").value = randomNumber;

}

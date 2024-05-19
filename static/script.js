document.getElementById('examForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Correct answers for each section
    var correctAnswers = {
        math: [2,4, 1, 1, 2, 3, 1, 2, 2,1,1,3,2,1,1],
        reading: [2, 1, 2, 1, 2, 3],
        writing: {
            1: "He doesn't know how to read that book.",
            2: "She goes to school every day.",
            3: [2, 4, 3, 1], // Correct order of sentences for paragraph organization
            4: "The cats are sleeping on their bed." // Corrected sentence for error identification
        }
    };

    // User's responses
    var userResponses = {
        math: [],
        reading: [],
        writing: {}
    };
    var mathResponse = 0;
    // Extract user responses from the form for math questions
    for (var i = 1; i <= 15; i++) {
        try {
            mathResponse = parseInt(document.querySelector('input[name="math' + i + '"]:checked').value) || 0;
            console.log(mathResponse);
        } catch (e) {
            mathResponse = 0;
        }
        userResponses.math.push(mathResponse);
    }

    var readingResponse = 0;
    // Extract user responses from the form for reading questions
    for (var i = 1; i <= 6; i++) {
        try {
            readingResponse = parseInt(document.querySelector('input[name="reading' + i + '"]:checked').value) || 0;
        } catch (e) {
            readingResponse = 0;
        }
        userResponses.reading.push(readingResponse);
    }

    try {
        // Extract user responses from the form for writing questions
        userResponses.writing[1] = document.getElementById('writing1').value.trim();
        userResponses.writing[2] = document.getElementById('writing2').value.trim();
        userResponses.writing[3] = document.getElementById('writing3').value.trim().split(",").map(Number);
        userResponses.writing[4] = document.getElementById('writing4').value.trim();
    } catch (e) {
        userResponses.writing[1] = "";
        userResponses.writing[2] = "";
        userResponses.writing[3] = " ";
        userResponses.writing[4] = "";
    }

    // Calculate scores for each section
    var mathScore = calculateScore(correctAnswers.math, userResponses.math);
    var readingScore = calculateScore(correctAnswers.reading, userResponses.reading);
    var writingScore = calculateWritingScore(correctAnswers.writing, userResponses.writing);

    // Calculate total score
    var totalScore = mathScore + readingScore + writingScore;

    // Display total score
    displayTotalScore(totalScore, mathScore, readingScore, writingScore);
});

// Function to calculate score for a section
function calculateScore(correctAnswers, userResponses) {
    var score = 0;
    for (var i = 0; i < correctAnswers.length; i++) {
        if (userResponses[i] === correctAnswers[i]) {
            score++;
        }
    }
    return score;
}

// Function to calculate writing score
function calculateWritingScore(correctAnswers, userResponses) {
    var score = 0;
    // Check each question
    for (var questionNum in correctAnswers) {
        if (correctAnswers.hasOwnProperty(questionNum)) {
            // Check if user response matches correct answer
            if (Array.isArray(correctAnswers[questionNum])) {
                // Check order for paragraph organization
                if (arraysEqual(correctAnswers[questionNum], userResponses[questionNum])) {
                    score++;
                }
            } else {
                // Check equality for other questions
                if (correctAnswers[questionNum].toLowerCase() === userResponses[questionNum].toLowerCase()) {
                    score++;
                }
            }
        }
    }
    return score;
}

// Function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Function to display total score
function displayTotalScore(totalScore, mathScore, readingScore, writingScore) {
    // Get the result element from the document
    var resultElement = document.getElementById('result');


    totalScore = Math.round((totalScore / 25) * 100);
    mathScore = Math.round((mathScore / 15) * 100);
    readingScore = Math.round((readingScore / 6) * 100);
    writingScore = Math.round((writingScore / 4) * 100);
    console.log(mathScore);

    // Set initial result while waiting for the AJAX response
    resultElement.innerHTML = 'Calculating prediction...';

    // AJAX request to the server
    $.ajax({
        type: 'POST',
        url: '/predict',
        data: {
            "math_score": mathScore,
            "reading_score": readingScore,
            "writing_score": writingScore
        },
        dataType: 'json',
        success: function(response) {
            // Update the result element with the prediction and score details
            resultElement.innerHTML = response.response + '<br>Total Score: ' + totalScore +
                '%<br>Math Score: ' + mathScore +
                '%<br>Reading Score: ' + readingScore +
                '%<br>Writing Score: ' + writingScore + '%';
        },
        error: function() {
            // Display error message if the AJAX request fails
            resultElement.innerHTML = 'Error in prediction. Please check the input values.';
        }
    });
}

// Set the countdown time in seconds
var timeLimit = 900; // 10 minutes

// Update the countdown display every second
var countdownElement = document.getElementById('countdown');
var countdown = setInterval(function() {
    var minutes = Math.floor(timeLimit / 60);
    var seconds = timeLimit % 60;
    countdownElement.innerHTML = 'Time Left: ' + minutes + 'm ' + seconds + 's';
    timeLimit--;
    // When time runs out, submit the form automatically
    if (timeLimit < 0) {
        clearInterval(countdown);
        document.getElementById('examForm').submit();
    }
}, 1000);

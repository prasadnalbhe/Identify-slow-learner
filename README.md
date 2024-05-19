# Student Performance Prediction Website

Welcome to the Student Performance Prediction Website! This project is designed to assess students' abilities in math, reading, and writing, and to predict whether a student is a slow learner. The prediction is made using a machine learning algorithm, specifically a Support Vector Machine (SVM), which has achieved an accuracy of 0.89.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Data](#data)
- [Model](#model)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project aims to provide educators and parents with a tool to quickly assess a student's learning pace in core academic areas: math, reading, and writing. By predicting if a student is a slow learner, timely interventions can be made to support the student's educational development.

## Features

- **Math Test**: A series of math questions to evaluate the student's mathematical skills.
- **Reading Test**: A set of reading comprehension questions to assess the student's reading abilities.
- **Writing Test**: Writing prompts and grammar questions to gauge the student's writing skills.
- **Prediction**: Uses a Support Vector Machine (SVM) model to predict if the student is a slow learner based on their test results.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prasadnalbhe/identify-slow-learner.git
   cd identify-slow-learner
   ```

2. **Install dependencies:**
   Make sure you have Python 3.x installed. Then, install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   Start the local server:
   ```bash
   python app.py
   ```

4. Open your web browser and navigate to `http://127.0.0.1:5000`.

## Usage

1. **Home Page**: The main landing page where users can start the tests.
2. **Math Test**: Complete the math test by answering all the questions.
3. **Reading Test**: Read the passages and answer the comprehension questions.
4. **Writing Test**: Complete the writing prompts and grammar questions.
5. **Results Page**: After completing all tests, view the prediction of whether the student is a slow learner.

## Data

The tests are designed based on a curated dataset of questions for math, reading, and writing. The results are used to train and test the SVM model.

## Model

The Support Vector Machine (SVM) model is used to classify students as slow learners or not based on their test scores. The model has been trained and validated on a dataset, achieving an accuracy of 0.89.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.


---

We hope this tool helps in identifying students who need additional support. If you have any questions or feedback, please feel free to open an issue or contact us.

Happy Learning!

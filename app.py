from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

app = Flask(__name__)

# Load the dataset with tab delimiter
data = pd.read_csv("student_data.csv", delimiter='\t')

# Select relevant columns and target variable
X = data[['math score', 'reading score', 'writing score']]
y = data['is_slow_learner']

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the SVM model
svm_model = SVC(kernel='linear')
svm_model.fit(X_train, y_train)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        math_score = int(request.form['math_score'])
        reading_score = int(request.form['reading_score'])
        writing_score = int(request.form['writing_score'])

        prediction = svm_model.predict([[math_score, reading_score, writing_score]])
        print("Prediction is  ", prediction)
        if prediction[0] == 1:
            result = " Slow learner "
        else:
            result = " Not a slow learner"
        response = f'This student is predicted as : {result}'
        return jsonify(response=response)

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Sample Questions (can be loaded from a database or JSON file)
questions = [
    {"question": "What is 2 + 2?", "options": ["3", "4", "5", "6"], "answer": "4"},
    {"question": "What is the capital of France?", "options": ["Berlin", "Madrid", "Paris", "Rome"], "answer": "Paris"},
    {"question": "What is 5 * 6?", "options": ["30", "40", "50", "60"], "answer": "30"}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/questions')
def get_questions():
    return jsonify(questions)

if __name__ == "__main__":
    app.run(debug=True)

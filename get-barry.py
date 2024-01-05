from flask import Flask, request, jsonify, render_template
from difflib import get_close_matches
import json

app = Flask(__name__)

BARRY_PATH = 'barry/barry.json'
knowledge_base = {}

@app.route("/")
def index():
   return render_template("index.html")

# load knowledge base from a json file
def load_knowledge_base():
   try:
      with open(BARRY_PATH, 'r') as file:
         data = json.load(file)
   except FileNotFoundError:
      # error check in case barry has ran away
      data = {"questions": []}

   return data


# save knowledge base to barry
def save_knowledge_base(data):
   with open(BARRY_PATH, 'w') as file:
      json.dump(data, file, indent=2)

# load knowledge base at startup
knowledge_base = load_knowledge_base()

@app.route('/get_answer', methods=['POST'])
def get_answer():
   data = request.get_json()
   user_input = data.get('user_input', '').lower()

   best_match = find_best_match(user_input, [q["question"] for q in knowledge_base["questions"]])

   if best_match:
      answer = get_answer_for_question(best_match, knowledge_base)
      return jsonify({"answer": answer})
   else:
      return jsonify({"answer": "I actually can't read."})


@app.route('/update_knowledge_base', methods=['POST'])
def update_knowledge_base():
   data = request.get_json()
   user_input = data.get('user_input', '').lower()
   new_answer = data.get('new_answer', '')

   if user_input.lower() != 'skip':
      knowledge_base["questions"].append({"question": user_input, "answer": new_answer})
      save_knowledge_base(knowledge_base)

   return jsonify({"message": "Barry has learned something"})


def find_best_match(user_question, questions):
   matches = get_close_matches(user_question, questions, n=1, cutoff=0.6)
   return matches[0] if matches else None

def get_answer_for_question(question, base):
   for q in base["questions"]:
      if q["question"] == question:
         return q["answer"]

if __name__ == '__main__':
   app.run(debug=True)

# can i get thi
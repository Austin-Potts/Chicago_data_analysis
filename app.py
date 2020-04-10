from flask import Flask, render_template, request
from flask_pymongo import PyMongo
import chicago

app = Flask(__name__)

app.config['MONGO_URI'] = "mongodb://localhost:27017/chicago_data"
mongo = PyMongo(app)

# Route to render index.html template as our "home"
@app.route("/")
def data_homepage():

    # Find one record of data from the mongo database
    chicago_data = mongo.db.chicago_data.find_one()

    # Return template and data
    return render_template("index.html", chicago_data=chicago_data)


# Route that runs scrape_mars for data
@app.route("/getData")
def getData():

    # Run the data function
    chicago_data = chicago.getData()

    # Update the Mongo database using update and upsert=True
    mongo.db.chicago_data.update({}, chicago_data, upsert=True)
    return render_template("index.html", chicago_data=chicago_data)
    print('Chicago loaded successfully')

if __name__ == "__main__":
    app.run(debug=True)
#importing dependencies and chicago.py to use getData function
import chicago
import sqlite3
import json
from flask import Flask,render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#setting route to chicago database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chicago_data.db'
db = SQLAlchemy(app)

#reflects the current database into the primary index.html
db.Model.metadata.reflect(db.engine)

#creates a model of the reflection, allowing for queries to be made (example: crime.query.count())
class chicago_crime(db.Model):
    __tablename__ = 'chicago_data'
    __table_args__ = { 'extend_existing': True }
    index = db.Column(db.Text, primary_key=True)

class aggs_overall(db.Model):
    __tablename__ = 'aggs_overall'
    __table_args__ = { 'extend_existing': True }
    index = db.Column(db.Text, primary_key=True)
    
class aggs_by_date_type(db.Model):
    __tablename__ = 'aggs_by_date_type'
    __table_args__ = { 'extend_existing': True }
    date = db.Column(db.Text, primary_key=True)

class dfCSV(db.Model):
    __tablename__ = 'dfCSV'
    __table_args__ = { 'extend_existing': True }
    date = db.Column(db.Text, primary_key=True)

class group_type_df(db.Model):
    __tablename__ = 'group_type_df'
    __table_args__ = { 'extend_existing': True }
    index = db.Column(db.Text, primary_key=True)

class month_day(db.Model):
    __tablename__ = 'groupby_df'
    __table_args__ = { 'extend_existing': True }
    index = db.Column(db.Text, primary_key=True)

# dba = 'sqlite:///chicago_data.db'
# def get_all_users( json_str = False ):
#     conn = sqlite3.connect( dba )
#     conn.row_factory = sqlite3.Row # This enables column access by name: row['column_name'] 
#     c = conn.cursor()
#     rows = c.execute('''
#     SELECT * from month_day
#     ''').fetchall()
#     conn.commit()
#     conn.close()
#     if json_str:
#         return json.dumps( [dict(ix) for ix in rows] ) #CREATE JSON
#     return rows
#     print get_all_users( json_str = True )

#home route to hold initial visuals which need to be updated with button press
@app.route("/")
def home():
    print("Total number of rows in chicago_data table: ", chicago_crime.query.count())
    print("Total number of rows in aggs_overall table: ", aggs_overall.query.count())
    print("Total number of rows in aggs_by_date_type table: ", aggs_by_date_type.query.count())
    print("Total number of rows in dfCSV table: ", dfCSV.query.count())
    print("Total number of rows in group_type_df table: ", group_type_df.query.count())
    print("Total number of rows in groupby_df table: ", month_day.query.count())

    return render_template("index.html")

@app.route("/updateData")
def getData():

    # Run the data function with error handling for failed data loading
    try:
        chicago.getData()
        print('Updated data loaded successfully')
        return render_template("index.html")

    except:
        print("Data updating failed")

if __name__ == '__main__':
    app.run(debug=True)
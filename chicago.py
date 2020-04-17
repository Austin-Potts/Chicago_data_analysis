#importing dependencies and setting app token
import pandas as pd
from datetime import date, datetime
from sodapy import Socrata
import csv
import sqlite3

MyAppToken = 'GuILMuJLLhVOQ8u9cyXPc56p3'

#checking the day of the month and printing the result, this is used to filter the dataframe later
today = date.today()
daynum = today.strftime("%d")
month = today.strftime("%m")
day = int(daynum) - 7
print(f"Day: {day} \nMonth: {month}")

def getData():
    crime_data = "ijzp-q8t2"
    client = Socrata("data.cityofchicago.org", MyAppToken)
    df = pd.DataFrame(
        client.get(
            crime_data, 
            where=f"Date BETWEEN '2020-01-01' AND '2020-{month}-{day}'",
            limit=100000,
            exclude_system_fields=True
        )
    )
    client.close()

    df['month'] = pd.DatetimeIndex(df['date']).month
    df['year'] = pd.DatetimeIndex(df['date']).year
    df['date'] = pd.to_datetime(df['date']).dt.strftime('%m.%d.%Y')

    df["primary_type"] = df["primary_type"].str.lower().str.title()
    df["description"] = df["description"].str.lower().str.title()
    df["location"] = df["location_description"].str.lower().str.title()

    # Organize: 
    current_df = df[["date","month", "year","primary_type", "description","latitude", "longitude", "domestic"]]
    current_df.shape

    df1 = pd.DataFrame(
        client.get(
            crime_data, 
            where=f"Date BETWEEN '2019-01-01' AND '2019-{month}-{day}'",
            limit=100000,
            exclude_system_fields=True
        )
    )
    client.close()

    df1['month'] = pd.DatetimeIndex(df1['date']).month
    df1['year'] = pd.DatetimeIndex(df1['date']).year
    df1['date'] = pd.to_datetime(df1['date']).dt.strftime('%m.%d.%Y')

    df1["primary_type"] = df1["primary_type"].str.lower().str.title()
    df1["description"] = df1["description"].str.lower().str.title()
    df1["location"] = df1["location_description"].str.lower().str.title()

    # Organize: 
    old_df = df1[["date","month","year","primary_type","description","latitude","longitude","domestic"]]
    old_df.shape

    dataframes = [old_df, current_df]

    final_df = pd.concat(dataframes)

    final_df.reset_index(inplace=True)

    print(f"{final_df.shape}")


    # dom_df = final_df.filter(like = 'True')
    # dom_df

    groupby_df = final_df.groupby(['month', 'domestic', 'year']).count()
    groupby_df.reset_index(inplace=True)

    
    db = sqlite3.connect('chicago_data.sqlite3')

    #inserts only new values from api call into sqlite file
    final_df.to_sql('chicago_data', db, if_exists = 'replace')

    db.close()

if __name__ == '__main__':
    getData()




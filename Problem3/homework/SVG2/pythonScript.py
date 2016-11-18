"""
Jobber Bekkers
10543988

converts a scv file to a JSON file
"""

import csv
import json
# for my machine the entier pathway must be given
with open('/users/jobber/documents/github/dataprocessing/problem3/homework/svg2/data.csv') as f:
    # read the csv file
    read = csv.reader(f)
    # initiate a dictionary
    countrys = dict()
    # take all the lines from the csv file
    for i in read:
        # check if the info is usefull
        if (type(i[0]) == str and i[0] != ""):
            # key is country name
            key = i[0]
            # allow the value to be a list
            countrys.setdefault(key, [])
            # set key:value0 to country code
            countrys[key].append(i[1])
            # check if data is known on the country
            if (i[5] != '..'):
                # set key:value1 to data(percentage)
                countrys[key].append(i[5])
            else:
                countrys[key].append("")

with open('/users/jobber/documents/github/dataprocessing/problem3/homework/svg2/data.json', 'w') as g:
    h = json.dump(countrys, g)

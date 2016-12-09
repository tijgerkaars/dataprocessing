"""
Jobber Bekkers
10543988

converts a scv file to a JSON file
"""

import csv
import json
# for my machine the entier pathway must be given, tim knows
with open('/users/jobber/documents/github/dataprocessing/problem6/homework/d3line/data.json', 'w') as g:
    with open('/users/jobber/documents/github/dataprocessing/problem6/homework/d3line/tempdatasets.csv') as f:
        # copy the headers from the csv file
        headers = ("STN", "dates", "TG",   "TN",   "TX")
        # read the csv file
        read = csv.DictReader(f, headers)
        # count the rows, as the first rows are usually info on the data not the data itself.
        counter = 1
        info = []
        for row in read:
            if (counter > 15):
                info.append(row)
            counter += 1
        h = json.dump(info, g)

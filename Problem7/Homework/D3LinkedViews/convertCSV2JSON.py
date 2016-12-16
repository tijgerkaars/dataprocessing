# -*- coding: utf-8 -*-

"""
Jobber Bekkers
10543988

converts a scv file to a JSON file
"""

import csv
import json
# for my machine the entier pathway must be given, tim knows
with open('C:/Users/Jobber/Documents/GitHub/dataprocessing/Problem7/Homework/D3LinkedViews/data.json', 'w') as g:
    with open('C:/Users/Jobber/Documents/GitHub/dataprocessing/Problem7/Homework/D3LinkedViews/LiteracyData.csv') as f:
        # copy the headers from the csv file
        headers = ('SeriesName','SeriesCode','CountryName','CountryCode','Data')
        # read the csv file
        read = csv.DictReader(f, headers)
        # count the rows, as the first rows are usually info on the data not the data itself.
        counter = 1
        info = []
        for row in read:
            if (counter > 1):
                info.append(row)
            counter += 1
        h = json.dump(info, g)

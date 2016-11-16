
import csv

with open('data.csv') as f:
    print f

data = csv.reader("f")
print data
for i in data:
    print i

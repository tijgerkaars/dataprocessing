import csv
import json
# for my machine the entier pathway must be given
with open('/users/jobber/documents/github/dataprocessing/problem3/homework/svg2/data.csv') as f:
    print "f"
    read = csv.reader(f)
    print read, "\n\n start \n"
    countrys = dict()
    for i in read:
        if "Adult literacy rate" in i[0]:
            print "1", i[2], i[3], i[4]
            key = i[2]
            countrys.setdefault(key, [])
            print "2", countrys
            countrys[key].append(i[3])
            countrys[key].append(i[4])
print "3", countrys
with open('/users/jobber/documents/github/dataprocessing/problem3/homework/svg2/data.json') as g:
    json.loads(countrys, g)
print "end"

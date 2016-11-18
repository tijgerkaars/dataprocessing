import csv
import json
# for my machine the entier pathway must be given
with open('/users/jobber/documents/github/dataprocessing/problem3/homework/svg2/data.csv') as f:
    print "f"
    read = csv.reader(f)
    print read, "\n\n start \n"
    countrys = dict()
    print "1", read
    for i in read:
        print "2 ", i[0], i[1], i[5]
        if (type(i[0]) == str and i[0] != ""):
            key = i[0]
            countrys.setdefault(key, [])
            countrys[key].append(i[1])
            if (i[5] != '..'):
                countrys[key].append(i[5])
            else:
                countrys[key].append("")

print "3", countrys
with open('/users/jobber/documents/github/dataprocessing/problem3/homework/svg2/data.json', 'w') as g:
    print "4", g
    h = json.dump(countrys, g)
    print "5", h
print "end"

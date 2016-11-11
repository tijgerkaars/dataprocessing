#!/usr/bin/env python
# Name: Jobber Bekkers
# Student number: 10543988
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

#zonder dit werkte het niet
import sys; sys.path.append('C:\Python27\pattern-2.6')
from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT


TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    import codecs

    # select the top "X"
    top = 50
    # creating lists for temperary storage
    title = []
    rating = []
    genre = []
    runtime = []
    stars = []

    # selects the html that contains the info
    for e in dom.by_tag("div.lister-item-content")[:top]: # Top 5 reddit entries.
        # selects the title
        for b in e.by_class("lister-item-header"): # First <a class="title"> in entry.
            # by_tag returns list, title is the one and only entry
            temp = b.by_tag("a")[0].content
            # transform unicode into string
            # handels non ASCII characters
            temp = str(temp.encode("ASCII", "ignore"))
            title.append(temp)
        # selects the rating
        for c in e.by_class("inline-block ratings-imdb-rating"):
            c = plaintext(c.content)
            c = str(c.encode("ASCII", "ignore"))
            rating.append(c)
        # selects the genre
        for d in e.by_class("genre"):
            f = plaintext(d.content)
            f = str(f.encode("ASCII", "ignore"))
            genre.append(f)
        # selects the runtime
        for g in e.by_class("runtime"):
            h = plaintext(g.content)
            h = str(h.encode("ASCII", "ignore"))
            for i in h.split():
                if i.isdigit():
                    runtime.append(i)
                else:
                    break
        # selects the stars of the show
        store = []
        # this class has no name
        # the stars are always the last 4 <a href a/> elements
        for j in e.by_tag("a")[-4:]:
            k = plaintext(j.content)
            k = str(k.encode("ASCII", "ignore"))
            # collects all 4 stars of the show
            store.append(k)
        star_string = str(store[0]) + ", " + str(store[1]) + ", " + str(store[2]) + ", " + str(store[3])
        star_string = str(star_string)
        # attaches the 4 stars to the list/title
        stars.append(star_string)
    # places all the information in one long list
    # [tile,rating,genre,runtime,[artists],repeat]
    dictionary = []
    counter = 0
    while counter < top:
        dictionary.append(title[counter])
        dictionary.append(rating[counter])
        dictionary.append(genre[counter])
        dictionary.append(runtime[counter])
        dictionary.append(stars[counter])
        counter += 1

    return dictionary


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    # My machine gave trouble here, it could only use the ";" as seperation
    # which in turn gave trouble with the csv file
    # double ## should make it run as default
    p = ";"
    ## p =", "
    writer = csv.writer(f, delimiter = "p", quoting=csv.QUOTE_NONE, escapechar = "\t")
    # indicate the meaning of values
    writer.writerow(["Title"+p+"Rating"+p+"Genre"+p+"Runtime"+p+"Actors"+"\t"])
    # pasts blocks of five into rows of th csv file
    counter = 0
    num = (len(tvseries)/5)
    for i in range(0, num):
        # write the [tile,rating,genre,runtime,[artists]] to csv row
        s = tvseries[counter]+p+tvseries[counter + 1]+p+tvseries[counter + 2]+p+tvseries[counter + 3]+p+tvseries[counter + 4]
        writer.writerow([s])
        # ensures selection of the next block of elements
        counter += 5

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)

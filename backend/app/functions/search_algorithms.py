import re

"""
    here database is a 2d list, and part is the sequence we need to find
    each row-list in database has 3 elements i.e. [serial, title, link],
    and this serach algorithms are for searching in title, i.e database[i][1]

    the elements in the database may be same for some rows.
"""


# its the simplest algorithm, it just checks if part is in title or not
def s1(database: list, part: str) -> list:
    try:
        matchs: list = []
        for zipped_list in database:
            if part.lower() in zipped_list[1].lower():
                matchs.append(zipped_list)
        return matchs

    except Exception as e:
        print(e)
        return []


# alongside checking if part is in title, it also counts the num of occurrance of the part for each title
# and according to that, it sorts the titles, and returns the one[the row containing the title] with most occurrance


def s2(database: list, part: str) -> list:
    """Problem will appear if count is same"""
    try:
        matchs: list = []
        res_dict = {}

        for zipped_list in database:
            if part.lower() in zipped_list[1].lower():
                serial = zipped_list[0]  # unique for all
                title = zipped_list[1]  # not unique for all
                # link = zipped_list[2]   # not unique for all
                count = title.lower().count(part.lower())  # may be unique
                res_dict[serial] = [zipped_list, count]

        counts = []
        dict_val = list(res_dict.values())
        for val in dict_val:
            count = val[1]
            counts.append(count)
        counts.sort(reverse=True)

        for ctn in counts:
            for val in dict_val:
                if val[1] == ctn:
                    matchs.append(val[0])

        return matchs

    except Exception as e:
        print(e)
        return []


def s2x1(database: list, part: str) -> list:
    """uses alphabetical order in ties if count is same"""
    try:
        matchs = []
        res_dict = {}

        for zipped_list in database:
            if part.lower() in zipped_list[1].lower():
                serial = zipped_list[0]  # unique for all
                title = zipped_list[1]  # not unique for all
                count = title.lower().count(part.lower())  # count occurrences
                res_dict[serial] = [zipped_list, count]

        # Sort by count and then by title alphabetically in case of ties
        sorted_vals = sorted(res_dict.values(), key=lambda x: (-x[1], x[0][1].lower()))

        for val in sorted_vals:
            matchs.append(val[0])

        return matchs

    except Exception as e:
        print(e)
        return []


def s3(database: list, part: str) -> list:
    """uses re to search ,slower in small db, but faster in large db"""
    try:
        part_lower = part.lower()
        pattern = re.compile(re.escape(part_lower), re.IGNORECASE)

        # List comprehension to build (count, title, row) tuples
        match_counts = [
            (len(pattern.findall(title.lower())), title, row)
            for row in database
            for title in [row[1]]
            if pattern.search(title.lower())
        ]

        # Sort the match_counts list by count (descending) and then by title (ascending)
        match_counts.sort(key=lambda x: (-x[0], x[1]))

        # Extract the rows from the sorted match_counts list
        sorted_rows = [row[2] for row in match_counts]

        return sorted_rows

    except Exception as e:
        print(e)
        return []


if __name__ == "__main__":
    d = {1: "1", 2: "2", 3: "1"}

    print(d[1], d[2])
    x, y = [1, 2]
    x, y = {1, 2}
    print(x, y)

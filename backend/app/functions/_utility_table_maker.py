import json
import csv
import os

array = [
    ["Miss.Y", "21l#22"],
    ["Mr.X", "392j#d"],
    ["Mr.M", "392j#d"],
    ["Mr.N", "39ej#d"],
    ["Miss.L", "142j#d"],
]

output_file = "test.csv"


def create_csv(array, output_file):
    try:
        with open(output_file, "w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(array)
        print(f"Successfully created {output_file}")

    except Exception as e:
        print(e)

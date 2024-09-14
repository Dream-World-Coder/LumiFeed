import os

result = os.popen("curl https://indianexpress.com/robots.txt").read()

result_data_set = {"Disallowed": [], "Allowed": []}

for line in result.split("\n"):
    if line.startswith("Allow:"):
        result_data_set["Allowed"].append(line.split(": ")[1].split(" ")[0])
    elif line.startswith("Disallow:"):
        result_data_set["Disallowed"].append(line.split(": ")[1].split(" ")[0])

print(result_data_set)

"https://indianexpress.com/wp-admin/admin-ajax.php"

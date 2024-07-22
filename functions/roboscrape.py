import os

# Fetch the robots.txt file
result = os.popen("curl https://indianexpress.com/robots.txt").read()

# Initialize dictionaries to hold allowed and disallowed URLs
result_data_set = {"Disallowed": [], "Allowed": []}

# Split the fetched content by lines and iterate over each line
for line in result.split("\n"):
    # Check if the line starts with 'Allow:' or 'Disallow:'
    if line.startswith('Allow:'):
        # Extract the URL part and append it to the Allowed list
        result_data_set["Allowed"].append(line.split(': ')[1].split(' ')[0])
    elif line.startswith('Disallow:'):
        # Extract the URL part and append it to the Disallowed list
        result_data_set["Disallowed"].append(line.split(': ')[1].split(' ')[0])

# Print the extracted URLs
print(result_data_set)

'https://indianexpress.com/wp-admin/admin-ajax.php'
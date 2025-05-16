import os

MAX_FILES = 10  # Set a limit on how many alternate files can exist at one time

def makeAlternateFilePath(path: str) -> str:
    if not os.path.exists(path):
        return path

    i = 1
    fname, ext = os.path.splitext(path)
    newPath = f"{fname}_{i}{ext}"

    while os.path.exists(newPath):
        i += 1
        newPath = f"{fname}_{i}{ext}"

    return newPath


def makeAlternateFilePath2(path: str) -> str:
    """Generates an alternate file path if the file already exists, with cleanup of older files."""
    if not os.path.exists(path):
        return path

    dir_name, base_name = os.path.split(path)
    fname, ext = os.path.splitext(base_name)

    alternate_files = [
        f for f in os.listdir(dir_name) if f.startswith(fname) and f.endswith(ext)
    ]

    if len(alternate_files) >= MAX_FILES:
        # Sort the alternate files by modification time (oldest first)
        full_paths = [os.path.join(dir_name, f) for f in alternate_files]
        full_paths.sort(key=os.path.getmtime)
        # Delete the oldest file
        os.remove(full_paths[0])

    # Create a new alternate file path
    i = 1
    newPath = os.path.join(dir_name, f"{fname}_{i}{ext}")
    while os.path.exists(newPath):
        i += 1
        newPath = os.path.join(dir_name, f"{fname}_{i}{ext}")

    return newPath


def cleanup_files(file_paths):
    """Cleans up files specified in the list and logs errors if any."""
    for file_path in file_paths:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")

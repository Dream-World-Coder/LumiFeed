import os

def makeAlternateFilePath(path: str) -> str:
    if not os.path.exists(path):
        return path
    
    i = 1
    fname, ext = os.path.splitext(path)
    newPath = f'{fname}_{i}{ext}'
    
    while os.path.exists(newPath):
        i += 1
        newPath = f'{fname}_{i}{ext}'
    
    return newPath



def cleanup_files(file_paths):
    for file_path in file_paths:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")



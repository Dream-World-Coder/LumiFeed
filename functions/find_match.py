def match_part(part:str, array: iter, least=False):
    """
    If multiple items have same order then the first one will be returned.
    """
    matchdegree= {}
    total_matches = 0
    for item in array:
        matchdegree[f'{item}'] = item.lower().count(part.lower())
        total_matches += matchdegree[f'{item}']        
    
    if total_matches == 0:
        print("No match found")
        return None
    
    else:
        for key, value in matchdegree.items():
            matchdegree[key] = value / total_matches
            
        lst = list(matchdegree.values())
        lst.sort(reverse=least)
        
        for key, value in matchdegree.items():
            if value == lst[-1]:
                return key
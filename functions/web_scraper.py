import requests
from bs4 import BeautifulSoup
from urllib.parse import quote



def make_soup(url, time:int=8, redirect:bool=True, soup_type:str='html.parser') -> BeautifulSoup:
    """
    Make a BeautifulSoup object from a URL.

    Args:
        url (str): The URL to fetch.
        time (int, optional): The timeout in seconds. Defaults to 8.
        redirect (bool, optional): Whether to follow redirects. Defaults to True.
        soup_type (str, optional): The type of parser to use. Defaults to 'html.parser'.

    Returns:
        BeautifulSoup: The BeautifulSoup object.

    Raises:
        Exception: If an error occurs during the request.
    """
    try:
        res = requests.get(url, timeout=time, allow_redirects=redirect)
        res.raise_for_status()
        soup = BeautifulSoup(res.content, soup_type)
        return soup
    except Exception as e:
        print(e)
        return None


def get_encoded_href(elem:str, encoding=":/"):
    try:
        raw_link = elem.attrs['href']
        # l = elem.get('href', '#')
        link = quote(raw_link, safe=encoding)
        return link
    except Exception as e:
        print(e)

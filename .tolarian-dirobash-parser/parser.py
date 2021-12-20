import functools
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import dateparser
import json

startIndex = 29

browser = webdriver.Chrome()

def quote_to_item(quote_web_element):
    return {
        #retourner le texte de la citation
        'quote':quote_web_element.find_element(
                By.XPATH,
                './blockquote/div'
            ).text.replace(
                '<br>',
                '\n'
            ),
        #retourner l'index de la citation
        'id': int(
                quote_web_element.find_element(
                    By.XPATH,
                    './p/a'
                ).text[1:]
            ),
        #sauvegarder la date en format standard ISO8601
        'date': dateparser.parse(
                quote_web_element.find_element(
                    By.XPATH,
                    './p/span[@class="date"]'
                ).text
            ).isoformat()
    }

def quotes_from_page_index(index):
    #acceder a la page
    browser.get(f'http://dirobash.tolarian.com/{index}')
    #attendre 0.5sec pour donner un repit au serveur
    time.sleep(0.5)
    #retourner la liste de citations pour la
    return list(
        map(
            quote_to_item,
            reversed(
                browser.find_element(
                    By.ID,
                    'quotes'
                ).find_elements(
                    By.XPATH,
                    './div[@class="quote"]'
                )
            )
        )
    )
with open('./old-quotes.json', mode='w') as file:
    # dump la liste JSON
    json.dump(
        # concatener toutes les listes dans une liste
        functools.reduce(
            lambda a,b: a+b,
            [   # toutes les listes de citations pour chaque page
                quotes_from_page_index(i)
                for i in range(startIndex,0,-1)
            ]
        ),
        file
    )
        

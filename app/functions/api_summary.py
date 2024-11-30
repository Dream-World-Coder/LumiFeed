
# # https://github.com/anweasha/Text-Summarizer/blob/main/app.py
# import requests

# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
# # headers = {"Authorization": f"Bearer {API Token}"}
# headers = {"Authorization": "Bearer"}

# data="text to summarise"


# maxL=int(16)
# minL=maxL//4
# def query(payload):
#     response = requests.post(API_URL, headers=headers, json=payload)
#     return response.json()

# output = query({
#     "inputs": data,
#     "parameters": {"min_length":minL, "max_length":maxL},
# })[0]

# result=output["summary_text"]

# print(result)

# #


import requests

url = "https://api.meaningcloud.com/summarization-1.0"

text_to_summarise = """
        Prime Minister Narendra Modi has reiterated India’s support for Palestine and expressed deep concern over the security and humanitarian situation amid the ongoing conflict.
        In a letter, written to mark the International Day of Solidarity with the Palestinian People, on November 26, PM Modi has reiterated India’s continued support for the development of the people of Palestine.
        He also called for an immediate ceasefire and release of hostages, and also an end to acts of terrorism.
        The Palestinian embassy in New Delhi has welcomed the statement.
        “India calls for an immediate ceasefire, an end to all acts of terrorism, the release of hostages and the sustained delivery of humanitarian assistance to the people of Palestine,” PM’s letter says.
        Noting that the ongoing conflict has resulted in tragic loss of lives and caused immense suffering for the people of Palestine and the broader West Asian region, PM wrote, “India remains deeply concerned at the current security and humanitarian situation.”
        India firmly believes that dialogue and diplomacy are the keys to a lasting and peaceful solution, he says, once again “supporting a negotiated two-state solution, leading to the establishment of a sovereign, independent and viable State of Palestine, living side by side in peace with Israel”.
        Notably, since the start of the conflict in October 2023, India has condemned terrorism – pointing to Hamas attacks on Israel – while also advocating a two-state solution.
        Also committing India’s support as “a steadfast development partner”, PM Modi wrote, India will continue to stand with the people of Palestine in this journey, including through the implementation of people-centric projects in diverse sectors, based on their needs and priorities.
        Responding to the message, Abed Elrazeg Abu Jazer, chargé d’affaires, Embassy of Palestine, New Delhi, says,  “We welcome and highly appreciate the message of the Indian Prime Minister.”
        The message contained important contents, reaffirming India’s support for the establishment of a viable Palestinian state and a two-state solution through the diplomatic and political path that the Palestinian people are striving to achieve, he added.
        Palestine also welcomes and supports Modi’s call for an immediate ceasefire to stop the Israeli war on Gaza, as well as India’s commitment to continue providing humanitarian assistance to the people of Palestine, he said.
        During his bilateral meeting with Palestinian President Mahmoud Abbas on the sidelines of the UNGA, in New York in September, Modi had expressed deep concerns at the unfolding crisis in Gaza, and also reiterated that only a two-state solution can deliver sustainable peace in this area.
        Modi also referred to India’s historic support for Palestine in the United Nations, on the international stage, as well as the consistent and sustained humanitarian support to the Palestinian people.
    """

text_to_summarise2 = """
        Scientists have discovered a new species of marine invertebrate that breaks the traditional cycle of birth, ageing, and death to which most animals are bound.
        Comb jellies, also known as ctenophore Mnemiopsis leidyi, can defy age and revert to younger versions of themselves, according to a recent study published in Proceedings of the National Academy of Sciences.
        Joan J Soto-Angel, one of the co-authors of the study, said that one day, he was surprised to see larval comb jelly in place of the adult comb jelly that usually resided in his lab’s tank. Upon further investigation, he realised that it was the same animal.
        This curious incident spurred an experiment conducted by Soto-Angel and his colleagues in which they tried to reproduce the conditions that had triggered the de-ageing process in the comb jelly.
        They found that adult comb jelly can regress and reach a larval stage if they are subjected to extreme stress.
        “The work challenges our understanding of early animal development and body plans, opening new avenues for the study of life cycle plasticity and rejuvenation. The fact that we have found a new species that uses this peculiar ‘time-travel machine’ raises fascinating questions about how spread this capacity is across the animal tree of life,” Soto-Angel, a postdoctoral fellow at Norway’s University of Bergen, was quoted as saying by Gizmodo.
        “Over several weeks, they [comb jelly] not only reshaped their morphological features, but also had a completely different feeding behaviour, typical of a cydippid larva,” he added.
        As per research, comb jellies could also be one of the first animals to have existed as their origin can be traced back to an estimated 700 million years ago.
        However, they are not the only members of the “time-travelers” club. Turritopsis dohrnii, known as the immortal jellyfish, have been observed to undergo reverse biological development too.
        The latest discovery pertaining to comb jellies could help better understand the ageing process in humans as well as the developmental biology of other animals.
    """

payload={
    'key': 'API_KEY',
    'txt': text_to_summarise2,
    'sentences': '3'
}

response = requests.post(url, data=payload)

print('Status code:', response.status_code)
print(response.json())

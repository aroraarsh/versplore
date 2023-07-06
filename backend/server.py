import heapq
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor
from sklearn.cluster import AgglomerativeClustering
import numpy as np
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

app = Flask(__name__)
CORS(app)

import spotipy
import pandas as pd
from spotipy.oauth2 import SpotifyClientCredentials
from lyricsgenius import Genius
from bs4 import BeautifulSoup
import requests
from requests.exceptions import Timeout
import time


import pandas as pd
import ast
import random

df = pd.read_csv('pop.csv')
df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)

def generate_lyric(song_index):
    lyrics_list = df.loc[song_index, 'Lyrics']
    if len(lyrics_list) < 3:
        return "Insufficient lyrics for random selection."
    random_start = random.randint(0, len(lyrics_list) - 5)
    random_lyrics = lyrics_list[random_start : random_start + 5]
    return random_lyrics

def question(song_indices):
    lyrics = generate_lyric(song_indices[0])
    correct_song = df.iloc[song_indices[0]]['Track Name']
    wrong_songs = []
    for i in range(1, 4):
        wrong_songs.append(df.iloc[song_indices[i]]['Track Name'])
    return (lyrics, correct_song, wrong_songs)

# def game():
#     song_indices = random.sample(range(len(df)), 4)
#     return question(song_indices)

def game():
    song_indices = random.sample(range(len(df)), 4)
    lyrics, correct_song, wrong_songs = question(song_indices)
    return {
        "lyrics": lyrics,
        "correct_song": correct_song,
        "options": [correct_song] + wrong_songs
    }


@app.route('/api/game', methods=['GET'])
def play_game():
    data = game() 
    return jsonify(data)
    
if __name__ == '__main__':
    app.run()







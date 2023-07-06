import random
import ast
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

app = Flask(__name__)
CORS(app)


def generate_lyric(df, song_index):
    lyrics_list = df.loc[song_index, 'Lyrics']
    if len(lyrics_list) < 3:
        return "Insufficient lyrics for random selection."
    random_start = random.randint(0, len(lyrics_list) - 5)
    random_lyrics = lyrics_list[random_start: random_start + 5]
    return random_lyrics


def question(df, song_indices):
    lyrics = generate_lyric(df, song_indices[0])
    correct_song = df.iloc[song_indices[0]]['Track Name']
    wrong_songs = []
    for i in range(1, 4):
        wrong_songs.append(df.iloc[song_indices[i]]['Track Name'])
    return (lyrics, correct_song, wrong_songs)


def game(df):
    song_indices = random.sample(range(len(df)), 4)
    lyrics, correct_song, wrong_songs = question(df, song_indices)
    return {
        "lyrics": lyrics,
        "correct_song": correct_song,
        "options": [correct_song] + wrong_songs
    }


@app.route('/api/game/rap', methods=['GET'])
def rap_game():
    df = pd.read_csv('rap.csv')
    df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)
    data = game(df)
    return jsonify(data)


@app.route('/api/game/pop', methods=['GET'])
def pop_game():
    df = pd.read_csv('pop.csv')
    df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)
    data = game(df)
    return jsonify(data)


@app.route('/api/game/disney', methods=['GET'])
def disney_game():
    df = pd.read_csv('disney.csv')
    df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)
    data = game(df)
    return jsonify(data)

@app.route('/api/game/rnb', methods=['GET'])
def rnb_game():
    df = pd.read_csv('rnb.csv')
    df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)
    data = game(df)
    return jsonify(data)

if __name__ == '__main__':
    app.run()

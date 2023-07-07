import random
import ast
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import spotipy
import pandas as pd
from spotipy.oauth2 import SpotifyClientCredentials
import os


load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Spotify API credentials
client_credentials_manager = SpotifyClientCredentials(
    client_id=os.getenv("REACT_APP_CID"),
    client_secret=os.getenv("REACT_APP_SEC"),
)
spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# ... your existing routes and middleware ...

# Game route with Spotify integration
import time

@app.route('/api/game/spotify', methods=['GET'])
def spotify_game():
    playlist_id = '4riovLwMCrY3q0Cd4e0Sqp'  # Replace with your Spotify playlist ID
    max_retries = 3  # Maximum number of retries

    try_count = 0
    while try_count < max_retries:
        try_count += 1

        try:
            # Retrieve the playlist tracks from Spotify API
            results = spotify.playlist_tracks(playlist_id)
            tracks = results['items']

            if len(tracks) < 4:
                return jsonify(error='Insufficient tracks in the playlist.')

            # Shuffle the tracks and select four random ones
            random_tracks = random.sample(tracks, 4)

            for track in random_tracks:
                song_name = track['track']['name']
                preview_url = track['track']['preview_url']
                if preview_url:
                    correct_song = song_name
                    break
            else:
                # Continue to the next iteration if no song with a preview URL is found
                continue

            song_options = [track['track']['name'] for track in random_tracks]
            random.shuffle(song_options)

            # Generate the game data
            data = {
                'correct_song': correct_song,
                'options': song_options,
                'preview_url': preview_url
            }

            return jsonify(data)

        except spotipy.SpotifyException as e:
            print('Error:', e)

        time.sleep(1)  # Wait for 1 second before retrying

    return jsonify(error='Failed to retrieve playlist tracks with a preview URL from Spotify.')



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

@app.route('/api/game/country', methods=['GET'])
def country_game():
    df = pd.read_csv('country.csv')
    df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)
    data = game(df)
    return jsonify(data)

@app.route('/api/game/rock', methods=['GET'])
def rock_game():
    df = pd.read_csv('rock.csv')
    df['Lyrics'] = df['Lyrics'].apply(ast.literal_eval)
    data = game(df)
    return jsonify(data)

if __name__ == '__main__':
    app.run()

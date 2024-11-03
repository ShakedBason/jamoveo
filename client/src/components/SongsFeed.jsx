// SongsFeed.js
import React from 'react';
import styled from 'styled-components';

// Styled components for SongsFeed
const FeedContainer = styled.div`
    background-color: #f0f8ff;
    padding: 30px; 
    max-width: 900px; 
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;

    @media (max-width: 768px) {
        padding: 20px; 
        max-width: 100%; 
    }
`;

const SongItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2vw; 
    padding: 1vw; 
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    cursor: pointer; // Make the item appear clickable

    img {
        width: 65%; 
        height: auto; 
        border-radius: 5px;
        margin-right: 10px;
    }

    &:hover {
        background-color: #e0f7fa; // Change background on hover
    }
`;

const SongsFeed = ({ songs, onSongSelect }) => (
    <FeedContainer>
        {songs.length > 0 ? (
            songs.map((song) => (
                <SongItem key={song.id} onClick={() => onSongSelect(song)}>
                    {song.image && <img src={`${process.env.PUBLIC_URL}/${song.image}`} alt={song.title} />}
                    <div>
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                    </div>
                </SongItem>
            ))
        ) : (
            <p>No songs to show</p>
        )}
    </FeedContainer>
);

export default SongsFeed;

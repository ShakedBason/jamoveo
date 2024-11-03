// src/components/LyricsTable.js
import React from 'react';

const LyricsTable = ({ lyrics, isPlayer, isHebrewTitle }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {lyrics.map((line, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="chords_en" style={{ fontSize: '3vw', textAlign: isHebrewTitle ? 'right' : 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {line.map((word, wordIndex) => (
                    <div
                      key={wordIndex}
                      style={{
                        display: 'flex',
                        flexDirection: 'column', // Stack the chord and lyric vertically
                        alignItems: isHebrewTitle ? 'flex-end' : 'flex-start',
                        margin: '0 5px',
                        minWidth: '30px', // Ensure a minimum width
                      }}
                    >
                      {isPlayer ? (
                        <span
                          style={{
                            color: 'red', // Chord color
                            textAlign: 'center',
                            minHeight: '1em', // Maintain height for spacing
                          }}
                        >
                          {word.chords || <span style={{ visibility: 'hidden' }}>&nbsp;</span>} {/* Placeholder for no chord */}
                        </span>
                      ) : (
                        <span style={{ minHeight: '1em' }}>&nbsp;</span> // Placeholder to keep spacing when not showing chords
                      )}
                      <span style={{ textAlign: 'center' }}>
                        {word.lyrics}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default LyricsTable;

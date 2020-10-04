import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Piece from '../Piece';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Chess from 'chess.js';

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: ${(props) =>
    props.selected ? 'yellow' : props.dark ? '#b37a4c' : '#e3bc9a'};
  font-size: 200%;
  font-weight: bold;
  line-height: 100%;
`;

const Board = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const alphabet = 'abcdefgh';

const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function convert(str, p1, offset, s) {
  return '_'.repeat(str);
}

const FENtoGrid = (fenString) => {
  let position = fenString.split(' ')[0].split('/');
  return position.map((el) => el.replace(new RegExp('[0-9]', 'g'), convert));
};

const coordToPos = (i, j) => alphabet[j] + (8 - i);

const game = new Chess(initialFEN);

const Game = () => {
  const [pos, setPos] = useState(FENtoGrid(initialFEN));
  const [selected, setSelected] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      console.log('transcript', transcript);
      if (transcript.includes(' ')) {
        const from = transcript.replace('age', 'h').split(' ')[0].toLowerCase();

        const to = transcript.replace('age', 'h').split(' ')[1].toLowerCase();
        if (game.move({ from, to }) !== null) {
          setPos(FENtoGrid(game.fen()));
          SpeechRecognition.stopListening();
        }
      }
    }
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <>
      <Board>
        {[...Array(8).keys()].map((i) => (
          <Row key={`outer-${i}`}>
            {[...Array(8).keys()].map((j) => (
              <Square
                key={`inner-${j}`}
                onClick={() => {
                  if (selected === '' && pos[i].charAt(j) === '_') return;
                  if (selected === coordToPos(i, j)) {
                    setSelected('');
                  } else {
                    if (selected === '') {
                      setSelected(coordToPos(i, j));
                    } else {
                      const y = alphabet.indexOf(selected.charAt(0));
                      const x = parseInt(8 - selected.charAt(1));

                      console.log(coordToPos(x, y) + coordToPos(i, j));
                      if (
                        game.move({
                          from: coordToPos(x, y),
                          to: coordToPos(i, j),
                        }) !== null
                      ) {
                        console.log('fen', game.fen());
                        setPos(FENtoGrid(game.fen()));

                        setSelected('');
                      }
                    }
                  }
                }}
                selected={selected === coordToPos(i, j)}
                dark={i % 2 === 0 ? j % 2 === 1 : j % 2 === 0}
              >
                <Piece
                  char={pos[i].charAt(j) === '_' ? '' : pos[i].charAt(j)}
                />
              </Square>
            ))}
          </Row>
        ))}
      </Board>

      <div>
        <button
          onClick={() =>
            SpeechRecognition.startListening({ language: 'de-DE' })
          }
        >
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript.replace('age', 'h')}</p>
      </div>
    </>
  );
};

export default Game;

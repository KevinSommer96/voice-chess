import React from 'react';
import styled from 'styled-components';
import WhitePawn from '../../assets/icons/white_pawn.svg';
import WhiteRook from '../../assets/icons/white_rook.svg';
import WhiteKnight from '../../assets/icons/white_knight.svg';
import WhiteBishop from '../../assets/icons/white_bishop.svg';
import WhiteKing from '../../assets/icons/white_king.svg';
import WhiteQueen from '../../assets/icons/white_queen.svg';

import BlackPawn from '../../assets/icons/black_pawn.svg';
import BlackRook from '../../assets/icons/black_rook.svg';
import BlackKnight from '../../assets/icons/black_knight.svg';
import BlackBishop from '../../assets/icons/black_bishop.svg';
import BlackKing from '../../assets/icons/black_king.svg';
import BlackQueen from '../../assets/icons/black_queen.svg';

const SVGPiece = styled.img`
  width: 100%;
  height: auto;
`;

const Piece = (props) => {
  const color = props.char === props.char.toUpperCase() ? 'white' : 'black';

  if (props.char === 'P') return <SVGPiece src={WhitePawn} alt="P" />;
  if (props.char === 'R') return <SVGPiece src={WhiteRook} alt="R" />;
  if (props.char === 'N') return <SVGPiece src={WhiteKnight} alt="N" />;
  if (props.char === 'B') return <SVGPiece src={WhiteBishop} alt="B" />;
  if (props.char === 'K') return <SVGPiece src={WhiteKing} alt="K" />;
  if (props.char === 'Q') return <SVGPiece src={WhiteQueen} alt="Q" />;

  if (props.char === 'p') return <SVGPiece src={BlackPawn} alt="p" />;
  if (props.char === 'r') return <SVGPiece src={BlackRook} alt="r" />;
  if (props.char === 'n') return <SVGPiece src={BlackKnight} alt="n" />;
  if (props.char === 'b') return <SVGPiece src={BlackBishop} alt="b" />;
  if (props.char === 'k') return <SVGPiece src={BlackKing} alt="k" />;
  if (props.char === 'q') return <SVGPiece src={BlackQueen} alt="q" />;

  return <div style={{ color: color }}>{props.char}</div>;
};

export default Piece;

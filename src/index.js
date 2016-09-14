import Board from './modules/Board';
import Snake from './modules/Snake';
import Food from './modules/Food';
import { WIDTH, HEIGHT } from './constants';

const gameNode = document.getElementById('game_board');

let board = new Board(WIDTH, HEIGHT, gameNode);

board.drawGrid();


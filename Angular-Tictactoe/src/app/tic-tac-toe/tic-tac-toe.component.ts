import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  PLAYER_X = '✖️';
  PLAYER_O = '⭕️';
  currentPlayer = this.PLAYER_X;
  cells: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  information: string = `Player's ${this.currentPlayer} turn`;
  feedback: string = '';
  winner: string = '';

  handleCellClick(row: number, col: number): void {
    if (this.cells[row][col] === this.PLAYER_X || this.cells[row][col] === this.PLAYER_O || this.winner !== '') {
      return;
    }

    this.cells[row][col] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === this.PLAYER_X ? this.PLAYER_O : this.PLAYER_X;
    this.information = `Player's ${this.currentPlayer} turn`;

    this.checkWinner();
  }

  checkWinner(): void {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.cells[i][0] === this.cells[i][1] && this.cells[i][1] === this.cells[i][2] && this.cells[i][0] !== '') {
        this.winner = this.cells[i][0];
        this.feedback = `${this.cells[i][0]} wins!`;
        this.information = '';
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.cells[0][i] === this.cells[1][i] && this.cells[1][i] === this.cells[2][i] && this.cells[0][i] !== '') {
        this.winner = this.cells[0][i];
        this.feedback = `${this.cells[0][i]} wins!`;
        this.information = '';
        return;
      }
    }

    // Check diagonals
    if (this.cells[0][0] === this.cells[1][1] && this.cells[1][1] === this.cells[2][2] && this.cells[0][0] !== '') {
      this.winner = this.cells[0][0];
      this.feedback = `${this.cells[0][0]} wins!`;
      this.information = '';
      return;
    }

    if (this.cells[0][2] === this.cells[1][1] && this.cells[1][1] === this.cells[2][0] && this.cells[0][2] !== '') {
      this.winner = this.cells[0][2];
      this.feedback = `${this.cells[0][2]} wins!`;
      this.information = '';
      return;
    }


    // Check for tie
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.cells[i][j] === '') {
          isTie = false;
          break;
        }
      }
    }

    if (isTie) {
      this.feedback = 'Tie!';
      this.winner = 'Tie';
      this.information = '';
    }
  }

  resetGame(): void {
    this.cells = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = this.PLAYER_X;
    this.information = `Player's ${this.currentPlayer} turn`;
    this.feedback = '';
    this.winner = '';
  }
}

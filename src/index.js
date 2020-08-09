import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 正方形のマス目を1つの<button>としてレンダー
class Square extends React.Component {
	render() {
		return (
			<button className="square" onClick={function () { alert('click');}}>
				{this.props.value}
			</button>
		);
	}
}

// Boardは9このマス目をレンダー
class Board extends React.Component {
	// BoardのrenderSquareメソッド内で、props(properties)としてvalueをSquareコンポーネントに渡す
	renderSquare(i) {
		return <Square value={i} />;
	}

	render() {
		const status = 'Next player: X';

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

// 盤面とブレースホルダーを描画
class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
		document.getElementById('root')
);

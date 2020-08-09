import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 正方形のマス目を1つの<button>としてレンダー

// 関数コンポーネント化したため削除
// class Square extends React.Component {
// 	// Squareコンポーネントに自分がクリックされたことを覚えさせる。
// 	// コンポーネントが何かを「覚えるためには」state を使う。
	
// 	// React コンポーネントはコンストラクタで this.state を設定することで、状態を持つことができるようになります。
// 	// this.state はそれが定義されているコンポーネント内でプライベートと見なすべきものです。

// 	// state のリフトアップの部分で削除
// 	// constructor(props) {
// 	// 	// JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要があります。
// 	// 	// constructor を持つ React のクラスコンポーネントでは、すべてコンストラクタを super(props) の呼び出しから始めるべきです。
// 	// 	super(props);
// 	// 	this.state = {
// 	// 		value: null,
// 	// 	};
// 	// }

// 	render() {
// 		return (
// 			// () => はJavaScriptのアロー関数 function() {} と同じ
// 			// クリックされたときに state の現在値を表示する
// 			// Square の render メソッド内に書かれた onClick ハンドラ内で this.setState を呼び出すことで、React に <button> がクリックされたら常に再レンダーするよう伝えることができます。
// 			<button
// 				className="square"
// 				onClick={() => this.props.onClick()}
// 			>
// 				{this.props.value}
// 			</button>
// 		);
// 	}
// }

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

// Boardは9このマス目をレンダー
class Board extends React.Component {
	// 初期 state に 9 個の null が 9 個のマス目に対応する 9 個の null 値をセットします。
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
		});
	}

	// BoardのrenderSquareメソッド内で、props(properties) としてvalueをSquareコンポーネントに渡す
	// JavaScript が return の後にセミコロンを挿入するのを防ぐため、カッコを付け加えています。
	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		// xIsNext が true なら X を代入、false なら O を代入する。
		// const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

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

// 9 つの square の配列が与えられると、この関数は勝者がいるか適切に確認し、'X' か 'O'、あるいは null を返します。
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render(
	<Game />,
		document.getElementById('root')
);

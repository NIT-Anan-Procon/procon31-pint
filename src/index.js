import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 正方形のマス目を1つの<button>としてレンダー
class Square extends React.Component {
	// Squareコンポーネントに自分がクリックされたことを覚えさせる。
	// コンポーネントが何かを「覚えるためには」state を使う。
	
	// React コンポーネントはコンストラクタで this.state を設定することで、状態を持つことができるようになります。
	// this.state はそれが定義されているコンポーネント内でプライベートと見なすべきものです。
	constructor(props) {
		// JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要があります。
		// constructor を持つ React のクラスコンポーネントでは、すべてコンストラクタを super(props) の呼び出しから始めるべきです。
		super(props);
		this.state = {
			value: null,
		};
	}
	render() {
		return (
			// () => はJavaScriptのアロー関数 function() {} と同じ
			// クリックされたときに state の現在値を表示する
			// Square の render メソッド内に書かれた onClick ハンドラ内で this.setState を呼び出すことで、React に <button> がクリックされたら常に再レンダーするよう伝えることができます。
			<button
				className="square"
				onClick={() => this.setState({ value: 'X' })}
			>
				{this.state.value}
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

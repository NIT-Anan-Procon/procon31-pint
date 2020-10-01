# procon31 Pint

## 開発環境

* Ubuntu 20.04 LTS

* Node.js 12.84.4

	* npm 6.14.6

	* yarn 1.22.5
	
	* React 16.13.1
	
	* axios 0.19.2
	
	* react-youtube 7.11.3
	
## 動作環境

* Google Chrome 最新版

## 実行方法

* `npm install`

	依存ファイル、コンポーネントの同期・置き換え

* `yarn start`

	開発モードで動く

* `yarn build`

	Reactのプロジェクトファイルを出力する

## ファイル構成

* `public`

	Reactがコンパイルされたときに呼び出される

* `src`

	JavaScriptのソースセット

	* `css`

		描画時に呼び出されるCSSフォルダ

	* `image`

		写真やロゴを置くフォルダ

* `index.js`

	indexとして最初に読み込まれ、YouTubePlayerコンポーネントの呼び出し

* `YouTubePlayer.js`

	YouTube動画の読み込み、全体のコンポーネントの描画

* `PinBox.js`

	ピンを表示する箱の描画。Pinコンポーネントを呼び出し

	* `Pin.js`

		ピンの描画

	* `PinHighLight.js`

		ピンのハイライト・情報の描画

* `PinController.js`

	ピン立てボタンの描画

* `ChatContainer.js`

	チャット全体の描画

	* `Message.js`

		チャットメッセージの描画

	* `ReplyMessage.js`

		返信メッセージの描画

		* `Good.js`

			いいねボタンの描画

	* `InputContainer.js`

		チャット入力欄の描画


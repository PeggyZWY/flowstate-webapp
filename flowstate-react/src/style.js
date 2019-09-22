import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	html {
	  font-family: sans-serif;
	  -ms-text-size-adjust: 100%;
	  -webkit-text-size-adjust: 100%;
	  -webkit-font-smoothing: antialiased; 
	  -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
	}

	body {
	  margin: 0;
	  font-family: Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    width: 100%;
    height: 100%;
    background-color: #333;
    position: relative;
    word-wrap: break-word;
	}

	body, h1, h2, h3, h4, h5, h6, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td, code, div, img, a, header, footer {
	  margin: 0;
	  padding: 0;
	}

	ul, ol {
	  list-style: none;
	}

	table {
	  border-collapse: collapse;
	  border-spacing: 0;
	}

	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	main,
	menu,
	nav,
	section,
	summary {
	  display: block;
	}

	audio,
	canvas,
	progress,
	video {
	  display: inline-block;
	}

	audio:not([controls]) {
	  display: none;
	  height: 0;
	}

	progress {
	  vertical-align: baseline;
	}

	template,
	[hidden] {
	  display: none;
	}

	a {
	  background-color: transparent;
	  -webkit-text-decoration-skip: objects;
	  text-decoration: none;
	}

	a:active,
	a:hover {
	  outline-width: 0;
	  text-decoration: underline;
	  word-break: break-all;
	  word-wrap:break-word;
	}

	abbr[title] {
	  border-bottom: none;
	  text-decoration: underline;
	  text-decoration: underline dotted;
	}

	b,
	strong {
	  font-weight: inherit;
	}

	b,
	strong {
	  font-weight: bolder;
	}

	dfn {
	  font-style: italic;
	}

	h1 {
	  font-size: 2em;
	  margin: 0.67em 0;
	}

	mark {
	  background-color: #ff0;
	  color: #000;
	}

	small {
	  font-size: 80%;
	}

	sub,
	sup {
	  font-size: 75%;
	  line-height: 0;
	  position: relative;
	  vertical-align: baseline;
	}

	sub {
	  bottom: -0.25em;
	}

	sup {
	  top: -0.5em;
	}

	img {
	  border-style: none;
	}

	svg:not(:root) {
	  overflow: hidden;
	}

	code,
	kbd,
	pre,
	samp {
	  font-family: monospace, monospace;
	  font-size: 1em;
	}

	figure {
	  margin: 1em 40px;
	}

	hr {
	  box-sizing: content-box;
	  height: 0;
	  overflow: visible;
	}

	button,
	input,
	select,
	textarea {
	  font: inherit;
	  margin: 0;
	}

	optgroup {
	  font-weight: bold;
	}

	button,
	input {
	  overflow: visible;
	}

	button,
	select {
	  text-transform: none;
	}

	button,
	html [type="button"],
	[type="reset"],
	[type="submit"] {
	  -webkit-appearance: button;
	}

	button::-moz-focus-inner,
	[type="button"]::-moz-focus-inner,
	[type="reset"]::-moz-focus-inner,
	[type="submit"]::-moz-focus-inner {
	  border-style: none;
	  padding: 0;
	}

	button:-moz-focusring,
	[type="button"]:-moz-focusring,
	[type="reset"]:-moz-focusring,
	[type="submit"]:-moz-focusring {
	  outline: 1px dotted ButtonText;
	}

	fieldset {
	  border: 1px solid #c0c0c0;
	  margin: 0 2px;
	  padding: 0.35em 0.625em 0.75em;
	}

	legend {
	  box-sizing: border-box;
	  color: inherit;
	  display: table;
	  max-width: 100%;
	  padding: 0;
	  white-space: normal;
	}

	textarea {
	  overflow: auto;
	}

	[type="checkbox"],
	[type="radio"] {
	  box-sizing: border-box;
	  padding: 0;
	}

	[type="number"]::-webkit-inner-spin-button,
	[type="number"]::-webkit-outer-spin-button {
	  height: auto;
	}

	[type="search"] {
	  -webkit-appearance: textfield;
	  outline-offset: -2px;
	}

	[type="search"]::-webkit-search-cancel-button,
	[type="search"]::-webkit-search-decoration {
	  -webkit-appearance: none;
	}

	::-webkit-input-placeholder {
	  color: inherit;
	  opacity: 0.54;
	}

	::-webkit-file-upload-button {
	  -webkit-appearance: button;
	  font: inherit;
	}
`;

export const FullPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%; 
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 20;
  background-color: #333;
  opacity: 0.7;
  padding: 20%;
`;

export const ModalWrapper = styled.div`
  background-color: white;
  opacity: 1;
  width: 30%;
  min-width: 300px;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  text-align: center;
  padding: 20px;
  line-height: 2;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  div {
  	line-height: 1.2;
    padding-bottom: 0.675em;
  }
`;

export const Form = styled.form`
	margin: 0 auto;
	overflow: hidden;
	label {
		width: 12em;
		height: 2em;
		line-height: 2em;
		vertical-align: baseline;
	  float: left;
	  text-align: left;
	  margin-bottom: 5px;
	}
	input {
		display: block;
		float: left
    width: 6em;
    height: 2em;
    line-height: 2em;
    font-size: 0.9em;
    margin-bottom: 5px;
	}
`;

export const Button = styled.button`
  display: block;
  margin: 0.5em auto;
  color: black;
  text-decoration: none;
  border: 2px solid orange;
  border-radius: 15px;
  padding: 0.4em 0.8em;
  font-size: 1em;
  background: white;
`;

export const Language = styled.span`
  font-size: 12px;
  margin: 4px;
  padding: 4px;
  border: 1px solid grey;\
  &:hover {
  	color: orange;
  }
`;

export const Header = styled.header`
  padding: 0.625em 20%;
  text-align: center;
  overflow: hidden;
`;

export const HeaderItem = styled.div`
	width: 20%;
	display: block;
	img {
		width: 2em;
		height: 2em;
	}
	span {
    vertical-align: super;
    font-size: 1.5em;
    color: white;
    margin-left: 0.3em;
	}
	:nth-child(1) {
		float: left;
	}
	:nth-child(2) {
		float: left;
		margin: 0 20%;
		img {
			display: inline-block;
			width: 2.5em;
			height: 2.5em;
		}
	}
	:nth-child(3) {
		float: right;
	}
`;

export const EditorWrapper = styled.div`
	width: 80%;
	.mde-text {
		height: ${props => props.height}px !important;
		background-color: rgba(173, 216, 230, ${props => props.alpha});
	}
	margin: 0 auto;
	background-color: white;
`;

export const Footer = styled.footer`
	width: 100%;
  padding: 0.625em 0;
  text-align: center;
  overflow: hidden;
	color: white;
	font-size: 0.8em;
`;

export const FooterItem = styled.a.attrs({
	target: '_blank'
})`
	display: inline-block;
	margin-left: 1.5em;
	padding-right: 1.5em;
	cursor: pointer;
	color: white;
	text-decoration: none;
	border-right: 1px solid white;
	:nth-child(3) {
		border-right: none;
	}
	:visited {
		color: white;
		text-decoration: none;
	}
	:hover {
		color: orange;
		text-decoration: none;
	}
`;



import React from "react";
import ReactDOM from "react-dom";

import Board from "Components/Board/index"

ReactDOM.render(<Board squares={ Array(9).fill(null) } />, document.getElementById('root'));
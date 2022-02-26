import React from "react";

const styles = {
  opacity:"0.5",
  backgroundColor: "grey",
  position: "fixed",
  width: "100vw",
  height: "100vh",
  zIndex: "1000",
  left: "0",
  right: "0",
}

export default function LossPage() {
	return <div style={styles}>
			<p 
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					fontSize: "5em",
					color: "black",
          transform: "translate(-50%, -100%)",
				}}
			>
				You Lose :(
			</p>
	</div>
}
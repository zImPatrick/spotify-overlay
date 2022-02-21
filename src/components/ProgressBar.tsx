import { Component } from "react";

interface Props {
	progress: number,
}

export default class ProgressBar extends Component<Props, {}> {
	render() {
		return <div 
				className="progressBar" 
				style={{ width: (this.props.progress ?? 0) + "%"}}
			/>;
	}
}
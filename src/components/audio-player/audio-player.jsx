import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.audioRef = React.createRef();
  }

  render() {
    const {src, onButtonClick} = this.props;
    const isSignPlay = !this.props.isPlaying || this.state.isLoading;

    return (
      <React.Fragment>
        <button className={`track__button track__button--${isSignPlay ? `play` : `pause`}`} type="button"
          onClick={onButtonClick} disabled={this.state.isLoading}/>
        <div className="track__status">
          <audio src={src} ref={this.audioRef}/>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const audioPlayer = this.audioRef.current;

    audioPlayer.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };
  }

  componentDidUpdate() {
    const audioPlayer = this.audioRef.current;

    if (this.props.isPlaying) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

  componentWillUnmount() {
    const audioPlayer = this.audioRef.current;

    audioPlayer.oncanplaythrough = ``;
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

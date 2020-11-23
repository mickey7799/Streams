import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream, fetchVideo } from '../../actions';
import StreamDetail from './StreamDetail';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchStream(this.props.id).then(() => {
      this.props.fetchVideo(this.props.stream.title);
    });
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        {this.props.isStreaming ? (
          <video ref={this.videoRef} style={{ width: '100%' }} controls />
        ) : (
          <StreamDetail video={this.props.selectedVideo} />
        )}
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    video: state.streams.video
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, fetchVideo }
)(StreamShow);

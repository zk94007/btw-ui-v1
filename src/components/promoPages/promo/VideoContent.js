import React from 'react';
import ReactPlayer from 'react-player';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class VideoContent extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        }
    }

    playPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    ref = player => {
        this.player = player;
    };

    render() {
        const { playing } = this.state;

        return (
            <div className='bpp-video-content'>
                <div className='video-part'>
                    <div className='video-player'>
                        <ReactPlayer
                            url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
                            width='100%'
                            height='100%'
                            playing={playing}
                            ref={this.ref}
                        />
                        <div className='big-watch-video'>
                            <SvgIcon
                                width={56}
                                height={56}
                                name='video-blue-player'
                                onClick={this.playPause} />
                        </div>
                    </div>
                </div>
                <div className='description-part'>
                    <Typography className='video-title'>
                        Be That Friend!
                    </Typography>
                    <Typography lightColor className='video-description'>
                        You can get your friends to vote, the ones that are busy,
                        or that have difficulty getting it together, you can even
                        help them to register to vote. What you need is the commitment
                        to help them, and some support. That’s what we are here for.
                    </Typography>
                    <span className='small-watch-video' onClick={this.playPause}>
                        <SvgIcon name='video-blue-player' width={24} height={24} className='pr-2' />
                        Watch The Video
                    </span>
                </div>
            </div>
        );
    }
}

export default VideoContent;
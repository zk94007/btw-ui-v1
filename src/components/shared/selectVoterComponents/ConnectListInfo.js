import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { BaseComponent, Button, Typography, SvgIcon, SwitchButton } from '../index';

class ConnectListInfo extends BaseComponent {

    onSwitchHandler = (value, event) => {
    }

    renderFileItem = (file, index) => {
        return (
            <div key={index} className='file-item'>
                <div className='file-info'>
                    <SvgIcon name='voter-list-file' />
                    <Typography variant='functional' lightColor className='file-name'>{file.name}</Typography>
                </div>
                <div className='file-action'>
                    <SwitchButton onSwitch={this.onSwitchHandler} />
                </div>
            </div>
        )
    }

    renderFileList = () => {
        const { files } = this.props;

        if (files.length !== 0) {
            return (
                <div className='file-list'>
                    {files.map((file, index) => (
                        this.renderFileItem(file, index)
                    ))}
                </div>
            )
        }
    }
    render() {
        const { importFiles, className } = this.props;

        return (
            <div className={classNames('btw-connect-list-info btw-paper', className)}>
                <Typography className='title'>
                    Connected lists
                </Typography>
                {this.renderFileList()}
                <Typography variant='body' lightColor className='description'>
                    Have a list of voters you want to work with? Use it!
                </Typography>
                <Typography variant='body' lightColor className='description'>
                    Accepted formats: .csv, Excel (.xls, .xlsx)
                </Typography>
                <Button
                    className='import-button'
                    onClick={importFiles}
                    color='white'>
                    Import New List
                </Button>
            </div>
        );
    }
}

ConnectListInfo.propTypes = {
    files: PropTypes.array,
    switchStatus: PropTypes.func,
    importFiles: PropTypes.func
};

ConnectListInfo.defaultProps = {
    files: []
}

export default ConnectListInfo;

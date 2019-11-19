import React from 'react'

import Icon from './Icon';

class SvgIcon extends React.Component {
  render() {
    return <Icon ext='svg' {...this.props} />
  }
}

export default SvgIcon;

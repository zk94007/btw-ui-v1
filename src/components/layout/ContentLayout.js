import React from 'react';
import { Container } from 'react-bootstrap'

import { BaseComponent } from '../shared';
import colors from '../../constants/ColorConstants';

export default class ContentLayout extends BaseComponent {
    render() {
        const { color = colors.lightGrey} = this.props;
        return (
            <Container>
                { this.renderBackground(color) }
                { this.props.children }
            </Container>
        )
    }
}
import React from 'react';
import { TextInput as Input } from './InputBase';
import InputBase from './InputBase';

export default class TextInput extends InputBase {
    render () {
        const { label } = this.props;
        return <Input label={label} type='text' {...this.props } />
    }
}
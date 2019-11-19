import React from 'react';
import PropTypes from 'prop-types';
import SimpleAutoComplete from 'react-autocomplete';
import cn from 'classnames';

import colors from '../../constants/Colors';
import { BaseComponent } from './index';

class Autocomplete extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    onChange = e => {
        const value = e.target.value;

        this.setState({ value });
        this.props.onChange(value);
    };

    onSelect = (value, item) => {
        this.setState({ value });
        this.props.onSelect(item);
    };

    getItemValue = item => item.label;

    renderInput = (props) => {
        const { inputClass, placeholder } = this.props;
        const { value } = this.state;

        return (
            <div className={cn('input-class', inputClass)}>
                <i className={cn('fa fa-search', { 'i-active': !!value })} />
                <input placeholder={placeholder} {...props} />
            </div>
        )
    };

    renderItem = ({ id, label }, isHighlighted) => {
        return (
            <div key={id} className='item' style={{ background: isHighlighted ? colors.divider : colors.white }}>
                <div className='item-value'>{label}</div>
            </div>
        );
    };

    renderMenu = (items, value, style) => {
        return <div className='menu' style={{ ...style, ...this.menuStyle }} children={items} />
    };

    render() {
        const { className, items } = this.props;
        const { value } = this.state;

        return (
            <div className={cn('btw-autocomplete', className)}>
                <SimpleAutoComplete
                    value={value}
                    items={items}
                    renderInput={this.renderInput}
                    getItemValue={this.getItemValue}
                    renderMenu={this.renderMenu}
                    renderItem={this.renderItem}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                />
            </div>
        )
    }
}

Autocomplete.defaultProps = {
    inputClass: '',
    placeholder: '',
    value: '',
    items: [],
    onChange: () => { },
    onSelect: () => { }
};

Autocomplete.propTypes = {
    // css class name for styling input text
    inputClass: PropTypes.string,
    placeholder: PropTypes.string,
    // default value
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    // array of items elements, each element is an object of { id, label }
    items: PropTypes.array.isRequired
};

export default Autocomplete;
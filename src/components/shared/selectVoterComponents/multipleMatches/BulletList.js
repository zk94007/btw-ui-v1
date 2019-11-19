import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../index';
import { BulletItem } from '../index';

class BulletList extends BaseComponent {
    render() {
        const { steps, currentStep, idealLength } = this.props;

        return (
            <div className='btw-bullet-list'>
                {steps.map((step, index) => (
                    <BulletItem
                        key={index}
                        status={step.status}
                        isSmall={steps.length > idealLength}
                        isLast={steps.length === index + 1}
                        isActive={currentStep === index}
                        stepNumber={index + 1}
                    />
                ))}
            </div>
        )
    }
}

BulletList.propTypes = {
    steps: PropTypes.array,
    currentStep: PropTypes.number
};

BulletList.defaultProps = {
    steps: [],
    currentStep: 0,
    idealLength: 10
}

export default BulletList;
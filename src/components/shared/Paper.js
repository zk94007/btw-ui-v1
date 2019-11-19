import React from 'react';
import cn from 'classnames';

const Paper = ({ className, children }) => {
    return (
        <div className={cn('btw-paper', className)}>
            { children }
        </div>
    )
};

export default Paper;
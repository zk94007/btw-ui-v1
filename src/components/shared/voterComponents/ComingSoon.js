import React from 'react';
import { SvgIcon, Typography } from '../index';

const ComingSoon = () => {
  return (
      <div className='d-flex flex-row align-items-center'>
          <SvgIcon name='present' width={50} height={70} />
          <Typography variant='body' style={{ fontSize: 15 }} lightColor>Feature coming soon</Typography>
      </div>
  )
};

export default ComingSoon;
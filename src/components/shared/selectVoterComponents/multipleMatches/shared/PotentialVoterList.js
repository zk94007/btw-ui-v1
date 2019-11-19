import React from 'react'
import { Typography } from '../../../index';
import PotentialVoterItem from './PotentialVoterItem';

const PotentialVoterList = ({ potentialVoters, selectedVoterId, selectPotentialVoterHandler }) => {

    return (
        <>
            <Typography variant='body' lightColor>
                Please, match this contact with the right voter profile:
            </Typography>
            <div className='potential-list'>
                { potentialVoters.map((item, index) => (
                    <PotentialVoterItem
                        key={index}
                        isSelected={item.id === selectedVoterId}
                        voter={item}
                        onSelect={selectPotentialVoterHandler(item)} />
                )) }
            </div>
        </>
    )
};

export default PotentialVoterList;
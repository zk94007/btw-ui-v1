import React from 'react';
import {Typography} from "../../../index";

const Description = ({ firstname, lastname } ) => {
    return (
        <>
            <Typography variant='body' lightColor>
                We did our best to match your contact <b>{firstname} {lastname}</b> with a voter profile.
            </Typography>
            <Typography variant='body' lightColor>
                But we find 3 results for <b>{firstname} {lastname}</b> in your district.
            </Typography>
        </>
    )
};

export default Description;
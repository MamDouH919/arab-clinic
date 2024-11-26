import { Stack, styled } from '@mui/material';
import React from 'react'

const Root = styled(Stack)(({ theme }) => ({
    padding: 0,
    margin: 0,
    overflowY: "unset",
    // overflowY: "",
    ["& ul"]: {
        padding: 0,
        ["& li"]: {
            padding: 0,
            ["&::before"]: {
                margin: "0px !important"
            }
        }
    }
}));

const DangerouslySetInnerHTML = ({ data }: { data: string }) => {
    console.log(data);

    return (
        <Root className='ql-editor' spacing={0}
            dangerouslySetInnerHTML={{ __html: data }}
        />
    )
}

export default DangerouslySetInnerHTML
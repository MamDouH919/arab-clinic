import { Stack, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react'

const PREFIX = "html";
const classes = {
    serviceLines: `${PREFIX}-serviceLines`,
};

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
    },
    [`&.${classes.serviceLines}`]: {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical", /* Specify vertical text flow */
        overflow: "hidden", /* Hide overflow text */
        textOverflow: "ellipsis", /* Add ellipsis for truncated text */
        WebkitLineClamp: 2, /* Limit to 2 lines */
        lineClamp: 2, /* Standard property for line clamping */
    },
}));

const DangerouslySetInnerHTML = ({ data, limit = false }: { data: string, limit?: boolean }) => {    
    return (
        <Root
            className={clsx('ql-editor', {
                [classes.serviceLines]: limit,
            })}
            spacing={0}
            dangerouslySetInnerHTML={{ __html: data }}
        />
    )
}

export default DangerouslySetInnerHTML
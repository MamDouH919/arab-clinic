import { LinearProgress, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

// function GradientCircularProgress() {
//   return (
//     <React.Fragment>
//       <svg width={0} height={0}>
//         <defs>
//           <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#6999d5" />
//             <stop offset="100%" stopColor="#bc161a" />
//           </linearGradient>
//         </defs>
//       </svg>
//       <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
//     </React.Fragment>
//   );
// }

const WebsiteLoading = () => {
  return (
    <Stack height={"100dvh"} width={"100%"} justifyContent={"center"} alignItems={"center"} spacing={3}>
      <Image src="/logo.webp" alt="logo" width={300} height={100} />
      <Stack width={"200px"}>
        <LinearProgress />
      </Stack>
      {/* <GradientCircularProgress /> */}
    </Stack>
  )
}

export default WebsiteLoading

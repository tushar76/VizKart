import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

const SkeletonLoader = ({ shape, width, height }) => {
  const style = {
    width: width || "100%",  
    height: height || "100%", 
  };

  switch (shape) {
    case "rectangular":
      return (
        <Box sx={{ ...style }}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
      );
    case "text":
      return (
        <Box sx={{ ...style }}>
          <Skeleton variant="text" width="100%" height="40px" />
        </Box>
      );
    case "table":
      return (
        <Box sx={{ ...style }}>
          <Skeleton variant="rectangular" width="100%" height="50px" />
          <Skeleton variant="rectangular" width="100%" height="50px" />
          <Skeleton variant="rectangular" width="100%" height="50px" />
        </Box>
      );
    default:
      return null;
  }
};

      export default SkeletonLoader;
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TitleBar = () => {
  return (
    <Box
      height="50px"
      marginBottom={5}
      borderBottom={2}
      borderColor="lightgray"
      className="nav-box"
    >
      <Typography padding="15px" variant="h6" noWrap component="div">
        Home
      </Typography>
    </Box>
  );
};

export default TitleBar;

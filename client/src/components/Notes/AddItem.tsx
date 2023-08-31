import { NoteAdd } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  ButtonBase,
  ButtonBaseProps,
  CircularProgress,
  Typography,
} from "@mui/material";

interface AddItemAddProps extends ButtonBaseProps {
  label?: string;
}

const AddItem = ({
  label = "",
  disabled = false,
  ...props
}: AddItemAddProps) => {
  return (
    <ButtonBase
      disabled={disabled}
      {...props}
      sx={{
        minHeight: 80,
        borderRadius: 2,
        borderWidth: 2.5,
        borderColor: "grey.400",
        borderStyle: "dashed",
        display: "flex",
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NoteAdd sx={{ opacity: 0.45, marginBottom: 0.5, flexGrow: 1 }} />
        <Typography align="center" sx={{ opacity: 0.45 }}>
          {label}
        </Typography>
      </Box>
      <Backdrop
        open={disabled}
        sx={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ButtonBase>
  );
};

export default AddItem;

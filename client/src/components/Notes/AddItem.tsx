import { NoteAdd } from "@mui/icons-material";
import { Box, ButtonBase, ButtonBaseProps, Typography } from "@mui/material";

interface NoteGroupAddProps extends ButtonBaseProps {
  label?: string;
}

const NoteGroupAdd = ({ label = "", ...props }: NoteGroupAddProps) => {
  return (
    <ButtonBase
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
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <NoteAdd sx={{ opacity: 0.45, marginBottom: 0.5, flexGrow: 1 }} />
        <Typography align="center" sx={{ opacity: 0.45 }}>
          {label}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default NoteGroupAdd;

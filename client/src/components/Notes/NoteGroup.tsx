import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";

export interface NoteGroupProps {
  children?: React.ReactNode;
  title?: string;
  onTitleChange?: (title: string) => void;
  onDelete?: () => void;
}

const NoteGroup = ({
  children,
  title,
  onTitleChange,
  onDelete,
}: NoteGroupProps) => {
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          padding: 1,
          flexDirection: "row-reverse",
          "& .MuiAccordionSummary-expandIconWrapper": {
            marginRight: 1,
          },
        }}
      >
        <TextField
          onClick={(e) => {
            e.stopPropagation();
          }}
          size="small"
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
        />
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          sx={{ marginLeft: 1 }}
        >
          <Delete />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0.5 }}>
        <Stack spacing={1} useFlexGap divider={<Divider flexItem />}>
          {children}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default NoteGroup;

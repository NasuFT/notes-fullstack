import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";

export interface NoteItemProps {
  initialTitle?: string;
  initialNote?: string;
  onTitleChange?: (title: string) => void;
  onNoteChange?: (title: string) => void;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
}

const NoteItem = ({
  initialTitle,
  initialNote,
  onTitleChange,
  onNoteChange,
  onDelete,
  sx,
}: NoteItemProps) => {
  return (
    <Accordion disableGutters elevation={6} sx={sx}>
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
          defaultValue={initialTitle}
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
      <AccordionDetails sx={{ padding: 1 }}>
        <TextField
          multiline
          fullWidth
          minRows={3}
          defaultValue={initialNote}
          onChange={(e) => onNoteChange?.(e.target.value)}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default NoteItem;

import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { useState } from "react";

export interface NoteItemProps {
  title?: string;
  note?: string;
  onTitleChange?: (title: string) => void;
  onNoteChange?: (title: string) => void;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
}

const NoteItem = ({
  title,
  note,
  onTitleChange,
  onNoteChange,
  onDelete,
  sx,
}: NoteItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

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
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
        />
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleting(true);
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
          value={note}
          onChange={(e) => onNoteChange?.(e.target.value)}
        />
        <Dialog open={isDeleting}>
          <DialogTitle>{"Delete note?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this note?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button onClick={onDelete} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
};

export default NoteItem;

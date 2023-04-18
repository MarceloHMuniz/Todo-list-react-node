import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Checkbox,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface TaskItemProps {
  id: number;
  text: string;
  completed: boolean;
  onRemove: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  text,
  completed,
  onRemove,
  onToggleCompleted,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: completed ? "lightgreen" : "white",
        borderColor: completed ? "green" : "lightgrey",
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <CardContent>
        <Typography variant="body1" sx={{ textDecoration: completed ? "line-through" : "none" }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          edge="start"
          aria-label="toggle-completed"
          onClick={() => onToggleCompleted(id, completed)}
        >
          <Checkbox checked={completed} />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => onRemove(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

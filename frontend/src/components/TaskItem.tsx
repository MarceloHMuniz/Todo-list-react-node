import React from 'react';
import { Card, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface TaskProps {
  id: number;
  text: string;
  onRemove: (id: number) => void;
}

export const TaskItem: React.FC<TaskProps> = ({ id, text, onRemove }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
      <CardActions>
        <IconButton edge="end" aria-label="delete" onClick={() => onRemove(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
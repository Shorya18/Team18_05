import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function DashboardCard(props) {
  const navigate = useNavigate();
 const mpiscore=0.5;
  // Define the color based on MPI score
  let cardColor = '#83CFCD;';
  if (mpiscore > 0.7) {
    cardColor = '#EF5261';
  } else if (mpiscore >= 0.5) {
    cardColor = '#FDD36A';
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: cardColor,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() =>
        navigate("/community-profile", {
          state: {
            community: props.communityName,
          },
        })
      }
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <b>{props.communityName}</b>
        </Typography>
        <Typography variant="h5" color="text.primary">
          {props.description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          MPI SCORE:{mpiscore}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}

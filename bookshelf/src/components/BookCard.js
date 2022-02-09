import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BookCardDetailModal from "./BookCardDetailModal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BookCard(props) {
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Item>
        <Card sx={{ maxWidth: 400, minWidth: 150, margin: 1 }}>
          <CardMedia
            component="img"
            alt="Book Card"
            height="200"
            image={props.bookData?.imageLinks?.thumbnail}
            // "https://books.google.com/books/content?id=8Pr_kLFxciYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          />
          <CardContent sx={{ maxHeight: 30, pt: 1 }}>
            <Typography gutterBottom variant="h7" component="div">
              {props.bookData?.title}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              By {props.bookData?.authors[0]}
            </Typography>
          </CardContent>
          <CardActions>
            <BookCardDetailModal bookDetail={props.bookData} />

            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Item>
    </Grid>
  );
}

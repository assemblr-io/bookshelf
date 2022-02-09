import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import FormControl from "@mui/material/FormControl";
import CardMedia from "@mui/material/CardMedia";

import TextField from "@mui/material/TextField";
import axios from "axios";
import { UserContext } from "../UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 530,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// booke title with author: https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDmkfSjnnPP6Zl7m0MkrTDQZEjOP0g8y4A
//book title only search : https://www.googleapis.com/books/v1/volumes?q=flowers&key=AIzaSyDmkfSjnnPP6Zl7m0MkrTDQZEjOP0g8y4A

export default function BookCardDetailModal({ bookData }) {
  const { volumeInfo, status, _id } = bookData;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const userContext = React.useContext(UserContext);

  const handleBorrowClick = () => {
    axios
      .post("/books/borrow", { bookId: _id, userId: userContext.userInfo?._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const enableBorrow =
    !!userContext.userInfo && (!status || status === "available");

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Detail
      </Button>
      <Modal open={open} onClose={handleClose} width="400px">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book Details
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <FormControl
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
                mt: 4,
              }}
            >
              <TextField
                id="outlined-read-only-input"
                label="Title"
                defaultValue={volumeInfo?.title}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Author"
                defaultValue={volumeInfo?.authors}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                id="outlined-read-only-input"
                label="Category"
                defaultValue={volumeInfo?.categories}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Subtitle"
                defaultValue={volumeInfo?.subtitle}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Average Rating"
                defaultValue={volumeInfo?.averageRating}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Published Date"
                defaultValue={volumeInfo?.publishedDate}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                value={volumeInfo?.description}
                // onChange={handleChange}
              />

              <TextField
                id="outlined-read-only-input"
                label="Maturity Rating"
                defaultValue={volumeInfo?.maturityRating}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                id="outlined-read-only-input"
                label="availability"
                defaultValue={status}
                InputProps={{
                  readOnly: true,
                }}
              />

              <Button
                variant="contained"
                // style={{ background: "#ffa722", color: "white" }}
                onClick={handleBorrowClick}
                disabled={!enableBorrow}
              >
                {!!userContext.userInfo ? "Borrow" : "Please login to borrow"}
              </Button>

              {/* <Box>
                <CardMedia
                  component="img"
                  alt="Book Card"
                  sx={{ width: 150 }}
                  image="https://books.google.com/books/content?id=8Pr_kLFxciYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                />
              </Box> */}
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

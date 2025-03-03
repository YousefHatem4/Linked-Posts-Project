"use client";

import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function CreatePost() {
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData();
    formData.append("body", form.body.value);
    formData.append("image", form.image.files[0]);

    const response = await fetch(`https://linked-posts.routemisr.com/posts`, {
      method: "POST",
      body: formData,
      headers: {
        token: `${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    toast.success(data.message);
    router.push("/profile");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper elevation={7} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Add Your Post
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="body"
            id="body"
            label="body"
            type="text"
            variant="standard"
          />
          <TextField
            name="image"
            id="image"
            label="image"
            type="file"
            variant="standard"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            ADD
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import tiny from "../assets/images/tinymiracleslogo.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: "100%", height: "95vh", overflow: "hidden" }}
      variant="quilted"
      cols={4}
      rowHeight={98}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmdvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    title: "img1",
    rows: 3,
    cols: 2,
  },
  {
    img: "https://lh3.googleusercontent.com/b28OtTTAXDX4fzoCfg_cwpbwbEnVQlkoMYJ1RztA2lvb9jsPXvQdJ8J5TrdK7Ki5I_Bz-grXBN4DVSnBuk5yHtKW5Ie8cZaGhMqTn4rqGw",
    title: "img2",
    rows: 2,
    cols: 2,
  },

  {
    img: tiny,
    title: "img3",
    cols: 2,
    rows: 3,
  },

  {
    img: "https://lh3.googleusercontent.com/3Zaqq65Kd1PP1k5mbNp7HTakVOEyZ8PMxerGZxLuE0hbLYLrFgPVUpdsuZQbTJUU0So7xEZtO_u-6WR-mxhO41DnnS7jM2fh0Vkn7HQN",
    title: "img4",
    rows: 3,
    cols: 2,
  },

  {
    img: "https://images.unsplash.com/photo-1569140733895-eabccf089fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    title: "img5",
    rows: 3,
    cols: 2,
  },
  {
    img: "https://lh3.googleusercontent.com/NqPE3Gom5OyDRlmLFUnZhql4J2sTdX2WJVigoxQg0UN-quVDyZNltHa2wGKZCUr7V_gCub1yAVXYstWBFopq_4Vlja0aCcTrgpb_Ig",
    title: "img6",
    rows: 2,
    cols: 2,
  },
];

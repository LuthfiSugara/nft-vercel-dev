import React from "react";
import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import { homeBlogsItems } from "@app/mocks";
import settings from "./settings";
import BlogsItem from "./BlogsItem";

const BlogsItems = () => {
    return (
      <Box pos={'absolute'} width={['85vw', '85vw', '60vw']}>
        <Slider {...settings}>
          {
            homeBlogsItems.map((blog, idx) => (
              <BlogsItem blog={blog} key={`blogs_item__${blog.label}__${idx}`}></BlogsItem>
            ))
          }
        </Slider>
      </Box>
    );
}

export default BlogsItems;
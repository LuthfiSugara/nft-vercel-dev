import Blog1 from '@public/images/Home/Blogs/blog_1.png'
import Blog2 from '@public/images/Home/Blogs/blog_2.png'
import Blog3 from '@public/images/Home/Blogs/blog_3.png'

export interface HomeBlogProps {
    label: string
    icon: StaticImageData
    path?: string
}

export const homeBlogsItems: HomeBlogProps[] = [
    {
        label: 'blog_1',
        icon: Blog1,
    },
    {
        label: 'blog_2',
        icon: Blog2,
    },
    {
        label: 'blog_3',
        icon: Blog3,
    },
]
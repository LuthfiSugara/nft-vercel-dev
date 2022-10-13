// import React from 'react'

// const index = ({data}) => {
//     console.log(data)
//   return (
//     <div>index</div>
//   )
// }

// export async function getServerSideProps(context) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
//     const data = await res.json()
  
//     if (!data) {
//       return {
//         notFound: true,
//       }
//     }
  
//     return {
//       props: { data }, // will be passed to the page component as props
//     }
//   }

// export default index

import React from 'react'

const index = () => {
  return (
    <div>What are you looking for?</div>
  )
}

export default index
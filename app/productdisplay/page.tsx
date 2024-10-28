import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div>
        <div className="flex justify-center pt-10 my-10">
        <Image
          src="https://i.pinimg.com/564x/22/8a/e2/228ae2355e5e71585a2f5b3b69a2d3e6.jpg"
          alt=""
          width={300}
          height={100}
          className=" "
        />
      </div>
    </div>
  )
}

export default page
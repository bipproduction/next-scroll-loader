'use client'
import { ScrollOnly } from 'next-scroll-loader';
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(Array.from({ length: 100 }, (_, i) => i + 1))
  }, [])

  return (
    <div>
      <div>
        example
      </div>
      <div style={{
        padding: 10,
        border: "1px solid red"
      }}>
        <ScrollOnly data={data} setData={setData} moreData={async () => {
          const newData = Array.from({ length: 50 }, (_, i) => i + data.length + 1)
          await new Promise(resolve => setTimeout(resolve, 2000))
          return newData
        }} >
          {(item) => <div> {item}</div>}
        </ScrollOnly>
      </div>
    </div>
  );
}

import dbConnect from "@/app/lib/dbConnect"
import Product from "@/app/models/Product"
import MainMenuClient from "./MainMenuClient"

export default async function MainMenuServer() {
  await dbConnect()
  const categories = await Product.aggregate([
    {
      $project: {
        top_level_category: {
          $trim: {
            input: { $arrayElemAt: [{ $split: ['$Category', '>'] }, 0] }
          }
        }
      }
    },
    { $group: { _id: '$top_level_category' } }
  ])
  const categoryNames = categories.map(c => c._id)
  return (
    <MainMenuClient categories={categoryNames} />
  )
}

// src/services/likeService.ts

import { Like } from "../models"

export const likeService = {

  create: async (userId: number, courseId: number) => {
   /* criar e deletar o like  */
    const like = await Like.findOne({ where: { userId, courseId } })

    if (like) {
      await like.destroy()
      const msg= "Like deletado"
      return msg
    }
    
     await Like.create({ userId, courseId })


  const msg = "Like criado"

    return msg
  }, 

  isliked: async (userId: number, courseId: number) => {
    const like = await Like.findOne({ where: { userId, courseId } })

    if (like) {
      return true
    }

    return false
  }
}
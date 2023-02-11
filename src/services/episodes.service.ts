// src/services/episodeService.ts

import { WatchTime } from "../models"
import { WatchTimeAttributes } from "../models/WatchTime"

export const episodeService = {


  
	  getWatchTime: async (userId: number, episodeId: number) => {
        const watchTime = await WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId,
                episodeId
            }
        })

        return watchTime
    },

    setWatchTime: async ({ userId, episodeId, seconds }: WatchTimeAttributes) => {
      const watchTimeAlreadyExists = await WatchTime.findOne({
          where: {
              userId,
              episodeId
          }
      })

      if (watchTimeAlreadyExists) {
          watchTimeAlreadyExists.seconds = seconds
          await watchTimeAlreadyExists.save()

          return watchTimeAlreadyExists
      } else {
          const watchTime = await WatchTime.create({
              userId,
              episodeId,
              seconds
          })
  
          return watchTime
        }
    }
}
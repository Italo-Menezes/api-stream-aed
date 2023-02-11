import { User } from "../models";
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const courseOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!courseOnList.includes(episode.courseId)) {
      courseOnList.push(episode.courseId);
      currentList.push(episode);

      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) {
      return currentList;
    }

    const ListWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );
    ListWithoutEpisodeFromSameCourse.push(episode);

    return ListWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

export const UserService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);

    return user;
  },

  getKeepWatchList: async (id: number) => {
    const userWartchEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoURL"],
          "secondsLong",
          ["course_id", "courseId"],
        ],
        include: [
          {
            association: "Course",
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
            as: "course",
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });

    if (!userWartchEpisodes) throw new Error("User not found");

    const keepWatchList = filterLastEpisodesByCourse(
      userWartchEpisodes.Episodes!
    );

    //@ts-ignore
    keepWatchList.sort((a, b) =>a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);

    return keepWatchList;
  },

  upudate: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    const [affectedRows, upudateUsers] = await User.update(attributes, {
      where: { id } /* returning  para mysql*/,
      returning: true,
    });

    return upudateUsers[0];
  },

  upudateSenha: async (id: number, password: string) => {
    const [affectedRows, upudateUsers] = await User.update(
      { password },

      {
        where: { id },
        returning: true,
        individualHooks: true,
      }
    );

    return upudateUsers[0];
  },
};

// src/adminjs/resources.ts

import { ResourceWithOptions } from "adminjs";
import { features } from "process";
import { Category, Course, Episode, User } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResoucerFeatures, courseResourceOptions } from "./course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Course,
    options: courseResourceOptions,
    features: courseResoucerFeatures,
  },
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
];

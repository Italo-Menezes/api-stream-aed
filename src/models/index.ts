import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { WatchTime } from "./WatchTime";

Category.hasMany(Course, { as: "courses" });
Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite });

Course.belongsToMany(User, { through: Like });
Course.hasMany(Favorite, { as: "favoritesUsers", foreignKey: "course_id" });
Course.hasMany(Episode, { as: "episodes" }); //Episodes

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "favoritesCourses", foreignKey: "user_id" });
User.belongsToMany(Course, { through: Like });

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

Episode.belongsTo(Course);
Episode.belongsToMany(User, { through: WatchTime });

User.belongsToMany(Course, { through: Like });
User.belongsToMany(Episode, { through: WatchTime });
User.hasMany(Favorite, { as: "favorites_courses", foreignKey: "user_id" });


export { Category, Course, Episode, Favorite, Like, User, WatchTime };

import { Model, Optional } from 'sequelize';
export interface Course {
    id: number;
    name: string;
    synopsis: string;
    thumbnailUrl: string;
    featured: boolean;
    categoryId: number;
}
export interface CourseCreationAttributes extends Optional<Course, 'id' | 'thumbnailUrl' | 'featured'> {
}
export interface CourseInstance extends Model<Course, CourseCreationAttributes>, Course {
}
export declare const Course: import("sequelize").ModelCtor<CourseInstance>;

import { Model, Optional } from 'sequelize';
export interface Category {
    id: number;
    name: string;
    position: number;
}
export interface CategoryCreationAttributes extends Optional<Category, 'id'> {
}
export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category {
}
export declare const Category: import("sequelize").ModelCtor<CategoryInstance>;

export declare const favoriteService: {
    create: (userId: number, courseId: number) => Promise<import("../models/Favorite").FavoriteInstance | "Deletado com sucesso">;
    findByUserId: (userId: number) => Promise<{
        userId: number;
        courses: (import("../models/Course").CourseInstance | undefined)[];
    }>;
    delete: (userId: number, courseId: number) => Promise<"Deletado com sucesso" | "esse id não está favoritado">;
    isFavorite: (userId: number, courseId: number) => Promise<boolean>;
};

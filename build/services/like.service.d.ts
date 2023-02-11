export declare const likeService: {
    create: (userId: number, courseId: number) => Promise<"Like deletado" | "Like criado">;
    isliked: (userId: number, courseId: number) => Promise<boolean>;
};

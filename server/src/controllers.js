import db from "./db/connection.js";
import Boom from '@hapi/boom';

export default {
    async registerUser(req, h) {
        const { payload } = req;
        const { email } = req.payload;
        const user = await db.user.findOne({ email: email });

        if(!user) {
            try {
                payload.login = payload.email;
                const newUser = db.user.create(payload);
                return newUser;
            } catch (e) {
                return Boom.badRequest("Ошибка регистрации нового пользователя.");
            }
        }

        return Boom.badRequest("Этот e-mail уже используется.");
    },
    async loginUser(req, h) {
        const { login, password } = req.payload;
        const resFields = "userId token name isAdmin";

        try {
            let user = await db.user.findOne({ login: login, password: password }, resFields);

            if(!user) {
                user = await db.user.findOne({email: login, password: password}, resFields);
            }

            if(user===null) {
                return Boom.badRequest("Неверный логин и/или пароль!");
            }

            return user;
        } catch (e) {
            return Boom.badRequest("Ошибка авторизации пользователя.");
        }

        return Boom.badRequest("Неверный логин и/или пароль!");
    },
    async getUserInfo(req, h) {
        const { userId } = req.params;
        const { credentials } = req.auth;
        const resFields = "name birthDate login email city about userId isAdmin token";

        try {
            let res;
            if(!credentials.user.isAdmin) {
                res = await db.user.findOne( {userId: userId}, resFields );
            }else{
                res = await db.user.findOne( {userId: credentials.user.userId}, resFields );
            }

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки информации о пользователе.");
        }
    },
    async getUsers(req, h) {
        const { userId } = req.params;
        const resFields = "name birthDate login email city about userId";

        try {
            let user;
            if(userId) {
                user = await db.user.findOne({userId: userId}, resFields);
            } else {
                user = await db.user.find({}, resFields);
            }

            return user;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки информации о пользователях.");
        }
    },
    async getUserArticles(req, h){
        const { userId } = req.params;

        try {
            let articles;
            articles = await db.article.find({userId: userId});

            return articles;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки статей пользователя.");
        }
    },
    async getLastUser(req, h) {
        try {
            const resFields = "name birthDate email city about userId";
            let res = await db.user.find({}, resFields).sort({createdAt: -1}).limit(3);
            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки информации о пользователях.");
        }
    },
    async changeUser(req, h) {
        const { userId } = req.params;
        const { credentials } = req.auth;

        try {
            let res;
            if(credentials.user.isAdmin && userId){
                res = await db.user.update( { userId: userId }, {'$set': {...req.payload}} );
            }else{
                res = await db.user.update( { userId: credentials.user.userId }, {'$set': {...req.payload}} );
            }

            res.userId = userId;

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка изменения аккаунта.");
        }
    },
    async deleteUser(req, h){
        const { userId } = req.params;
        const { credentials } = req.auth;

        try {
            let res;
            if(credentials.user.isAdmin) {
                res = await db.user.deleteOne({ userId: userId });
            }else{
                if(credentials.user.userId!==userId){
                    return Boom.forbidden("Нет прав на удаление чужого аккаунта.");
                }

                res = await db.user.deleteOne({ userId: credentials.user.userId });
            }

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка удаления аккаунта.");
        }
    },
    async addArticle(req, h) {
        const { payload } = req;

        try {
            const newArticle = db.article.create(payload);
            return newArticle;
        } catch (e) {
            return Boom.badRequest("Ошибка добавления статьи.");
        }
    },
    async changeArticle(req, h) {
        const { articleId } = req.params;
        const { credentials } = req.auth;
        const newData = {
            text: req.payload.text,
            title: req.payload.title,
        };

        try {
            let res;
            if(credentials.user.isAdmin){
                res = await db.article.update( { articleId: articleId }, {'$set': newData } );
            }else{
                res = await db.article.update( { userId: credentials.user.userId, articleId: articleId }, {'$set': newData } );
            }

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка изменения статьи.");
        }
    },
    async getArticle(req, h) {
        const { articleId } = req.params;

        try {
            let res;
            if(articleId) {
                res = await db.article.findOne({articleId: articleId});
            } else {
                res = await db.article.find();
            }

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки статей.");
        }
    },
    async getArticleWithFilter(req, h) {
        const { last, popular } = req.query;

        try {
            let res;
            if(last === "true") {
                res = await db.article.find({}).sort({createdAt: -1}).limit(3);
            } else if(popular === "true") {
                res = await db.article.find({}).sort({likes: -1}).limit(3);
            }

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки статей.");
        }
    },
    async deleteArticle(req, h){
        const { articleId } = req.params;
        const { credentials } = req.auth;

        try {
            let res;
            if(credentials.user.isAdmin) {
                res = await db.article.deleteOne({ articleId: articleId });
            }else{
                const curArticle = await db.article.findOne({ articleId: articleId }, "userId");
                if(credentials.user.userId!==curArticle.userId){
                    return Boom.forbidden("Нет прав на удаление чужой статьи.");
                }
                res = await db.article.deleteOne({ userId: credentials.user.userId, articleId: articleId });
            }

            return res;

        }catch (e) {
            return Boom.badRequest("Ошибка удаления статьи.");
        }
    },
    async changeArticleLikes(req, h) {
        const { articleId } = req.params;
        const { credentials } = req.auth;

        try {
            let res;
            let article = await db.article.findOne({articleId: articleId});

            if(article){
                let newData;
                const likeExist = article.userLikes.find( item => item === credentials.user.userId);

                if(!likeExist){
                    article.userLikes.push(credentials.user.userId);
                } else {
                    const userIndex = article.userLikes.findIndex(item => item === credentials.user.userId);
                    article.userLikes.splice(userIndex, 1);
                }

                newData = {
                    userLikes: article.userLikes,
                }

                res = await db.article.update( { articleId: articleId }, {'$set': newData } );
            }

            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка добавления лайка.");
        }
    },
    async getComments(req, h) {
        const { articleId } = req.params;

        try {
            let res = await db.comment.find({articleId: articleId});
            return res;
        }catch (e) {
            return Boom.badRequest("Ошибка загрузки комментариев.");
        }
    },
    async addComment(req, h){
        const { payload } = req;
        const { credentials } = req.auth;

        try {
            payload.userId = credentials.user.userId;
            payload.userName = credentials.user.name;
            const res = db.comment.create(payload);
            return res;
        } catch (e) {
            return Boom.badRequest("Ошибка добавления комментария.");
        }
    },
    async deleteComment(req, h){
        const { commentId } = req.params;
        const { credentials } = req.auth;

        try {
            let res;
            if(credentials.user.isAdmin) {
                res = await db.comment.deleteOne({ commentId: commentId });
            }else{
                const curComment = await db.comment.findOne({ articleId: articleId }, "userId");
                if(credentials.user.userId!==curComment.userId){
                    return Boom.forbidden("Нет прав на удаление чужого комментария.");
                }
                res = await db.article.deleteOne({ userId: credentials.user.userId, commentId: commentId });
            }

            return res;

        }catch (e) {
            return Boom.badRequest("Ошибка удаления комментария.");
        }
    },
}
import controllers from "./controllers.js";
import Joi from '@hapi/joi';


export default [
    {
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: {
                path: './public',
                redirectToSlash: true,
                index: true,
            },
        },
    },
    {
        method: 'POST',
        path: '/user/register',
        handler: controllers.registerUser,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Имя обязательно для заполнения!";
                            });
                            return errors;
                        }),
                    birthDate: Joi.date().min('1-1-1920').max('now')
                        .error(errors => {console.log(errors);
                            errors.forEach(err => {
                                switch (err.code) {
                                    case "any.required":
                                        err.message = "Дата рождения обязательна для заполнения!";
                                        break;
                                    default:
                                        err.message = "Некорректная дата рождения!";
                                        break;
                                }
                            });
                            return errors;
                        }),
                    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } })
                        .required()
                        .error(errors => {
                            errors.forEach(err => {
                                if(err.code === "string.empty"){
                                    err.message = "E-mail обязателен для заполнения!";
                                }else{
                                    err.message = "Вы ввели некорректный E-mail!";
                                }
                            });
                            return errors;
                        }),
                    password : Joi.string().min(6).max(20).required()
                        .error(errors => {
                            errors.forEach(err => {
                                switch (err.code) {
                                    case "any.required":
                                        err.message = "Пароль обязателен для заполнения!";
                                        break;
                                    case "string.min":
                                        err.message = `Минимальная длина пароля - 6 символов!`;
                                        break;
                                    case "string.max":
                                        err.message = `Максимальная длина пароля - 20 символов!`;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            return errors;
                        }),
                    repeatPassword : Joi.any().valid(Joi.ref('..password')).required().error(errors => {
                        errors.forEach(err => {
                            err.message = "Поле должно совпадать со значением поля Пароль!";
                        });
                        return errors;
                    }),
                }).required()
            }
        }
    },
    {
        method: 'POST',
        path: '/user/login',
        handler: controllers.loginUser,
        options: {
            validate: {
                payload: Joi.object({
                    login: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Логин обязателен для заполнения!";
                            });
                            return errors;
                        }),
                    password: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Пароль обязателен для заполнения!";
                            });
                            return errors;
                        }),
                }).required()
            }
        }
    },
    {
        method: 'GET',
        path: '/user/info/{userId*}',
        handler: controllers.getUserInfo,
        options: {
            validate: {
                params: Joi.object({
                    userId: Joi.string().optional(),
                }).optional(),
            },
            auth: {
                strategies:  [ "admin", "user" ],
            },
        },
    },
    {
        method: 'GET',
        path: '/user/{userId*}',
        handler: controllers.getUsers,
    },
    {
        method: 'GET',
        path: '/articles/user/{userId*}',
        handler: controllers.getUserArticles,
        options: {
            validate: {
                params: Joi.object({
                    userId: Joi.string().required(),
                }).required(),
            },
        }
    },
    {
        method: 'GET',
        path: '/user/last',
        handler: controllers.getLastUser,
    },
    {
        method: 'PUT',
        path: '/user/change/{userId*}',
        handler: controllers.changeUser,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().optional()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Имя обязательно для заполнения!";
                            });
                            return errors;
                        }),
                    login: Joi.string().optional()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Логин обязателен для заполнения!";
                            });
                            return errors;
                        }),
                    birthDate: Joi.date().min('1-1-1920').max('now')
                        .error(errors => {
                            errors.forEach(err => {
                                switch (err.code) {
                                    case "any.required":
                                        err.message = "Дата рождения обязательна для заполнения!";
                                        break;
                                    default:
                                        err.message = "Некорректная дата рождения!";
                                        break;
                                }
                            });
                            return errors;
                        }),
                    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } })
                        .optional()
                        .error(errors => {
                            errors.forEach(err => {
                                if(err.code === "string.empty"){
                                    err.message = "E-mail обязателен для заполнения!";
                                }else{
                                    err.message = "Вы ввели некорректный E-mail!";
                                }
                            });
                            return errors;
                        }),
                    password : Joi.string().min(6).max(20).optional().allow("")
                        .error(errors => {
                            errors.forEach(err => {
                                switch (err.code) {
                                    case "any.required":
                                        err.message = "Пароль обязателен для заполнения!";
                                        break;
                                    case "string.min":
                                        err.message = `Минимальная длина пароля - 6 символов!`;
                                        break;
                                    case "string.max":
                                        err.message = `Максимальная длина пароля - 20 символов!`;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            return errors;
                        }),
                    city: Joi.string().optional().allow(""),
                    about: Joi.string().optional().allow(""),
                }).optional()
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/delete/{userId*}',
        handler: controllers.deleteUser,
        options: {
            validate: {
                params: Joi.object({
                    userId: Joi.string().required(),
                }).required(),
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
    {
        method: 'POST',
        path: '/article/add',
        handler: controllers.addArticle,
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Заполните поле Заголовок!";
                            });
                            return errors;
                        }),
                    text: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Заполните поле Текст!";
                            });
                            return errors;
                        }),
                    userId: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Невозможно добавить статью! Пользователь не определен!";
                            });
                            return errors;
                        }),
                }).required()
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
    {
        method: 'PUT',
        path: '/article/change/{articleId*}',
        handler: controllers.changeArticle,
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Заполните поле Заголовок!";
                            });
                            return errors;
                        }),
                    text: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Заполните поле Текст!";
                            });
                            return errors;
                        }),
                    userId: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Нет прав на редактирование статей!";
                            });
                            return errors;
                        }),
                }).required(),
                params: Joi.object({
                    articleId: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Статья не найдена!";
                            });
                            return errors;
                        }),
                }).required()
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
    {
        method: 'GET',
        path: '/article/{articleId*}',
        handler: controllers.getArticle,
        options: {
            validate: {
                params: Joi.object({
                    articleId: Joi.string().optional(),
                }).optional(),
            },
        },
    },
    {
        method: 'GET',
        path: '/articles',
        handler: controllers.getArticleWithFilter,
    },
    {
        method: 'DELETE',
        path: '/article/delete/{articleId*}',
        handler: controllers.deleteArticle,
        options: {
            validate: {
                params: Joi.object({
                    articleId: Joi.string().required(),
                }).required(),
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
    {
        method: 'PUT',
        path: '/article/like/{articleId*}',
        handler: controllers.changeArticleLikes,
        options: {
            validate: {
                params: Joi.object({
                    articleId: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Статья не найдена!";
                            });
                            return errors;
                        }),
                }).required()
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
    {
        method: 'GET',
        path: '/comments/{articleId*}',
        handler: controllers.getComments,
        options: {
            validate: {
                params: Joi.object({
                    articleId: Joi.string().required(),
                }).required(),
            },
        },
    },
    {
        method: 'POST',
        path: '/comment/add',
        handler: controllers.addComment,
        options: {
            validate: {
                payload: Joi.object({
                    articleId: Joi.string().required()
                        .error(errors => {
                            errors.forEach(err => {
                                err.message = "Статья не найдена!";
                            });
                            return errors;
                        }),
                    text: Joi.string().required(),
                }).required(),
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        },
    },
    {
        method: 'DELETE',
        path: '/comment/delete/{commentId*}',
        handler: controllers.deleteComment,
        options: {
            validate: {
                params: Joi.object({
                    commentId: Joi.string().required(),
                }).required(),
            },
            auth: {
                strategies:  [ "admin", "user" ],
            }
        }
    },
];
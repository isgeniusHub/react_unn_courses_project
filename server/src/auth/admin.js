import db from "../db/connection.js";

export default function(server){
    server.auth.strategy('admin', 'bearer-access-token', {
        allowChaining: true,
        validate: async (request, token, h) => {
            const user = await db.user.findOne({ token });
            if(user && user.isAdmin){
                return {
                    isValid: true,
                    credentials: {user},
                    artifacts: {},
                }
            }

            return {
                isValid: false,
                credentials: {},
                artifacts: {},
            }
        }
    });
}

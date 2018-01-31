/**
 * Created by Andy on 8/29/2017.
 */

import loggedIn from "./logged-in";
import hasPermission from "./has-permission";
import userExists from "./user-exists";
import userNameExists from "./user-name-exists";
import userActive from "./user-active";
import userNameActive from "./user-name-active";
import userUnlocked from "./user-unlocked";
import userNameUnlocked from "./user-name-unlocked";
import validLogin from "./valid-login";
import passwordCorrect from "./passwordCorrect";

export default {
    loggedIn, hasPermission,
    userExists, userNameExists,
    userActive, userNameActive,
    userUnlocked, userNameUnlocked,
    validLogin, passwordCorrect
};

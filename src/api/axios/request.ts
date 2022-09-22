import mainInstance from "./init/main-instance";
import auth from "./modules/auth";
import profile from "./modules/profile";
import organization from "./modules/admin/organization";

export default {
    auth: auth(mainInstance),
    profile: profile(mainInstance),
    organization: organization(mainInstance)
}


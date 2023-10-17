import User  from "components/user/user.model";

class AdminController{

    async adduser(req,res,next){
        try{
            const userobject = req.body;
            
            const user = await User.create(userobject);

            return res.status(200).send({data:user})
        }
        catch(err){
            return next(err);
        }
    }

}
export default AdminController;
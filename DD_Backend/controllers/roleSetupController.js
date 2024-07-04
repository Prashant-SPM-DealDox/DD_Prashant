const md5 = require("md5");
const db = require('../models');
const Roles = db.rolesSetup;


const addRoles = async (req, res) => {
    const user_id = req.user.user_id;
    var d = Date();
    var a = d.toString();
    const roles_key = md5(a + ""+ req.body.role_name);
    const {role_name, role_catalog_category, role_catalog_status, role_type, role_group, role_practice, parent_role, role_external_ref, role_prohibit_discount, role_category_1, role_category_2, role_category_3, role_category_4, role_category_5, role_category_6} = req.body;

    try{
        const roles_data = await Roles.create({user_id, roles_key, role_name, role_catalog_category, role_catalog_status, role_type, role_group, role_practice, parent_role, role_external_ref, role_prohibit_discount, role_category_1, role_category_2, role_category_3, role_category_4, role_category_5, role_category_6});
        console.log("roleData: "+ roles_data)
        if(roles_data){
            res.status(200).json({success:"Success"})
        }else{
            res.status(200).json({error: "Failed111"})
        }
    } catch (error) {
        console.log("ERROR:", error);
        res.status(200).json({error: "Failed"})
    }
}


const getRoles = async (req, res) => {
    const user_id = req.user.user_id;

    try{
        const rolesdata = await Roles.findAll({where: {user_id: user_id}});

        if(!rolesdata) {
            res.status(200).json({status: "Failed", message: "Roles Data Not Found"})
        }else{
            res.status(200).json({ data: rolesdata });
        }
    } catch(error){
        res.status(200).json({ error: "Failed"});
    }
};

const updateRoles = async (req, res) => {
    const user_id = req.user.user_id;
    const roles_id = req.params.id;
    console.log(roles_id + "ROLES_ID");

    const {role_name, role_catalog_category, role_catalog_status, role_type, role_group, role_practice, parent_role, role_external_ref, role_prohibit_discount, role_category_1, role_category_2, role_category_3, role_category_4, role_category_5, role_category_6} = req.body;

    try {
        const updateRoles = await Roles.update(
            {role_name, role_catalog_category, role_catalog_status, role_type, role_group, role_practice, parent_role, role_external_ref, role_prohibit_discount, role_category_1, role_category_2, role_category_3, role_category_4, role_category_5, role_category_6},
            {
                where: {
                    roles_id: roles_id,
                    user_id: user_id,
                },
            }
        );

        if(updateRoles[0] === 1){
            res.status(200).json({status: "Success", message: "Roles Updated"});
        }else{
            res.status(404).json({ status: "Error", message: "Roles Not Found" });
        }
    }catch (error) {
        console.error("Error updating Roles:", error);
        res.status(500).json({ error: "Failed to Update Roles" });
      }
};

const deleteRoles = async (req, res) => {
    const user_id = req.user.user_id;
    const roles_id = req.params.id;
    console.log('Delete Role: '+ roles_id);

    try {
        const deleteRoles = await Roles.destroy({
            where: {
                roles_id: roles_id,
                user_id: user_id,
            },
        });

        if(deleteRoles === 1){
            res.status(200).json({ status: "Success", message: "Roles Deleted!"});
        } else {
            res.status(404).json({status: "Error", message: "Roles NOt Found"});
        }
    } catch (error) {
        console.error("Error While Deleting The Roles: ", error);
        res.status(500).json({error: "Failed To Delete The Roles!"});
    }
};

module.exports = {addRoles, getRoles, updateRoles, deleteRoles}
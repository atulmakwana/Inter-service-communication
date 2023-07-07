const permissions = {
    //session's apis
    'GET:/session':'session.get',
    'POST:/employee/login':'session.create',
    'DELETE:/employee/logout/:id':'session.delete',
    'POST:/session/filter':'session.filter',
    'POST:/session/order':'session.order',
    'POST:/session/search':'session.search',
        

    //role's apis
    'GET:/role':'role.get',
    'POST:/role':'role.post',
    'POST:/role/assign':'roleAssign.post',
    'PUT:/role':'role.put',
    'PATCH:/role':'role.patch',
    'DELETE/role/:id':'role.delete'
        
    
    //     get_All:'get:/employee',
    //     get_Single:'get:/employee/:id',
    //     get_For_Company:'get:/employee/company/:id',
    //     verify:'get:/employee/verify/:id',
    //     create:'post:/employee',
    //     update:'put:/employee/:id',
    //     delete:'delete:/employee/:id',
    //     delete_For_Company:'delete:/employee/company/:id'

};

module.exports = permissions;
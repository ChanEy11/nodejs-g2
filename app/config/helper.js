const isEmpty = (value) =>{
    if(value == null || value == undefined || value == ""){
        return true
    }
    return false;
}

const config = {
    local_token : "sjdjwieounjwdnsjknduiwheudwej" 
}

module.exports = {
    isEmpty,
    config
}
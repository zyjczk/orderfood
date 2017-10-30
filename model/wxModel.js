var user = {
    select:'select * from employee where code=?',
    insert:'replace into employee(code,name) values(?,?)'
};
module.exports = user;
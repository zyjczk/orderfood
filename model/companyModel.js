module.exports = {
    select:'select * from company',
    selectOne:'select * from company where id=?',
    add:'insert into company(name,code) values(?,?)',
    edit:'update company set name=?,code=? where id=?',
    del:'delete from company where id=?'
};
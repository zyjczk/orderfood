module.exports = {
    // select:'select * from food',
    query: 'select * from food where companyId=?',
    selectOne:'select * from food where id=?',
    add:'insert into food(name,companyId,code) values(?,?,?)',
    edit:'update food set name=?,code=? where id=?',
    del:'delete from food where id=?',
    orderdetail:'select d.name as departmentName, e.name as employeeName, o.foodId, o.drinkId, o.weekDay' +
    ' FROM orderfood as o INNER JOIN department as d ON d.id = o.departId ' +
    'INNER JOIN employee as e ON e.id = o.employeeId ' +
    'WHERE o.weekDay=?',
    queryAll: 'select * from food',
    queryOne : 'select * from food where code=?'
};
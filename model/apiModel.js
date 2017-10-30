module.exports = {
    department:'select * from department',
    selectOne:'select * from employee where name=? and departId=?',
    selectbyId:'select * from orderfood where employeeId=?',
    selectCompany:'select * from company',
    selectFood:'select * from food where companyId=?',
    addorder:'replace into orderfood(employeeId,departId,departname,companyId,foodId,weekDay) values(?,?,?,?,?,?)',
    updatefood:'update myfood set foodList = ?,ordertime=? where employeeId = ?',
    insetfood:'replace into myfood (employeeId,foodList,ordertime) values (?,?,?)',
    myfood:'select * from myfood where employeeId=?',
    deletefood:'delete from orderfood',
    delMyFood:'delete from orderfood where employeeId=?',
    selectEmployee:'select * from employee',
    selectMyfood:'select employeeId from orderfood'
    // myfood:'select o.drinkId as soup,o.lastModTime as ordertime,o.weekDay as week,f.name as foodname from orderfood as o left join food as f on o.foodId = f.id where o.employeeId=?'
};

module.exports = {
  department: "select * from department",
  selectOne: "select * from employee where name=? and departId=?",
  selectbyId: "select * from orderfood where employeeId=? and orderType=?",
  selectCompany: "select * from company",
  selectFood: "select * from food where companyId=?",
  addorder:
    "replace into orderfood(`employeeId`,`departId`,`departname`,`companyId`,`foodId`,`weekDay`,`orderType`) values ?",
  updatefood:
    "update myfood set foodList = ?,ordertime=? where employeeId = ? and orderType=?",
  insetfood:
    "replace into myfood (employeeId,foodList,ordertime,orderType) values (?,?,?,?)",
  myfood:
    "select a.*,b.departname from myfood as a,orderfood as b where a.employeeId=b.employeeId and a.employeeId=? and a.orderType=?",
  deletefood: "delete from orderfood",
  delMyFood: "delete from orderfood where employeeId=?",
  selectEmployee: "select * from employee",
  selectMyfood: "select employeeId from orderfood",
  selectRemark: "select text from remarks",
  saveRemark: "update remarks set text=? where id=0",
  queryRemark: "select text from remarks",
    keepHistoryFood:"replace into historyfood(employeeId,foodList,ordertime,orderType) values (?,?,?,?)",
    findHistoryFood: "select * from historyfood where employeeId=? and orderType=? order by id desc limit 1"
  // myfood:'select o.drinkId as soup,o.lastModTime as ordertime,o.weekDay as week,f.name as foodname from orderfood as o left join food as f on o.foodId = f.id where o.employeeId=?'
};

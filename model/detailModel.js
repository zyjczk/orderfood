module.exports = {
  querybycom:
    "select departId,departname, count(foodId) as sumfood, foodId from orderfood where companyId=? and weekDay=? and orderType=? group by departId, foodId",
  queryAll:
    "select departId,departname, count(companyId) as companysum, companyId from orderfood where weekDay=? and orderType=? group by departId, companyId",
  queryByDepartment:
    "select o.departname,o.employeeId,o.foodId,o.weekDay,o.orderType,e.name as employeeName,f.name from orderfood as o Left Join employee as e on o.employeeId=e.code Left Join food as f on f.code=o.foodId where o.departId=? Order By e.name"
};

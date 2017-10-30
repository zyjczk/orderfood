module.exports = {
    querybycom:'select departId,departname, count(foodId) as sumfood, foodId from orderfood where companyId=? and weekDay=? group by departId, foodId',
    queryAll:'select departId,departname, count(companyId) as companysum, companyId from orderfood where weekDay=? group by departId, companyId',
    queryByDepartment:'select * from orderfood as o inner join employee as e on o.employeeId = e.code where o.departId=?'
};
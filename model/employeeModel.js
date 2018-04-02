module.exports = {
    // select:'select e.id as id,e.name as name,d.name as departname   from employee as e,department as d where e.departId=d.id',
    // selectOne:'select * from employee where id=?',
    // add:'insert into employee(name,departId,isWorker) values(?,?,?)',
    // edit:'update employee set name=?,departId=?,isWorker=? where id=?',
    del: 'delete from employee where code=?',
    query: 'select * from employee where name=?',
    queryById: 'select * from employee where code=?',
    changeDer: 'update employee set departmentId=? where code=?'
};
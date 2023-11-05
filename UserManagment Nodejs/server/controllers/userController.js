const mysql = require('mysql');

//connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// view Users
exports.view = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                res.render('home', {
                    rows
                });
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });
    });
}
// Find User by Search
exports.find=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM users WHERE status = "active" AND (first_name LIKE ? OR last_name LIKE ?)',['%'+ searchTerm + '%','%'+ searchTerm + '%'], (err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                res.render('home', {
                    rows
                });
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });
    });
}
// show form user
exports.form=(req,res)=>{
    res.render('add-user');
}

//create new user
exports.create=(req,res)=>{
    const{first_name,last_name,email,phone,comments} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('INSERT INTO users SET first_name=?,last_name=?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments],(err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                res.render('add-user', {
                    alert: "User added successfully"
                });
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });


    });
}

// edit user
exports.edit=(req,res)=>{

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                res.render('edit-user', {
                    rows
                });
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });
    });
}



// edit user
exports.update=(req,res)=>{
    const{first_name,last_name,email,phone,comments} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        connection.query('UPDATE users SET first_name=?,last_name=?,email=?,phone=?,comments=? WHERE id=?',[first_name,last_name,email,phone,comments,req.params.id], (err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('connected as ID ' + connection.threadId);
            
                    connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
                        // when done with the connection , release it 
                        connection.release();
                        if (!err) {
                            res.render('edit-user', {
                                rows,alert: "User update successfully"
                            });
                        } else {
                            console.log(err)
                        }
            
                        console.log('the data from user table : \n', rows);
                    });
                });
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });
    });
}

//delete user
exports.delete=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        connection.query('DELETE  FROM users WHERE id = ?',[req.params.id], (err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });
    });
}

//view user
exports.viewUser = (req, res) => {
    //connect to db
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID ' + connection.threadId);

        connection.query('SELECT * FROM users WHERE id = ?',[req.params.id] ,(err, rows) => {
            // when done with the connection , release it 
            connection.release();
            if (!err) {
                res.render('view-user', {
                    rows
                });
            } else {
                console.log(err)
            }

            console.log('the data from user table : \n', rows);
        });
    });
}
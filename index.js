const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 3000

app.use(express.json())

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "myform"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/search', (req, res) => {
    let fils = [`name`, `sername`, `gender`, `birthday`, `edu`, `home`];
    let keyword = req.query.keyword
    let sql = 'SELECT * FROM forms WHERE '
    for (let i = 0; i < fils.length; i++) {
        sql += `${fils[i]} LIKE '%${keyword}%'`
        if (i < fils.length - 1) {
            sql += ' OR '
        }
    }
    con.query(sql, [], function (err, result) {
        if (err) {
            res.status(500).send(err)
        } else if (result.length <= 0) {
            res.status(404).end()
        } else {
            res.send(result)
        }
    })
})

app.get('/User', (req, res) => {
    let sql = 'SELECT * FROM forms'
    con.query(sql, [], function (err, result) {
        if (err) {
            res.status(500).send(err)
        } else if (result.length <= 0) {
            res.status(404).end()
        } else {
            res.send(result)
        }
    })
})

app.get('/User/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        res.status(400).end()
    } else {
        let sql = "SELECT * FROM forms WHERE id = ?"
        let values = [id]
        con.query(sql, values, function (err, result) {
            if (err) {
                res.status(500).send(err)
            } else if (values.length <= 0) {
                res.status(404).end()
            } else {
                res.send(result)
            }
        })
    }
})

app.post('/AddUser', (req, res) => {
    let fils = [`name`, `sername`, `gender`, `birthday`, `edu`, `home`, 'img'];
    let sqlfil = `(${fils.join(',')})`
    let values = []
    for (let i = 0; i < fils.length; i++) {
        values.push(req.body[fils[i]])
    }
    let sql = `INSERT INTO forms ${sqlfil} VALUES (?)`
    con.query(sql, [values], function (err, result) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.end()
        }
    })
})

app.patch('/EditUser', (req, res) => {
    let fils = [`name`, `sername`, `gender`, `birthday`, `edu`, `home`, 'img'];
    let values = []
    for (let i = 0; i < fils.length; i++) {
        values.push(req.body[fils[i]])
    }
    values.push(req.body.id)
    let sql = `UPDATE forms SET ${fils.join('=?,')}=? WHERE id=?`
    con.query(sql, values, function (err, result) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.end()
        }
    })
})

app.delete('/User/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        res.status(400).end()
    } else {
        let sql = "DELETE FROM forms WHERE id=?"
        let values = [id]
        con.query(sql, values, function (err, result) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.end()
            }
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
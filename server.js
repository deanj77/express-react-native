const express = require('express')
const app = express()

const sqlite3 = require('sqlite3')
const sqlite = sqlite3.verbose()
// const sqlite3 = require('sqlite3').verbose()
const db = new sqlite.Database('./test.db',(err)=>{
  if(err){
    return console.error(err.message)
  }
  console.log('db conected')
})
let rowid=[]

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT,name, age)')
  // const stmt = db.prepare('INSERT INTO lorem VALUES (?)')  
  // for (let i = 0; i <= 20 ; i++) {
  //   stmt.run(i)
  // }
  // stmt.finalize()

  // db.run('INSERT INTO lorem(info,name,age) VALUES(?,?,?)',['hi','mehdi',29],(err)=>{
  //   if(err){
  //     console.error(err.message)
  //   }
  //   console.log('item insert')
  // })

  const sql = 'SELECT rowid AS id, info,name,age FROM lorem';
  db.each(sql, (err, row) => {
    console.log(row.name)
    rowid.push(row.name)
  })

})

db.close()

app.get('/',(req, res)=>{
    (res.send(rowid.join(', ')))
})

app.listen(8000,()=>{
    console.log('its ran on port 8000')
})
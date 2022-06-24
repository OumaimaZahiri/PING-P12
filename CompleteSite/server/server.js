const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const fs = require('fs')
const PORT = 8080;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const secret = "application-secret-key";

const {encrypt, decrypt} = require('./encryptionHandler');
app.use(cors());
app.use(express.json());

// Configuration of the database's schema
const config = {    //Parameters to connect to database. To change with the real parameters.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contour_evaluation'
  };
  
  var connection = null;
  app.use(express.static(path.join(__dirname,'public')));

  async function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.connect(function(error) {              // The server is either down
            if(error) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', error);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
                if (error instanceof Error) {
                    if (error.code === "PROTOCOL_CONNECTION_LOST") {
                        console.error(error.stack);
                        console.log("Lost connection. Reconnecting...");
                        initializeConnection(connection.config);
                    } else if (error.fatal) {
                        throw error;
                    }
                }
            }                                     // to avoid a hot loop, and to allow our node script to
          });
    }
  
    connection = await mysql.createConnection(config);
  
    // Add handlers.
    addDisconnectHandler(connection);
  
    connection.connect();
    return connection;
  }
  
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  var path1 = "";
  var id1 = "";
  var id2 = "";
  var path2 = "";
  var files1 = "";
  var files2 = "";
  let imgStr2 = "";
  
  app.post('/request',urlencodedParser, async (req,res)=>{
    const connection2 = await initializeConnection(config);
    let [rows,fields] = await connection2.execute('SELECT organ.name, contour.id_contour, contour.folder_path FROM organ INNER JOIN contour ON organ.id_organ = contour.id_organ WHERE organ.name = ? order by rand()',[req.body.outline])
    path1 = rows[0].folder_path;
    id1 = rows[0].id_contour;
    path1 = path1 + "/classic"
    if(req.body.two){
        path2 = rows[1].folder_path + "/classic"
        id2 = rows[1].id_contour;
    }
    connection2.end();
    console.log("path 2 : " + path2)
    console.log("path 1 : " + path1)
    files1 = fs.readdirSync(path1)
    let imgStr1 =  fs.readFileSync(path.join(path1,files1[0]),"base64");

    if(req.body.two){
        files2 = fs.readdirSync(path2)  
        imgStr2 =  fs.readFileSync(path.join(path2,files2[0]),"base64");
    }  

    res.send(imgStr1 + "end1" + imgStr2);
  });
  
  app.post('/unknown_frame',urlencodedParser,(req,res)=>{
    var nb = req.body.number;
    let imgStr2 = ""
    var isTrueSet = (req.body.two === 'true');
    if(nb < Math.max(files1.length,files2.length)){
        if(isTrueSet){
            imgStr2 =  fs.readFileSync(path.join(path2,files2[nb]),"base64");
        }
        let imgStr =  fs.readFileSync(path.join(path1,files1[nb]),"base64");
        res.send(imgStr + "end1" + imgStr2)
    }else{res.send("Out of bounds")}
    });
    
  app.post('/graded',urlencodedParser,async (req,res)=>{
    let mark = req.body.value;
    let isTrueSet = (req.body.two === 'true');
    let username = req.body.username;

    console.log("grade = " + mark);
    let connection3 = ""
    let result = ""
    let result2 = ""
    let result3 = ""
    let result4 = ""
    let IA_name = ""
    let IA_name2 = ""
    let user = ""
    try{
        connection3 = await initializeConnection(config);
        [user] = await connection3.execute('SELECT id_user FROM users WHERE users.username = ?',[username])
        if(!isTrueSet){
            await connection3.execute('INSERT INTO grade (value, id_user, id_contour) VALUES (?,?,?)', [mark,user[0].id_user,id1]);
            console.log(user[0].id_user)
        }else{
            if(mark == 'L'){
                await connection3.execute('UPDATE contour SET bonus = (bonus+1) WHERE id_contour = ?', [id1]);
                await connection3.execute('UPDATE contour SET malus = (malus+1) WHERE id_contour = ?', [id2]);
            }else if(mark == 'R'){
                await connection3.execute('UPDATE contour SET bonus = (bonus+1) WHERE id_contour = ?', [id2]);
                await connection3.execute('UPDATE contour SET malus = (malus+1) WHERE id_contour = ?', [id1]);
            }else{
                console.log("error : received value was not expected")
            }
            [result] = await connection3.execute('SELECT manufacturer_name, bonus, malus FROM contour WHERE id_contour = ?', [id1]);
            IA_name = result[0].manufacturer_name;
            [result2] = await connection3.execute('SELECT manufacturer_name, bonus, malus FROM contour WHERE id_contour = ?', [id2]);
            IA_name2 = result2[0].manufacturer_name;
            [result3] = await connection3.execute('SELECT SUM(bonus) AS bon, SUM(malus) AS mal FROM contour WHERE manufacturer_name = ?', [IA_name]);
            [result4] = await connection3.execute('SELECT SUM(bonus) AS bon, SUM(malus) AS mal FROM contour WHERE manufacturer_name = ?', [IA_name2]);
            let score1 = parseInt(result[0].bonus) - parseInt(result[0].malus)
            let score2 = parseInt(result2[0].bonus) - parseInt(result2[0].malus)
            let score3 = parseInt(result3[0].bon) - parseInt(result3[0].mal)
            let score4 = parseInt(result4[0].bon) - parseInt(result4[0].mal)

            res.send(
            "Pour " + IA_name + " sur le contour du " + req.body.outline + " on a un score de " + score1 + "\r\n" +
            "Pour " + IA_name2 + " sur le contour du " + req.body.outline + " on a un score de " + score2 + "\r\n" +
            "Pour " + IA_name + " on a un score global de " + score3 + "\r\n" +
            "Pour " + IA_name2 + " on a un score global de " + score4 + "\r\n")
        }
    }catch(e){console.log(e)}
    connection3.end()
  })

  app.post('/get_notes',urlencodedParser,async (req,res)=>{
    let connection4 = "";
    let hist_data_expert = []
    let hist_data_student = []
    let IA_name = ""
    let result = ""
    let tab = new Array(0);
    let tab2 = new Array(0);
    try{
        connection4 = await initializeConnection(config);
        [result] = await connection4.execute('SELECT manufacturer_name FROM contour WHERE id_contour = ?', [id1]);
        console.log(id1, result[0].manufacturer_name);
        IA_name = result[0].manufacturer_name;
        console.log("name : " + IA_name);
        [hist_data_expert] = await connection4.execute('SELECT value AS val1 FROM grade JOIN contour ON grade.id_contour = contour.id_contour JOIN users ON grade.id_user = users.id_user WHERE contour.manufacturer_name = ? AND users.role = ?', [IA_name, "expert"]);
        hist_data_expert.forEach(elmt => {tab2.push(elmt.val1);});
        console.log(tab2);
        [hist_data_student] = await connection4.execute('SELECT value AS val2 FROM grade JOIN contour ON grade.id_contour = contour.id_contour JOIN users ON grade.id_user = users.id_user WHERE contour.manufacturer_name = ? AND users.role = ?', [IA_name, "student"]);
        hist_data_student.forEach(elmt => {tab.push(elmt.val2);});
        console.log(tab);
    }catch(e){connection4.end();console.log(e);}
    connection4.end();
    res.send({expert:tab2, student:tab});
  })

  let configuration = "/classic"

  app.post('/conf',urlencodedParser,(req,res)=>{
    let configuration2 = ""
    let conf = parseInt(req.body.conf);
    var isTrueSet = (req.body.two === 'true');
    let imgStr2 = ""
    if(conf == 0){
        configuration2 = "/classic"
    }else if(conf == 1){
        configuration2 = "/bone"
    }else if(conf == 2){
        configuration2 = "/lung"
    }else{
        console.log("error did not receive coherent config")
    }
    path1 = path1.replace(configuration,configuration2)
    files1 = fs.readdirSync(path1)
    let imgStr1 =  fs.readFileSync(path.join(path1,files1[parseInt(req.body.frame)]),"base64");
    if(isTrueSet){
        path2 = path2.replace(configuration,configuration2)
        files2 = fs.readdirSync(path2)  
        imgStr2 =  fs.readFileSync(path.join(path2,files2[parseInt(req.body.frame)]),"base64");
    }
    configuration = configuration2;
    res.send(imgStr1 + "end1" + imgStr2)
  })
  
  app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    let user;
    let db="";
        let rows = "";
        try{
            db = await initializeConnection(config);
            [rows] = await db.execute("SELECT COUNT( * ) AS existingAccount FROM users WHERE username=?;", [username])
        }catch(e){console.log(e)}
        if (rows[0].existingAccount===0)
        {
            res.send({ message: "User not found, please sign up !" });
        }
        else {
            try{
                const [result] = (await db.execute("SELECT * FROM users WHERE username=?;", [username]));
                user = result[0];
                console.log(user.username);
                const encryptedPassword = { iv: user.iv, password: user.password };
                const decryptedPassword = decrypt(encryptedPassword);
                if (password!==decryptedPassword)
                {
                    res.send({
                        accessToken: null,
                        message: "Invalid Password !"
                      });
                } 
                else 
                {
                         
              var token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 86400 // 24 hours
              });
              debugger;
              console.log(user.role);
              try {
                console.log(user.role);
                res.status(200).send({
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  accessToken: token, 
                  message: "Logged in !"
                });
              } catch(err) {
              res.send({ message: err.message });
            }
                }
            }catch(e){console.log(e)}
            }
    });

app.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = encrypt(password);
    let rows = ""
    let db =""
    try{
        db = await initializeConnection(config);
        [rows] = await db.execute("SELECT COUNT( * ) AS existingAccount FROM users WHERE email=?", [email])
    }catch(e){console.log(e)}
    if (rows[0].existingAccount!==0)
    {
        res.send("This email adress already has an account");
    }
    else {
        try{
            let [rows2] = await db.execute("SELECT COUNT( * ) AS existingUsername FROM users WHERE username=?", [username])
            if (rows2[0].existingUsername!==0)
            {
                res.send("Username Taken");
            }
            else{
                let [result] = await db.execute("INSERT INTO users (username, password, iv, email, role) VALUES (?,?,?,?,?)", [username, hashedPassword.password, hashedPassword.iv, email, role])
                res.send("Success");
            }
        }catch(e){console.log(e)}
        }

    });


app.listen(PORT, () => console.log('API is running on http://localhost:8080'));
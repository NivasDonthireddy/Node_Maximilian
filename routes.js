const fs = require('fs');
const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;

if(url === '/'){
    res.write('<html>');
    res.write('<head><title>My First  Page</title></head>');
    res.write(`
    <body>
        <form action="/message" method="POST">
            <input type="text" name="msg">
            <button type="submit">Submit</button>
        </form>
    </body>`)
    res.write('</html>');
    return res.end();
}
if(url === '/message'  && method==='POST'){
    const body = [];
    req.on('data',(chunk)=>{
        console.log('****',chunk,'****');
        body.push(chunk);
    });
    req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const msg = parsedBody.split('=')[1];
    fs.writeFile('message.txt',msg,(err)=>{
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        });
    })
}
}

module.exports = requestHandler;
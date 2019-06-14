const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    //response.end("Hello World!");

    https.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=0eefa07bb1bb480bad3277dcfc313086', (res) => {
                var body = '';

                res.on('data', (d) =>{body+=d;});
                res.on('end', () =>{
                    var json = JSON.parse(body);
                    var message = 'Here is some more information. '+json.articles[articleNum].description+'. If you would like to hear more news, simply ask. You can specify country, topic or source.'; 

                    response.end(message);
                });
                res.on('error',(e) =>{
                    console.log(e);
                });
    });
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);

var gm = require('gm')
    , http = require('http')
    , util = require('util')
    , formidable = require('formidable');


http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.onPart = function(part) {
        //console.log(part);
        if(part.filename){
            gm(part)
                .resize(240, 240)
                .noProfile()
                .stream(function (err, s) {
                  if (!err) {
                    s.pipe(res);
                  }
                });
        }
    };
    form.parse(req, function(err,d){console.log('parsing');});
    return ;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<html><body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form></body></html>'
  );
}).listen(8000);

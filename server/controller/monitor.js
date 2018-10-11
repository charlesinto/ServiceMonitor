import childProcess from 'child_process';
import path from 'path';

export const monitor = (req,res) => {
    let service = '';
    if(req.query.service){
        service = req.query.service;
        if(service !== ''){
            callService(res,service)
        }
    }else{
        res.status(403).send({message: `Bad Request`})
    }
    
    
}

let callService = (res,sysService) =>{
    let output =[];
    const child = childProcess.spawn('powershell.exe',[path.join(__dirname,'..','test2.ps1'),sysService,'PREVAILER']);
    child.stdout.on("data",function(data){
        output.push(data.toString())
    });
    child.stderr.on("data",function(data){
        let err = [];
        err.push(data.toString())
        for(let i = 0; i < err.length; i++){
            if(err[i].includes('NoServiceFoundForGivenName')){
                res.status(404).send({status:`NoServiceFoundForGivenName: ${sysService}`});
                break;
            }
        }
        console.log("Powershell Errors: " + data);
    });
    child.on("exit",function(){
        //res.statusCode = 200;
        for(let i = 0; i < output.length; i++){
            if(output[i].includes('Stopped')){
                res.status(200).send({status:'Service not running'});
                break
            }
            else if(output[i].includes('Running')){
                res.status(200).send({status:'Service is Running'});
                break;
            }
        }
        console.log("Powershell Script finished");
    });
    child.stdin.end();
}

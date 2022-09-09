const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../html/ins.txt');
const outPath = path.join(__dirname, '../result/ins.out.json');
const content = fs.readFileSync(filePath, 'utf8');
const scriptReg = new RegExp(/<script.*?>([\s\S]+?)<\/script>/gim);
const scriptArr = Array.from(content.matchAll(scriptReg));
scriptArr.forEach(element => {
  const matchScriptStr = element[1];
  if (matchScriptStr.indexOf('\\/api\\/v1\\/users\\/web_profile_info\\/') > -1 && matchScriptStr.indexOf('PolarisQueryPreloaderCache') > -1) {
    const matchResponseReg = new RegExp(/"response":([\s\S]+?)[,]"status_code"/im);
    const matchResponse = matchScriptStr.match(matchResponseReg);
    if (matchResponse) {
      const matchResStr = matchResponse[1];
      try {
        const matchResToObj = JSON.parse(JSON.parse(matchResStr));
        console.log({ edge_owner_to_timeline_media: matchResToObj['data']['user']['edge_owner_to_timeline_media'] });
        fs.writeFileSync(outPath, JSON.stringify(matchResToObj, null, 4));
      } catch (error) {
        console.log(error);
      }
    }
  }
});

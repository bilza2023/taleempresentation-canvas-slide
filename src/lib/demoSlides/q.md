
here are some properties which will always be present in 
this.itemData.itemExtra object

These props values are in this format 
  this.itemData.itemExtra.prop_name.initial_value

here is list of properties which will always be present 
function randNo(length=8){
    const digits = '0123456789';
  let result = '';
  const digitsLength = digits.length;
  for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digitsLength));
  }
  return result;
}
function addReqExtraFields(obj,command,color="black"){
  obj.translate = true;
  obj.command = command;
  obj.name = command + "_" +randNo();
  
  obj.color = getProp(color),
  obj.showAt = 0;
  obj.globalAlpha = getProp(1);

  obj.gap= getProp(0);
  obj.dash= getProp(0);

  obj.shadowOffsetX = 0;
  obj.shadowOffsetY = 0;
  obj.shadowColor = "gray";
  obj.shadowBlur = 0;
  // === TOTAL 14 attrib 3Xsystem (name,command,translate) 1xcolor 4xvisibiity etc 2xdash-gap 4x shadow 
  return obj;
}
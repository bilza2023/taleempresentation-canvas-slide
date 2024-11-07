//@ts-nocheck

export default class ComponentObject {

 constructor(itemData,fnList){
   
        this.itemData = itemData;
        this.fnList = fnList;
        this.handleObjects = [];
        this.loadHandles(); 
 }
//****************************************************************** */
isVisible(currentTime){
   if(!this.itemData.itemExtra.showAt){
      // this.itemData.itemExtra.showAt = 0; //no need to edit data here this function is just for checking showAt
      return true;
   }else {
      if( currentTime >= this.itemData.itemExtra.showAt ){
         return true;
      }else {
         return false;
      }
   }
}
// eslint-disable-next-line no-unused-vars
draw(drawLib,currentTime){
   console.log("ComponentObject draw");
}


 //comp object also has width height x,y for its on isHit
 width(){
    return this.itemData.itemExtra.width.initialValue;
 }
 height(){
    return this.itemData.itemExtra.height.initialValue;
 }
 getX(){
    return this.itemData.itemExtra.x.initialValue;
 }
 
 getY(){
    return this.itemData.itemExtra.y.initialValue;
 }

 isHit(mouseX , mouseY){

      return (
          mouseX  >= this.getX() &&
          mouseX  <= this.getX() + this.width() &&
          mouseY  >= this.getY() &&
          mouseY  <= this.getY() + this.height()
      );
  
 }

}//componentn class



/*
///////////====These Are the Props Required====

 //== Time Related Props

 {currentTime} 
      {pulse}

//== items

        items={currentSlide.items}
        
//== startTime and endTime

        startTime={currentSlide.startTime}
        endTime={currentSlide.endTime}
      
//== The Data for the slide other than items 
        // slideExtra is a key-value pair array of object.
        slideExtra={currentSlide.slideExtra}
        // extra is slide-extra NOT item.extra !!!!!! importantay
        extra={currentSlide.extra}
      
//== These are images which must be modularized - injected into the slide (other slides as well)         
      spriteImgArray=[]
      bgImages=[]
      
//== The functions that are provided to slides
      setPulse={()=>{}}
 * */
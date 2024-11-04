export default async function setEqSlidesEndTime(slides) {
    // Loop through all slides
    slides.forEach(slide => {
      if (slide.type.toLowerCase() === "eqs") {
        if (slide.items && slide.items.length > 0) {
          if (slide.items[0]?.extra) {
            slide.items[0].extra.startTime = slide.startTime;
          }
          
          // Set endTime for each item based on next item's startTime
          for (let i = 0; i < slide.items.length - 1; i++) {
            const currentItem = slide.items[i];
            const nextItem = slide.items[i + 1];
            
            if (currentItem?.extra && nextItem?.extra) {
              currentItem.extra.endTime = nextItem.extra.startTime;
            }
          }
          
          // Set endTime for the last item to match slide's endTime
          const lastItem = slide.items[slide.items.length - 1];
          if (lastItem?.extra) {
            lastItem.extra.endTime = slide.endTime;
          }
        }
      }
    });
    
    return slides;
  }
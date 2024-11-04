import loadAssets from "./assets/loadAssets";
import getNewSlide from './getNewSlide/getNewSlide';

/**
 * PresentationObj manages a collection of slides and their operations.
 * Each slide maintains its own timing information, making the presentation
 * essentially an ordered collection of slides with shared assets.
 */
export default class PresentationObj {
    constructor(slidesData = []) {
        this.assets = {};
        this.slidesData = [...slidesData];
        this.currentIndex = 0;
    }

    /**
     * Initializes the presentation by loading necessary assets
     */
    async init() {
        this.assets = await loadAssets();
        return this;
    }

    /**
     * Gets all slides in the presentation
     */
    getSlides() {
        return this.slidesData;
    }

    /**
     * Gets the current slide
     */
    getCurrentSlide() {
        return this.slidesData[this.currentIndex];
    }

    /**
     * Sets the current slide index
     */
    setCurrentIndex(index) {
        if (index >= 0 && index < this.slidesData.length) {
            this.currentIndex = index;
            return true;
        }
        return false;
    }

    /**
     * Adds a new slide of the specified type
     */
    addSlide(slideType) {
        const startTime = this.slidesData.length 
            ? this.slidesData[this.slidesData.length - 1].endTime 
            : 0;
        
        const newSlide = {
            ...getNewSlide(slideType),
            startTime,
            endTime: startTime + 10
        };
        
        this.slidesData = [...this.slidesData, newSlide];
        this.currentIndex = this.slidesData.length - 1;
        return this.slidesData;
    }

    /**
     * Moves a slide up or down in the presentation
     */
    moveSlide(index, direction) {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (newIndex < 0 || newIndex >= this.slidesData.length) {
            return false;
        }

        const newSlides = [...this.slidesData];
        [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
        
        // Update timing information
        this._updateSlideTiming(newSlides);
        
        this.slidesData = newSlides;
        this.currentIndex = newIndex;
        return true;
    }

    /**
     * Deletes the slide at the specified index
     */
    deleteSlide(index) {
        if (this.slidesData.length <= 1) {
            this.slidesData = [];
            this.currentIndex = 0;
            return this.slidesData;
        }

        const newSlides = this.slidesData.filter((_, i) => i !== index);
        this._updateSlideTiming(newSlides);
        
        this.slidesData = newSlides;
        this.currentIndex = Math.min(index, this.slidesData.length - 1);
        return this.slidesData;
    }

    /**
     * Copies a slide to the clipboard (localStorage)
     */
    copySlide(index) {
        const slide = this.slidesData[index];
        if (slide) {
            localStorage.setItem('copiedSlide', JSON.stringify(slide));
            return true;
        }
        return false;
    }

    /**
     * Pastes a slide from the clipboard (localStorage)
     */
    pasteSlide() {
        const savedSlide = localStorage.getItem('copiedSlide');
        if (savedSlide) {
            const clipboardSlide = JSON.parse(savedSlide);
            const startTime = this.slidesData.length 
                ? this.slidesData[this.slidesData.length - 1].endTime 
                : 0;
                
            const pastedSlide = {
                ...clipboardSlide,
                startTime,
                endTime: startTime + 10
            };
            
            this.slidesData = [...this.slidesData, pastedSlide];
            this.currentIndex = this.slidesData.length - 1;
            return true;
        }
        return false;
    }

    /**
     * Clones a slide at the specified index
     */
    cloneSlide(index) {
        const slide = this.slidesData[index];
        if (slide) {
            const clonedSlide = JSON.parse(JSON.stringify(slide));
            const startTime = this.slidesData.length 
                ? this.slidesData[this.slidesData.length - 1].endTime 
                : 0;
                
            clonedSlide.startTime = startTime;
            clonedSlide.endTime = startTime + 10;
            
            this.slidesData = [...this.slidesData, clonedSlide];
            this.currentIndex = this.slidesData.length - 1;
            return true;
        }
        return false;
    }

    /**
     * Updates the timing information for all slides
     */
    _updateSlideTiming(slides) {
        slides.forEach((slide, index) => {
            slide.startTime = index === 0 ? 0 : slides[index - 1].endTime;
            slide.endTime = slide.startTime + 10; // Default duration of 10 seconds
        });
    }

    /**
     * Gets the total duration of the presentation
     */
    getTotalDuration() {
        if (this.slidesData.length === 0) return 0;
        return this.slidesData[this.slidesData.length - 1].endTime;
    }

    /**
     * Validates the presentation structure
     */
    validate() {
        let isValid = true;
        let errors = [];

        // Check for timing consistency
        for (let i = 1; i < this.slidesData.length; i++) {
            const prevSlide = this.slidesData[i - 1];
            const currentSlide = this.slidesData[i];
            
            if (currentSlide.startTime !== prevSlide.endTime) {
                isValid = false;
                errors.push(`Timing mismatch between slides ${i-1} and ${i}`);
            }
        }

        // Check for required properties
        this.slidesData.forEach((slide, index) => {
            if (!slide.hasOwnProperty('startTime') || !slide.hasOwnProperty('endTime')) {
                isValid = false;
                errors.push(`Missing timing properties in slide ${index}`);
            }
        });

        return { isValid, errors };
    }

    /**
     * Creates a new empty presentation
     */
    static createNew() {
        return new PresentationObj([{
            type: 'blank',
            startTime: 0,
            endTime: 10,
            // Add any other default properties needed for a blank slide
        }]);
    }

    /**
     * Exports the presentation data
     */
    export() {
        return {
            slides: this.slidesData,
            duration: this.getTotalDuration(),
            slideCount: this.slidesData.length
        };
    }
}
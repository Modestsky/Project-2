import { LitElement, html, css } from 'lit';

export class ImageGallery extends LitElement {
    static get tag() {
        return 'image-gallery';
    }


  // Singleton instance
  static _instance;

  // Private constructor
  constructor() {
    super();
    if (!ImageGallery._instance) {
      this.images = [
        "https://images.ctfassets.net/7mmwp5vb96tc/1UmmmbBoLgvDszcSXjumQc/f8f1e32065c244489ce3050bcd85cec3/Norway_Vikingen_HGR_163147_Photo_Espen_Mills.jpg?q=75&w=3840&fm=webp",
        "https://static01.nyt.com/images/2017/10/22/travel/22Norway1/22Norway1-superJumbo.jpg",
        "https://www.travelandleisure.com/thmb/BWJQU1XbrF_rA9ffCANSLeDfhUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-northern-lights-SOLARMAX0124-a4a1d62e9991474183434a3d2a670217.jpg",
        "https://img.freepik.com/free-photo/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai_188544-9655.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1713139200&semt=sph",
        "https://api.time.com/wp-content/uploads/2015/10/iconic-space-photos-armstrong-moon-nasa1.jpg",
        "https://www.worldcampus.psu.edu/sites/default/files/2023-01/old-main-wide_2320x1305.jpg",
        "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/gopsusports.com/images/2023/9/24/DSC_9146.jpg",
        "https://cdn.learfield.com/wp-content/uploads/2016/11/Penn-State2.jpg",
        "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
      ];

      this.captions = [
        "Norwegian Mountain Range",
        "Norway Luxury Housing",
        "Aurora Borealis",
        "Space Wallpaper",
        "Astronaut on the Moon",
        "PSU Old Main",
        "PSU Whiteout with Fireworks",
        "PSU Whiteout game",
        "Japanese Pagoda"
      ];
      
      this.showSlideshow = false;
      this.currentImageIndex = 0;

      ImageGallery._instance = this;
    }

    return ImageGallery._instance;
  }
  
  static get styles() {
    return css`
    .gallery-container {
        text-align: center;
    }

    .image-list {
        display: inline;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .image-list img {
        width: calc(33% - 40px);
        margin-bottom: 20px;
        cursor: pointer;
        transition: transform 0.5s;
    }

    .image-list img:hover {
        transform: scale(1.1);
    }

    .slideshow-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 15%;
        left: 15%;
        min-width: 70%;
        min-height: 70%;

        background-color: #000000;
        border: 2px solid #008cff;
        border-radius: 50px;
    }

    .slideshow-container img {
        max-width: 90%;
        max-height: 80%;
        position: absolute;
        display: flex;
        border: 2px solid gold;
        border-radius: 10%;
    }

    #gallery-btn {
        position: absolute;
        background-color: #333333;
        font-size: 24px;
        cursor: pointer;
        font-weight: bold;
    }

    .close-btn {
        top: 20px;
        right: 20px;
        color: red;
        cursor: pointer;
    }

    .left-btn {
        bottom: 20px;
        left: 20px;
        border-radius: 50%;
        color: white;
    }

    .right-btn {
        bottom: 20px;
        right: 20px;
        border-radius: 50%;
        color: white;
    }

    #gallery-card-text {
      font-size: 16px;
      font-weight: bold;
      position: absolute;
      z-index: 1;
    }
    
    .image-counter {
        color: #00ff48;
        top: 5px;
      }

    .image-caption {
      color: #ffffff;
      bottom: 5px;
    }
  
    #gallery-btn:hover,
    #gallery-btn:focus {
      background-color: #008cff;
      border: 2px solid #00ff08;
    }
    `;
  }

  render() {
    return html`
        <div class="gallery-container">
            <h1>Image Gallery</h1>
            <div class="image-list">
                ${this.images.map((image, index) => html`
                    <img src="${image}" alt="Image" @click="${() => this.openSlideshow(index)}">
                `)}
            </div>

            ${this.showSlideshow ? html`
                <div class="slideshow-container">
                    <button id="gallery-btn" class="close-btn" @click="${this.closeSlideshow}">&times;</button>
                    <button id="gallery-btn" class="left-btn" @click="${this.leftArrow}"><</button>
                    <button id="gallery-btn" class="right-btn" @click="${this.rightArrow}">></button>
                    <p id="gallery-card-text" class="image-counter">Image ${this.currentImageIndex+1} of ${this.images.length}</p>
                    <p id="gallery-card-text" class="image-caption">${this.captions[this.currentImageIndex]}</p>
                    <img src="${this.images[this.currentImageIndex]}" alt="Gallery Image">
                </div>
            `:''}
        </div>
    `;
    }

    openSlideshow(index) {
      this.currentImageIndex = index;
      this.showSlideshow = true;

      // Prevents user scrolling
      document.body.style.overflow = 'hidden';

      // Add event listeners for keyboard navigation
      document.addEventListener('keydown', this.handleKeyDown);
      this.requestUpdate();
    }
  
    closeSlideshow() {
      this.showSlideshow = false;

      // Enables user scrolling
      document.body.style.overflow = 'auto';

      // Remove event listeners when closing slideshow
      document.removeEventListener('keydown', this.handleKeyDown);
      this.requestUpdate();
    }
    
    leftArrow() {
      if (this.currentImageIndex == 0) {
        this.currentImageIndex = this.images.length-1;
      }
      else {
        this.currentImageIndex-=1;
      }
      this.requestUpdate();
    }
    
    rightArrow() {
      if (this.currentImageIndex == this.images.length-1) {
        this.currentImageIndex = 0;
      }
      else {
        this.currentImageIndex+=1;
      }
      this.requestUpdate();
    }

    handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.leftArrow();
          break;
        case 'ArrowRight':
          this.rightArrow();
          break;
        case 'Escape':
          this.closeSlideshow();
          break;
        default:
          break;
      }
    };
}

globalThis.customElements.define(ImageGallery.tag, ImageGallery);
import { LitElement, html, css } from 'lit';

export class ImageGallery extends LitElement {
    static get tag() {
        return 'image-gallery';
    }

  constructor() {
    super();
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

    this.showSlideshow = false;
    this.currentImageIndex = 0;
  }
  
  static get styles() {
    return css`
    :host {

    }
    
    .gallery-container {
        text-align: center;
    }

    .image-list {
        //try make flex ratios better
        //display: flex;
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
    }

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        color: red;
        font-size: 24px;
        cursor: pointer;
    }
    
    .close-btn:hover,
    .close-btn:focus {
        background-color: #ff9900;
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
                    <button class="close-btn" @click="${this.closeSlideshow}">&times;</button>
                    <img src="${this.images[this.currentImageIndex]}" alt="Gallery Image">
                </div>
            `:''}
        </div>
    `;
    }

    openSlideshow(index) {
        this.currentImageIndex = index;
        this.showSlideshow = true;
        document.body.style.overflow = 'hidden';
        this.requestUpdate();
      }
    
      closeSlideshow() {
        this.showSlideshow = false;
        document.body.style.overflow = 'auto';
        this.requestUpdate();
      }

}

globalThis.customElements.define(ImageGallery.tag, ImageGallery);
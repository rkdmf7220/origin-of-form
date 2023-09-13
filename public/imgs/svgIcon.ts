const svgIcon = {
  get(iconKey: string, option?: string) {
    let data = IconData[iconKey](option);
    if (!data) {
      data = IconData.blankImage();
    }
    return `'data:image/svg+xml;utf8,${encodeURIComponent(data)}'`;
  }
};

export default svgIcon;

const IconData: {[key: string]: (option?: string) => string} = {
  closeIcon: () =>
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5148 10.1005L10.1006 11.5147L18.5859 20L10.1006 28.4853L11.5148 29.8995L20.0001 21.4142L28.4854 29.8995L29.8996 28.4853L21.4143 20L29.8996 11.5147L28.4854 10.1005L20.0001 18.5858L11.5148 10.1005Z" fill="#CCCCCC"/>
    </svg>`,
  blankImage: () =>
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5148 10.1005L10.1006 11.5147L18.5859 20L10.1006 28.4853L11.5148 29.8995L20.0001 21.4142L28.4854 29.8995L29.8996 28.4853L21.4143 20L29.8996 11.5147L28.4854 10.1005L20.0001 18.5858L11.5148 10.1005Z" fill="#CCCCCC"/>
    </svg>`,
  indexIcon: () =>
    `<svg width="194" height="200" viewBox="0 0 194 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M99 94V0H95V94H0V98H95L95 200H99L99 98H194V94H99Z" fill="white"/>
    </svg>`,
  zoomInIcon: () =>
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8182 10H18.1818V18.1818H10V19.8182H18.1818V28H19.8182V19.8182H28V18.1818H19.8182V10Z" fill="#CCCCCC"/>
    </svg>`,
  zoomOutIcon: () =>
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="18" width="18" height="2" fill="#CCCCCC"/>
    </svg>`,
  maskImage: () =>
    `<svg width="135" height="135" viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_532_1005)">
      <circle cx="68" cy="68" r="50" fill="black"/>
      </g>
      <defs>
      <filter id="filter0_d_532_1005" x="6" y="10" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="6"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_1005"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_1005" result="shape"/>
      </filter>
      </defs>
    </svg>`
};
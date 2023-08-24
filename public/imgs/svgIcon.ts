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
  closeIcon: () => (
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5148 10.1005L10.1006 11.5147L18.5859 20L10.1006 28.4853L11.5148 29.8995L20.0001 21.4142L28.4854 29.8995L29.8996 28.4853L21.4143 20L29.8996 11.5147L28.4854 10.1005L20.0001 18.5858L11.5148 10.1005Z" fill="#CCCCCC"/>
    </svg>`
  ),
  blankImage: () => (
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5148 10.1005L10.1006 11.5147L18.5859 20L10.1006 28.4853L11.5148 29.8995L20.0001 21.4142L28.4854 29.8995L29.8996 28.4853L21.4143 20L29.8996 11.5147L28.4854 10.1005L20.0001 18.5858L11.5148 10.1005Z" fill="#CCCCCC"/>
    </svg>`
  ),
  indexIcon: () => (
    `<svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M143 133V40H137V133H43V139H137L137 240H143L143 139H237V133H143Z" fill="white"/>
    </svg>`
  )
};
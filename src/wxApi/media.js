/**
 * media
 *
 * @author lin_yu
 */
import promisify from '../utils/promisify'

const wxMedia = {
  chooseImage: promisify(wx.chooseImage),
  getImageInfo: promisify(wx.getImageInfo)
}

export default wxMedia
